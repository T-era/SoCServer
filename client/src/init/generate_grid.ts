import { Setting, HexBuilder, Hex, HexType, SiteDom } from '../types';

export default generateHexGrid;

const NS_SVG = 'http://www.w3.org/2000/svg';
const NS_XLINK = 'http://www.w3.org/1999/xlink';


export class SiteConnect {
	private road :RoadConnect[];
	private incomeFrom :HexConnect[];
	dom :SVGCircleElement;

	constructor(dom :SVGCircleElement) {
		this.dom = dom;
		this.road = [];
		this.incomeFrom = [];
	}
	addAround(around :HexConnect) {
		this.incomeFrom.push(around);
	}
}
export class HexConnect {
	private around :SiteConnect[];
	dom :SVGUseElement;
	private labelDom :SVGTextElement;

	constructor(dom :SVGUseElement, labelDom :SVGTextElement) {
		this.dom = dom;
		this.labelDom = labelDom;
		this.around = [];
	}
	getAround() :SiteDom[] {
		return this.around;
	}
	addAround(around :SiteConnect) :void {
		this.around.push(around);
	}
	setChanceNo(arg :number) {
		if (arg) {
			this.labelDom.textContent = `${arg}`;
		} else {
			this.labelDom.textContent = "";
		}
	}
	setType(arg :HexType) {
		this.dom.setAttributeNS(NS_XLINK, "href", arg.refId);
	}
}
export class RoadConnect {
	private edge1 :SiteConnect;
	private edge2 :SiteConnect;
	dom :SVGGElement;
	constructor(edge1 :SiteConnect, edge2 :SiteConnect, dom :SVGGElement) {
		this.edge1 = edge1;
		this.edge2 = edge2;
		this.dom = dom;
	}
}

export interface HexGrid {
	hex :HexConnect[][];
	site :SiteConnect[][];
	road :RoadConnect[];
}

type FNewLine = (y :number)=>void;
type FEach = (x :number, y :number, xFrom :number, xTo :number)=>void;

function generateHexGrid(document :Document, main :HTMLElement) :HexGrid {
	//   a b c
	//  d e f g
	// h i j k l
	//  m n o p
	//   q r s
	let hexList :HexConnect[][] = [];
	let siteList :SiteConnect[][] = [[]];
	let roadList :RoadConnect[] = [];
	const LINES = 5;
	const HALF_LINES = Math.floor(LINES / 2);
	let eachHex = (fNewLine :FNewLine, f :FEach) => {
		for (let y = 0; y < LINES; y ++) {
			let cnt = LINES - Math.abs(HALF_LINES - y)
			let xFrom = LINES + 1 - cnt;
			let xTo = LINES * 2 + 1 - xFrom;
			fNewLine(y);
			for (let x = xFrom; x < xTo; x += 2) {
				f(x, y, xFrom, xTo);
			}
		}
	};

	eachHex(y => {
		hexList[y] = [];
	}, (x, y) => {
		let hc = createHex(x, y, main);
		hexList[y][x] = hc;
	});
	eachHex(y => {
		siteList[y+1] = [];
	}, (x, y, xFrom, xTo) => {
		let hc = hexList[y][x];
		// A
		let joinA = [hc];
		if (y != 0 && hexList[y-1][x-1]) joinA.push(hexList[y-1][x-1]);
		if (hexList[y][x-2])             joinA.push(hexList[y][x-2]);

		let scA = createSite(x-1, y, main, 0, joinA);
		siteList[y][x-1] = scA;

		// B
		let joinB = [hc];
		if (y != 0) {
			if (hexList[y-1][x-1]) joinB.push(hexList[y-1][x-1]);
			if (hexList[y-1][x+1]) joinB.push(hexList[y-1][x+1]);
		}
		let scB = createSite(x, y, main, -30, joinB);
		siteList[y][x] = scB;

		// C
		if (x == xTo - 1) { // TODO ==
			let joinC = [hc]
			if (y != 0) {
				if (hexList[y-1][x+1]) joinC.push(hexList[y-1][x+1]);
			}
			let scC = createSite(x+1, y, main, 0, joinC);
			siteList[y][x+1] = scC;
		}

		// D
		if (y == LINES - 1 || y >= HALF_LINES && x == xFrom ) {
			let joinD = [hc];
			let scD = createSite(x-1, y+1, main, -30, joinD);
			siteList[y+1][x-1] = scD;
		}
		// E
		if (y == LINES - 1) {
			let joinE = [hc];
			let scE = createSite(x, y+1, main, 0, joinE);
			siteList[y+1][x] = scE;
			let scD = siteList[y+1][x-1];
		}
		// F
		if (x == xTo - 1 && y >= HALF_LINES) {
			let joinF = [hc];
			let scF = createSite(x+1, y+1, main, -30, joinF);
			siteList[y+1][x+1] = scF;
		}
	});
	eachHex(y => {
	}, (x, y, xFrom, xTo) => {
		let scA = siteList[y][x-1];
		let scB = siteList[y][x];
		let scC = siteList[y][x+1];
		let scD = siteList[y+1][x-1];
		let scE = siteList[y+1][x];
		let scF = siteList[y+1][x+1];
		roadList.push(createRoadH(scA, scB, x-1, y, main, false));
		roadList.push(createRoadH(scB, scC, x, y, main, true));
		roadList.push(createRoadV(scA, scD, x-1, y, main));
		if (x == xTo - 1) {
			roadList.push(createRoadV(scC, scF, x+1, y, main));
		}
		if (y == LINES - 1) {
			roadList.push(createRoadH(scD, scE, x-1, y+1, main, true));
			roadList.push(createRoadH(scE, scF, x, y+1, main, false));
		} else if (y >= HALF_LINES) {
			if (x == xFrom) {
				roadList.push(createRoadH(scD, scE, x-1, y+1, main, true));
			}
			if (x == xTo - 1) {
				roadList.push(createRoadH(scE, scF, x, y+1, main, false));
			}
		}
	});

	return {
		hex: hexList,
		site: siteList,
		road: roadList,
	};

	function join(hex :HexConnect, site :SiteConnect) {
		hex.addAround(site);
		site.addAround(hex);
	}
	function createHex(x :number, y :number, parent :HTMLElement) :HexConnect {
		let hex = createHexDom(x, y, parent);
		let hexLabel = createHexLabelDom(x, y, parent);
		return new HexConnect(hex, hexLabel);

		function createHexDom(x :number, y :number, parent :HTMLElement) {
			let use = document.createElementNS(NS_SVG, 'use');
			use.setAttributeNS(NS_XLINK, 'href' , '#hex');
			use.setAttribute('x', String(x * 60 - 50));
			use.setAttribute('y', String(y * 90 + 10));
			use.classList.add('hex');

			parent.appendChild(use);
			return use;
		}
		function createHexLabelDom(x :number, y :number, parent :HTMLElement) {
			let text = document.createElementNS(NS_SVG, 'text');
			text.setAttribute('x', String(x * 60 + 10));
			text.setAttribute('y', String(y * 90 + 70));
			text.classList.add('text');

			parent.appendChild(text);
			return text;
		}
	}
	function createSite(x :number, y :number, parent :HTMLElement, dy :number, hexJoinTo :HexConnect[]) :SiteConnect {
		let site = createSiteDom(x, y, parent, dy);
		let sc = new SiteConnect(site);
		hexJoinTo.forEach(hc => join(hc, sc));
		return sc;

		function createSiteDom(x :number, y :number, parent :HTMLElement, dy :number) {
			let dom = document.createElementNS(NS_SVG, 'circle');
			dom.setAttributeNS(NS_XLINK, 'href' , '#hex');
			dom.setAttribute('cx', String(x * 60 + 10));
			dom.setAttribute('cy', String(y * 90 + 40 + dy));
			dom.setAttribute('r', String(10));
			dom.classList.add('settlement');

			parent.appendChild(dom);
			return dom;
		}
	}
	function createRoad(site1 :SiteConnect, site2 :SiteConnect, transform :string, parent :HTMLElement) :RoadConnect {
		let dom = document.createElementNS(NS_SVG, 'g');
		dom.setAttribute('transform', transform)
		dom.classList.add('pathg');
		let useDom = document.createElementNS(NS_SVG, 'use');
		useDom.setAttributeNS(NS_XLINK, 'href', '#path_rect');
		useDom.classList.add('path');

		dom.appendChild(useDom);
		parent.appendChild(dom);
		return new RoadConnect(site1, site2, dom);
	}
	function createRoadH(site1 :SiteConnect, site2 :SiteConnect, x :number, y :number, parent :HTMLElement, isDec :boolean) :RoadConnect {
		let px = x * 60 + 40;
		let py = y * 90 + 25;
		let rotate = isDec ? 'rotate(30)' : 'rotate(-30)';
		return createRoad(site1, site2, `translate(${px}, ${py}) ${rotate}`, parent)
	}
	function createRoadV(site1 :SiteConnect, site2 :SiteConnect, x :number, y :number, parent :HTMLElement) :RoadConnect {
		let px = x * 60 + 10;
		let py = y * 90 + 70;
		return createRoad(site1, site2, `translate(${px}, ${py}) rotate(90)`, parent);
	}
}
