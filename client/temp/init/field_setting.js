"use strict";
exports.__esModule = true;
var types_1 = require("../types");
exports["default"] = {
    setupHex: function (setting, hexBuilders) {
        var desertIsCenter = !setting.CustomThiefPlacement;
        setupHexType(desertIsCenter, hexBuilders);
        setupHexAssigns(!setting.CustomPlacement, hexBuilders);
        return hexBuilders.map(function (b) { return b.build(); });
    },
    setupPath: function (pathTags) {
        for (var i = 0, max = pathTags.length; i < max; i++) {
            var pathTag = pathTags[i];
            initPathTag(pathTag);
        }
        function initPathTag(pathTag) {
            var pathTagId = pathTag.id;
            var pp = pathTagId.split("_");
            var p1 = document.getElementById("s" + pp[1]);
            var p2 = document.getElementById("s" + pp[2]);
            pathTag.onclick = function () {
                console.log(p1, p2);
                p1.classList.add("test");
                ;
                p2.classList.add("test");
                ;
                p1.onclick = function () { alert("1"); };
                p2.onclick = function () { alert("2"); };
            };
        }
    }
};
function setupHexType(desertIsCenter, hexBuilders) {
    var rnd = randomSelect(desertIsCenter);
    var i = 0;
    for (var _i = 0, hexBuilders_1 = hexBuilders; _i < hexBuilders_1.length; _i++) {
        var builder = hexBuilders_1[_i];
        builder.type = rnd[i++];
    }
}
var CHANCE_LIST = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];
var ASSIGN_ORDER = [0, 3, 7, 12, 16, 17, 18, 15, 11, 6, 2, 1, 4, 8, 13, 14, 10, 5, 9];
function setupHexAssigns(ruledAssign, hexBuilders) {
    var assigns = ruledAssign ? CHANCE_LIST : shuffleCopy(CHANCE_LIST);
    var i = 0;
    for (var _i = 0, ASSIGN_ORDER_1 = ASSIGN_ORDER; _i < ASSIGN_ORDER_1.length; _i++) {
        var index = ASSIGN_ORDER_1[_i];
        var target = hexBuilders[index];
        if (!types_1.HexType.isDesert(target.type)) {
            target.chanceNo = assigns[i++];
        }
    }
}
function randomSelect(desertIsCenter) {
    var choices = [];
    for (var _i = 0, _a = types_1.HexType.HEX_TYPES; _i < _a.length; _i++) {
        var hexType = _a[_i];
        if (desertIsCenter && hexType.refId === types_1.HexType.REF_ID_DESERT) {
            continue;
        }
        else {
            for (var i = 0, max = hexType.count; i < max; i++) {
                choices.push(hexType);
            }
        }
    }
    shuffle(choices);
    if (desertIsCenter) {
        choices.splice(9, 0, types_1.HexType.HEX_TYPES[0]);
    }
    return choices;
}
function shuffleCopy(l) {
    var copy = l.slice(0, l.length);
    shuffle(copy);
    return copy;
}
function shuffle(l) {
    for (var i = l.length - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = l[i];
        l[i] = l[r];
        l[r] = tmp;
    }
}
