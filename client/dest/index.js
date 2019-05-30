(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./init/field_setting":2,"./init/generate_grid":3}],2:[function(require,module,exports){
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

},{"../types":4}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports["default"] = generateHexGrid;
var SiteConnect = /** @class */ (function () {
    function SiteConnect(dom) {
        this.dom = dom;
        this.road = [];
        this.incomeFrom = [];
    }
    SiteConnect.prototype.addAround = function (around) {
        this.incomeFrom.push(around);
    };
    return SiteConnect;
}());
exports.SiteConnect = SiteConnect;
var HexConnect = /** @class */ (function () {
    function HexConnect(dom, labelDom) {
        this.dom = dom;
        this.labelDom = labelDom;
        this.around = [];
    }
    HexConnect.prototype.addAround = function (around) {
        this.around.push(around);
    };
    return HexConnect;
}());
exports.HexConnect = HexConnect;
var RoadConnect = /** @class */ (function () {
    function RoadConnect() {
    }
    return RoadConnect;
}());
exports.RoadConnect = RoadConnect;
var NS_SVG = 'http://www.w3.org/2000/svg';
var NS_XLINK = 'http://www.w3.org/1999/xlink';
function generateHexGrid() {
    //   a b c
    //  d e f g
    // h i j k l
    //  m n o p
    //   q r s
    var main = document.getElementById('main');
    var firstLine = true;
    var hexList = [];
    var siteList = [[]];
    var roadList = [];
    for (var y = 0; y < 5; y++) {
        hexList[y] = [];
        siteList[y + 1] = [];
        var cnt = 5 - Math.abs(2 - y);
        var xFrom = 6 - cnt;
        var xTo = 11 - xFrom;
        var firstInLine = true;
        for (var x = xFrom; x < xTo; x += 2) {
            var hex = createHex(x, y, main);
            var hexLabel = createHexLabel(x, y, main);
            var hc = new HexConnect(hex, hexLabel);
            hexList[y][x] = hc;
            // A
            var siteA = createSite(x - 1, y, main, 0);
            var scA = new SiteConnect(siteA);
            join(hc, scA);
            siteList[y][x - 1] = scA;
            if (!firstLine) {
                if (hexList[y - 1][x - 1])
                    join(hexList[y - 1][x - 1], scA);
            }
            // B
            var siteB = createSite(x, y, main, -30);
            var scB = new SiteConnect(siteB);
            join(hc, scB);
            siteList[y][x] = scB;
            if (!firstLine) {
                if (hexList[y - 1][x - 1])
                    join(hexList[y - 1][x - 1], scB);
                if (hexList[y - 1][x + 1])
                    join(hexList[y - 1][x + 1], scB);
            }
            // C
            if (x >= xTo - 2) {
                var siteC = createSite(x + 1, y, main, 0);
                var scC = new SiteConnect(siteC);
                join(hc, scC);
                siteList[y][x + 1] = scC;
                if (!firstLine) {
                    if (hexList[y - 1][x + 1])
                        join(hexList[y - 1][x + 1], scC);
                }
            }
            if (firstInLine && y >= 2) {
                var siteD = createSite(x - 1, y + 1, main, -30);
                var scD = new SiteConnect(siteD);
                join(hc, scD);
                siteList[y + 1][x - 1] = scD;
            }
            // E
            if (y == 4) {
                var siteE = createSite(x, y + 1, main, 0);
                var scE = new SiteConnect(siteE);
                join(hc, scE);
                siteList[y + 1][x] = scE;
            }
            // F
            if (y == 4 || x >= xTo - 2 && y >= 2) {
                var siteF = createSite(x + 1, y + 1, main, -30);
                var scF = new SiteConnect(siteF);
                join(hc, scF);
                siteList[y + 1][x + 1] = scF;
            }
            firstInLine = false;
        }
        firstLine = false;
    }
    return null;
    function join(hex, site) {
        hex.addAround(site);
        site.addAround(hex);
    }
    function createHex(x, y, parent) {
        var use = document.createElementNS(NS_SVG, 'use');
        use.setAttributeNS(NS_XLINK, 'href', '#hex');
        use.setAttribute('x', String(x * 60 - 50));
        use.setAttribute('y', String(y * 90 + 10));
        use.classList.add('hex');
        parent.appendChild(use);
        return use;
    }
    function createHexLabel(x, y, parent) {
        var text = document.createElementNS(NS_SVG, 'text');
        text.setAttribute('x', String(x * 60 + 10));
        text.setAttribute('y', String(y * 90 + 70));
        text.classList.add('text');
        parent.appendChild(text);
        return text;
    }
    function createSite(x, y, parent, dy) {
        var dom = document.createElementNS(NS_SVG, 'circle');
        dom.setAttributeNS(NS_XLINK, 'href', '#hex');
        dom.setAttribute('cx', String(x * 60 + 10));
        dom.setAttribute('cy', String(y * 90 + 40 + dy));
        dom.setAttribute('r', String(10));
        dom.classList.add('settlement');
        parent.appendChild(dom);
        return dom;
    }
}

},{}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var ResourceType;
(function (ResourceType) {
    ResourceType[ResourceType["Wool"] = 0] = "Wool";
    ResourceType[ResourceType["Wood"] = 1] = "Wood";
    ResourceType[ResourceType["Brick"] = 2] = "Brick";
    ResourceType[ResourceType["Iron"] = 3] = "Iron";
    ResourceType[ResourceType["Wheat"] = 4] = "Wheat";
})(ResourceType || (ResourceType = {}));
var HexType = /** @class */ (function () {
    function HexType(refId, product, count) {
        this.refId = refId;
        this.product = product;
        this.count = count;
    }
    HexType.isDesert = function (hexType) {
        return hexType.refId == HexType.REF_ID_DESERT;
    };
    HexType.REF_ID_DESERT = "#hex-center";
    HexType.HEX_TYPES = [
        new HexType(HexType.REF_ID_DESERT, null, 1),
        new HexType("#hex-field", ResourceType.Wheat, 4),
        new HexType("#hex-mine", ResourceType.Iron, 3),
        new HexType("#hex-meadow", ResourceType.Wool, 4),
        new HexType("#hex-clay", ResourceType.Brick, 3),
        new HexType("#hex-forest", ResourceType.Wood, 4),
    ];
    return HexType;
}());
exports.HexType = HexType;
var HexBuilder = /** @class */ (function () {
    function HexBuilder(x, y, dom) {
        this.x = x;
        this.y = y;
        this.dom = dom;
    }
    HexBuilder.prototype.build = function () {
        return new Hex(this.dom, this.x, this.y, this.chanceNo, this.type);
    };
    return HexBuilder;
}());
exports.HexBuilder = HexBuilder;
var Hex = /** @class */ (function () {
    function Hex(dom, x, y, chanceNo, type) {
        this.x = x;
        this.y = y;
        this.chanceNo = chanceNo;
        this.type = type;
        this.dom = dom;
        dom.setChanceNo(chanceNo);
        dom.setType(type);
    }
    return Hex;
}());
exports.Hex = Hex;

},{}]},{},[1]);
