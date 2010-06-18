
var TEMPLATE = require("template", "private-registry.appspot.com/cadorn.com/packages/devcomp/packages/template-pack/master");
var template = exports.template = TEMPLATE.Template(module);

template.supportsNode = function(node) {
    return (node.type=="constant");
};

template.onLoad = function(pack, tags){with(tags) {

    return {

        tag: SPAN({"class": pack.__KEY__+"constant"},
                  "$node.value"),
        
        shortTag: SPAN({"class": pack.__KEY__+"constant"},
                       "$node.value")
    }    
}};

