

function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };



var TEMPLATE = require("template", "private-registry.appspot.com/cadorn.com/packages/devcomp/packages/template-pack/master");
var template = exports.template = TEMPLATE.Template(module);

template.supportsNode = function(node) {
    return (node.type=="reference");
};

exports.onLoad = template.onLoad = function(pack, tags){with(tags) {

    return {

        CONST_Normal: "tag",
        CONST_Short: "shortTag",
        CONST_Collapsed: "collapsedTag",

        tag:
            SPAN({"class": pack.__KEY__+"reference"},
            TAG("$node,$CONST_Normal|getTag", {"node": "$node|getInstanceNode"})),
        
        shortTag:
            SPAN({"class": pack.__KEY__+"reference"},
            TAG("$node,$CONST_Collapsed|getTag", {"node": "$node|getInstanceNode"})),

        collapsedTag:
            SPAN({"class": pack.__KEY__+"reference"},
            TAG("$node,$CONST_Collapsed|getTag", {"node": "$node|getInstanceNode"})),

            
        getTag: function(node, type) {
            return this.getRepForNode(this.getInstanceNode(node))[type];
        },
        
        getInstanceNode: function(node) {
            return node.getInstance();
        }
    }    
}};
