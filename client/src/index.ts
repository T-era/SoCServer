import { Setting, HexBuilder, HexDom, HexType } from './types';
import fieldSetting from './init/field_setting';
import generateHexGrid, {HexConnect} from './init/generate_grid';

import ClickListener, { setUpListener } from './event/listener/index';
import KittingListener from './event/listener/kitting_listener';

window.onload = initHex;

function initHex() :void {
	let grids = generateHexGrid(document, document.getElementById('main'));

	let hexBuilders = toHexBuilders(grids.hex);

	/// TODO (Setting view if you start.)
	let setting :Setting = {
		CustomPlacement: false,
		CustomThiefPlacement: false
	};

	/// TODO (After come back from lobby.)
	fieldSetting.setupHex(setting, hexBuilders);
	setUpListener(grids, new KittingListener());

	function toHexBuilders(hexGrids :HexConnect[][]) {
		let ret = [];
		for (var y = 0, maxY = hexGrids.length; y < maxY; y ++) {
			let line = hexGrids[y];
			for (var x = 0, maxX = line.length; x < maxX; x ++) {
				let hexGrid = line[x];
				if (hexGrid) {
					ret.push(new HexBuilder(x, y, hexGrid));
				}
			}
		}
		return ret;
	}
}
