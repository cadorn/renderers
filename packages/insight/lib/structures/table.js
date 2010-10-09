
var TRACING_CONSOLE = require("tracing-console", "registry.pinf.org/cadorn.org/github/fireconsole/packages/firefox-extension/packages/firebug/master");


var TEMPLATE = require("template", "private-registry.appspot.com/cadorn.com/packages/devcomp/packages/template-pack/master");
var template = exports.template = TEMPLATE.Template(module);


template.onLoad = function(pack, tags){with(tags) {

    return {

        VAR_hideShortTagOnExpand: false,

        tag:
            DIV({"class": pack.__KEY__+"structures-table"},
                TABLE({"cellpadding": 3, "cellspacing": 0},
                    TBODY(
                        TR(
                            FOR("column", "$node|getHeaders",
                                TH({"class": "header"}, TAG("$column.tag", {"node": "$column.node"}))
                            )
                        ),
                        FOR("row", "$node|getRows",
                            TR(
                                FOR("cell", "$row|getCells",
                                    TD({"class": "cell", "_cellNodeObj": "$cell.node", "onclick":"$onCellClick"},
                                        TAG("$cell.tag", {"node": "$cell.node"}))
                                )
                            )
                        )
                    )
                )
            ),

        shortTag:
            SPAN({"class": pack.__KEY__+"structures-table"}, TAG("$node|getTitleTag", {"node": "$node|getTitleNode"})),

        getTitleTag: function(node) {
            var rep = this.getRepForNode(this.getTitleNode(node), true);
            return rep.shortTag || rep.tag;
        },

        getTitleNode: function(node) {
            return template.merge(node.compact().title, {"wrapped": false});
        },

        getHeaders: function(node) {
            var header = node.compact().header;
            if(!header || header.type!="array") {
                return [];
            }
            var items = [];
            for (var i = 0; i < header.value.length; i++) {
                var rep = this.getRepForNode(header.value[i], true);
                items.push({
                    "node": template.merge(header.value[i], {"wrapped": false}),
                    "tag": rep.shortTag || rep.tag
                });
            }
            return items;
        },

        getRows: function(node) {
            var data = node.compact().data;
            if(!data || data.type!="array") {
                return [];
            }
            return data.value;
        },

        getCells: function(node) {
            var items = [];
            if(node.value) {
                for (var i = 0; i < node.value.length; i++) {
                    var rep = this.getRepForNode(node.value[i], true);
                    items.push({
                        "node": template.merge(node.value[i], {"wrapped": false}),
                        "tag": rep.shortTag || rep.tag
                    });
                }
            }
            return items;
        },

        onCellClick: function(event) {
            event.stopPropagation();
            var tag = event.target;
            while(tag.parentNode) {
                if(tag.cellNodeObj) {
                    break;
                }
                tag = tag.parentNode;
            }
            this.dispatchEvent('inspectObject', [event, {
                "args": {"node": tag.cellNodeObj}
            }]);
        }

    }
}};
