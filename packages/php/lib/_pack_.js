
var PACK = require("pack", "private-registry.appspot.com/cadorn.com/packages/devcomp/packages/template-pack/master");
var INSIGHT_PACK = require("_pack_", "insight");


exports.Pack = function() {
    var Pack = function() {};
    Pack.prototype = PACK.Pack(module);
    var self = new Pack();

    self.inheritCss(INSIGHT_PACK.Pack());
    self.registerCss("primitives.css");

    self.registerTemplate("primitives/array-indexed");
    self.registerTemplate("primitives/array-associative");
    self.registerTemplate("primitives/boolean");
    self.registerTemplate("primitives/exception");
    self.registerTemplate("primitives/float");
    self.registerTemplate("primitives/integer");
    self.registerTemplate("primitives/null");
    self.registerTemplate("primitives/object");
    self.registerTemplate("primitives/object-reference");
    self.registerTemplate("primitives/resource");
    self.registerTemplate("primitives/string");
    self.registerTemplate("primitives/unknown");
    
    return self;
}
