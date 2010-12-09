

function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };


var TEMPLATE = require("template", "private-registry.appspot.com/cadorn.com/packages/devcomp/packages/template-pack/master");
var template = exports.template = TEMPLATE.Template(module);

template.supportsNode = function(node) {
    return (node.meta && node.meta["encoder.trimmed"] && !node.meta["encoder.trimmed.partial"]);
};

exports.onLoad = template.onLoad = function(pack, tags){with(tags) {

    return {

        tag:
            SPAN({"class": pack.__KEY__+"util-trimmed"},
                "$node|getNotice"
            ),

        collapsedTag: 
            SPAN({"class": pack.__KEY__+"util-trimmed"},
                "$node|getNotice"
            ),


        getNotice: function(node) {
            return node.meta["encoder.notice"];
        }
    }
}};
