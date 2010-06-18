

function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };


var TEMPLATE = require("template", "private-registry.appspot.com/cadorn.com/packages/devcomp/packages/template-pack/master");
var template = exports.template = TEMPLATE.Template(module);

template.supportsNode = function(node) {
    return (node.type=="text" && node.meta && node.meta["lang.type"]=="unknown");
};

template.onLoad = function(pack, tags){with(tags) {

    return {

        tag:
            DIV("UNKNOWN EXPANDED"),

        collapsedTag:
            DIV("UNKNOWN COLLAPSED"),

        shortTag:
            DIV("UNKNOWN SHORT")
    }    
}};
