export {
	Setting,
	HexBuilder,
	Hex,
	HexType,
	HexDom,
	SiteDom
}

interface Setting {
	CustomPlacement: boolean;
	CustomThiefPlacement :boolean;
}

enum ResourceType {
	Wool, Wood, Brick, Iron, Wheat
}
class HexType {
	static REF_ID_DESERT :string = "#hex-center";
	readonly refId :string;
	readonly count :number;
	readonly product :ResourceType;
	private constructor(refId:string, product :ResourceType, count:number) {
		this.refId = refId;
		this.product = product;
		this.count = count;
	}

	static HEX_TYPES :HexType[] = [
		new HexType(HexType.REF_ID_DESERT, null, 1),
		new HexType("#hex-field", ResourceType.Wheat, 4),
		new HexType("#hex-mine", ResourceType.Iron, 3),
		new HexType("#hex-meadow", ResourceType.Wool, 4),
		new HexType("#hex-clay", ResourceType.Brick, 3),
		new HexType("#hex-forest", ResourceType.Wood, 4),
	];
	static isDesert(hexType :HexType) :boolean {
		return hexType.refId == HexType.REF_ID_DESERT;
	}
}
interface SiteDom {
}
interface HexDom {
	getAround() :SiteDom[];
	setChanceNo(arg :number) :void;
	setType(arg :HexType) :void;
}
class HexBuilder {
	private readonly x :number;
	private readonly y :number;
	private readonly dom :HexDom;
	chanceNo :number;
	type :HexType;
	constructor(x :number, y :number, dom :HexDom) {
		this.x = x;
		this.y = y;
		this.dom = dom;
	}

	build() :Hex {
		return new Hex(this.dom, this.x, this.y, this.chanceNo, this.type);
	}
}
class Hex {
	readonly x :number;
	readonly y :number;
	readonly chanceNo :number;
	readonly type :HexType;
	readonly dom :HexDom;

	constructor(dom :HexDom, x :number, y :number, chanceNo :number, type :HexType) {
		this.x = x;
		this.y = y;
		this.chanceNo = chanceNo;
		this.type = type;
		this.dom = dom;
		dom.setChanceNo(chanceNo);
		dom.setType(type);
	}
}
class Site {
	private owner :Player;
	private state :BuildingState;
	readonly dom :SiteDom;
	private readonly hexAround :Hex[];

	constructor(dom :SiteDom, hexAround :Hex[]) {
		this.owner = null;
		this.state = BuildingState.A_NONE;
		this.dom = dom;
		this.hexAround = hexAround;
	}
	own(by :Player) {
		this.owner = by;
		this.state = BuildingState.B_SETTLEMENT
	}
}
class BuildingState {
	static A_NONE = new BuildingState(null);
	static B_SETTLEMENT = new BuildingState(null);
	static C_BUILDING = new BuildingState(null);

	readonly id :string;
	private constructor(id :string) {
		this.id = id;
	}
}
class Player {
	readonly colorCode :string;
	readonly name :string;
	constructor(name :string, colorCode :string) {
		this.name = name;
		this.colorCode = colorCode;
	}
}
