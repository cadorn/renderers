
var TEMPLATE = require("template", "private-registry.appspot.com/cadorn.com/packages/devcomp/packages/template-pack/master");
var template = exports.template = TEMPLATE.Template(module);

template.supportsNode = function(node) {
    return true;
};

template.onLoad = function(pack, tags){with(tags) {

    return {

        tag: SPAN({"class": pack.__KEY__+"unknown"},
                  "$node.value"),
        
        shortTag: SPAN({"class": pack.__KEY__+"unknown"},
                       "$node.value")
    }    
}};

