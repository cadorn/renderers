
var PACK = require("pack", "private-registry.appspot.com/cadorn.com/packages/devcomp/packages/template-pack/master");


exports.Pack = function() {
    var Pack = function() {};
    Pack.prototype = PACK.Pack(module);
    var self = new Pack();

    self.registerCss("common.css");

    self.registerTemplate("util/trimmed");

    self.registerTemplate("primitives/text");
    self.registerTemplate("primitives/constant");
    self.registerTemplate("primitives/array");
    self.registerTemplate("primitives/map");
    self.registerTemplate("primitives/reference");
    self.registerTemplate("primitives/dictionary");

    self.registerTemplate("structures/trace");
    self.registerTemplate("structures/table");

    return self;
}
