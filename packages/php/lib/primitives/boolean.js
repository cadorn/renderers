
var TEMPLATE = require("template", "private-registry.appspot.com/cadorn.com/packages/devcomp/packages/template-pack/master");
var template = exports.template = TEMPLATE.Template(module);

template.supportsNode = function(node) {
    return (node.meta && node.meta["lang.type"]=="boolean");
};

template.onLoad = function(pack, tags){with(tags) {

    return {

        tag:
            SPAN({"class": pack.__KEY__+"boolean"}, "$node|getValue"),

        getValue: function(node) {
            return node.value.toUpperCase();
        }    
        
    }    
}};
