
var TEMPLATE = require("template", "private-registry.appspot.com/cadorn.com/packages/devcomp/packages/template-pack/master");
var template = exports.template = TEMPLATE.Template(module);
var ARRAY_TEMPLATE = require("primitives/array", "insight");


template.supportsNode = function(node) {
    return (node.type=="array" && node.meta && node.meta["lang.type"]=="array");
};

template.onLoad = function(pack, tags){with(tags) {

    return template.merge(ARRAY_TEMPLATE.onLoad(pack, tags), {

        VAR_label: "array"
        
    });
}};
