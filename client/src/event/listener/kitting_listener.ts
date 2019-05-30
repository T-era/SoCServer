import ClickListener from './index';

export default class KittingListener implements ClickListener {
	onClickHex() { alert("hex"); }
	onClickSite() { alert("site"); }
	onClickRoad() { alert("road"); }
	onHoverHex() { console.log("hex"); }
	onHoverSite() { console.log("site"); }
	onHoverRoad() { console.log("road"); }
}
