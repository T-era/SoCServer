"use strict";
exports.__esModule = true;
var field_setting_1 = require("./init/field_setting");
var generate_grid_1 = require("./init/generate_grid");
window.onload = initHex;
function initHex() {
    var setting = {
        CustomPlacement: false,
        CustomThiefPlacement: false
    };
    var grids = generate_grid_1["default"]();
    //	let useTags = document.getElementsByClassName(HEX);
    var hexBuilders = [].map.call(grids.hex, toHexBuilder);
    field_setting_1["default"].setupHex(setting, hexBuilders);
    var pathTags = document.getElementsByClassName("pathg");
    field_setting_1["default"].setupPath(pathTags);
    function toHexBuilder(hexGrid) {
        /*		let useTagId = hexGrid.id;
                let utx = useTagId[1];
                let uty = useTagId[2];
                let textTagId = "t" + utx + uty;
                let textTag = document.getElementById(textTagId);
                return new HexBuilder(utx, uty, {
                    setChanceNo(arg :number) {
                        if (arg) {
                            textTag.textContent = `${arg}`;
                        } else {
                            textTag.textContent = "";
                        }
                    },
                    setType(arg :HexType) {
                        useTag.setAttribute("xlink:href", arg.refId);
                    }
                });
        */ 
    }
}
