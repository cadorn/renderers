
var TEMPLATE = require("template", "private-registry.appspot.com/cadorn.com/packages/devcomp/packages/template-pack/master");
var template = exports.template = TEMPLATE.Template(module);
var MAP_TEMPLATE = require("primitives/map", "insight");


template.supportsNode = function(node) {
    return (node.type=="map" && node.meta && node.meta["lang.type"]=="array");
};

template.onLoad = function(pack, tags){with(tags) {

    return template.merge(MAP_TEMPLATE.onLoad(pack, tags), {

        VAR_label: "array"
        
    });
}};
