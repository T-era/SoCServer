import { HexGrid } from '../../init/generate_grid';
export default interface ClickListener {
	onClickHex();
	onClickSite();
	onClickRoad();
	onHoverHex();
	onHoverSite();
	onHoverRoad();
}

export function setUpListener(hexGrids :HexGrid, listener :ClickListener) {
		for (let hexLine of hexGrids.hex) {
			for (let hex of hexLine) {
				if (hex) {
					hex.dom.onclick = listener.onClickHex.bind(listener);
					hex.dom.onmouseover = listener.onHoverHex.bind(listener);
				}
			}
		}
		for (let siteLine of hexGrids.site) {
			for (let site of siteLine) {
				if (site) {
					site.dom.onclick = listener.onClickSite.bind(listener);
					site.dom.onmouseover = listener.onHoverSite.bind(listener);
				}
			}
		}
		for (let road of hexGrids.road) {
			road.dom.onclick = listener.onClickRoad.bind(listener);
			road.dom.onmouseover = listener.onHoverRoad.bind(listener);
		}
	}
