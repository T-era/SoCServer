import { Setting, HexBuilder, Hex, HexType } from '../types';

export default {
	setupHex(setting :Setting, hexBuilders :HexBuilder[]) :Hex[] {
		var desertIsCenter = ! setting.CustomThiefPlacement;
		setupHexType(desertIsCenter, hexBuilders);

		setupHexAssigns(! setting.CustomPlacement, hexBuilders);

		return hexBuilders.map(b => b.build());
	},
	setupPath(pathTags) {
		for (var i = 0, max = pathTags.length; i < max; i ++) {
			let pathTag = pathTags[i];
			initPathTag(pathTag);
		}
		function initPathTag(pathTag) {
			let pathTagId = pathTag.id;
			let pp = pathTagId.split("_");
			let p1:any = document.getElementById("s" + pp[1]);
			let p2:any = document.getElementById("s" + pp[2]);
			pathTag.onclick = function() {
				console.log(p1, p2);
				p1.classList.add("test");;
				p2.classList.add("test");;
				p1.onclick = function() { alert("1"); };
				p2.onclick = function() { alert("2"); };
			};
		}
	}
}
function setupHexType(desertIsCenter, hexBuilders :HexBuilder[]) {
	let rnd = randomSelect(desertIsCenter);
	let i = 0;
	for (let builder of hexBuilders) {
		builder.type = rnd[i ++];
	}
}

var CHANCE_LIST :number[] = [5,2,6,3,8,10,9,12,11,4,8,10,9,4,5,6,3,11];
var ASSIGN_ORDER :number[] = [0,3,7,12,16,17,18,15,11,6,2,1,4,8,13,14,10,5,9];

function setupHexAssigns(ruledAssign :boolean, hexBuilders :HexBuilder[]) {
	let assigns = ruledAssign ? CHANCE_LIST : shuffleCopy(CHANCE_LIST);
	let i = 0;
	for (let index of ASSIGN_ORDER) {
		let target = hexBuilders[index];
		if (! HexType.isDesert(target.type)) {
			target.chanceNo = assigns[i ++];
		}
	}
}

function randomSelect(desertIsCenter :boolean) :HexType[] {
	var choices :HexType[] = [];
	for (let hexType of HexType.HEX_TYPES) {
		if (desertIsCenter && hexType.refId === HexType.REF_ID_DESERT) {
			continue;
		} else {
			for (let i = 0, max = hexType.count; i < max; i ++) {
				choices.push(hexType);
			}
		}
	}
	shuffle(choices);

	if (desertIsCenter) {
		choices.splice(9, 0, HexType.HEX_TYPES[0]);
	}
	return choices;
}
function shuffleCopy<T>(l :T[]) :T[] {
	var copy = l.slice(0, l.length);
	shuffle(copy);
	return copy;
}
function shuffle<T>(l :T[]) :void {
	for (var i = l.length - 1; i > 0; i--) {
		var r = Math.floor(Math.random() * (i + 1));
		var tmp = l[i];
		l[i] = l[r];
		l[r] = tmp;
	}
}
