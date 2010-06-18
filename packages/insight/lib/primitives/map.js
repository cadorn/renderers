
var TRACING_CONSOLE = require("tracing-console", "registry.pinf.org/cadorn.org/github/fireconsole/packages/firefox-extension/packages/firebug/master");


var TEMPLATE = require("template", "private-registry.appspot.com/cadorn.com/packages/devcomp/packages/template-pack/master");
var template = exports.template = TEMPLATE.Template(module);

template.supportsNode = function(node) {
    return (node.type=="map");
};

exports.onLoad = template.onLoad = function(pack, tags){with(tags) {

    return {

        VAR_label: "map",

        CONST_Normal: "tag",
        CONST_Short: "shortTag",

        tag:
            SPAN({"class": pack.__KEY__+"map"}, SPAN("$VAR_label("),
                FOR("pair", "$node,$CONST_Normal|mapIterator",
                    DIV({"class": "pair"},
                        TAG("$pair.key.tag", {"node": "$pair.key.node"}),
                        SPAN({"class": "delimiter"}, "=>"),
                        TAG("$pair.value.tag", {"node": "$pair.value.node"}),
                        IF("$pair.more", SPAN({"class": "separator"}, ","))
                    )
                ),
            SPAN(")")),

        shortTag:
            SPAN({"class": pack.__KEY__+"map"}, SPAN("$VAR_label("),
                FOR("pair", "$node,$CONST_Short|mapIterator",
                    SPAN({"class": "pair"},
                        TAG("$pair.key.tag", {"node": "$pair.key.node"}),
                        SPAN({"class": "delimiter"}, "=>"),
                        TAG("$pair.value.tag", {"node": "$pair.value.node"}),
                        IF("$pair.more", SPAN({"class": "separator"}, ","))
                    )
                ),
            SPAN(")")),

        collapsedTag: 
            SPAN({"class": pack.__KEY__+"map"}, SPAN("$VAR_label("),
                SPAN({"class": "collapsed"}, "... $node|getItemCount ..."),
            SPAN(")")),

        moreTag:
            SPAN(" ... "),

        getItemCount: function(node) {
            if(!node.value) return 0;
            return node.value.length;
        },

        mapIterator: function(node, type) {
            var pairs = [];
            if(!node.value) return pairs;
            for( var i=0 ; i<node.value.length ; i++ ) {

                var valueRep = getTag(this.getRepForNode(node.value[i][1], true), type);

                if(i>2 && type==this.CONST_Short) {
                    valueRep = this.moreTag;
                }

                pairs.push({
                    "key": {
                        "tag": getTag(this.getRepForNode(node.value[i][0], true), type),
                        "node": template.merge(node.value[i][0], {"wrapped": true})
                    },
                    "value": {
                        "tag": valueRep,
                        "node": template.merge(node.value[i][1], {"wrapped": true})
                    },
                    "more": (i<node.value.length-1)
                });

                if(i>2 && type==this.CONST_Short) {
                    pairs[pairs.length-1].more = false;
                    break;
                }
            }
            return pairs;
        }
    }    
}};


function getTag(rep, type) {
    if(!rep[type]) {
        if(type=="shortTag") {
            return rep.tag;
        }
        throw new Error("Rep does not have tag of type: " + type);
    }
    return rep[type];
}
