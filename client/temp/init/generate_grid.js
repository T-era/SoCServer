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
