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
