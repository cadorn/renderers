
var TEMPLATE = require("template", "private-registry.appspot.com/cadorn.com/packages/devcomp/packages/template-pack/master");
var template = exports.template = TEMPLATE.Template(module);
var REFERENCE_TEMPLATE = require("primitives/reference", "insight");

template.supportsNode = function(node) {
    return (node.type=="reference");
};

template.onLoad = function(pack, tags){with(tags) {

    return template.merge(REFERENCE_TEMPLATE.onLoad(pack, tags), {

        getTag: function(node, type) {
            return this.getRepForNode(this.getInstanceNode(node))[type];
        }
        
    });
}};
