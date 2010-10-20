
var TRACING_CONSOLE = require("tracing-console", "registry.pinf.org/cadorn.org/github/fireconsole/packages/firefox-extension/packages/firebug/master");

function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };


var TEMPLATE = require("template", "private-registry.appspot.com/cadorn.com/packages/devcomp/packages/template-pack/master");
var template = exports.template = TEMPLATE.Template(module);

template.supportsNode = function(node) {
    return (node.type=="array");
};

exports.onLoad = template.onLoad = function(pack, tags){with(tags) {

    return {

        VAR_label: "array",

        CONST_Normal: "tag",
        CONST_Short: "shortTag",
        CONST_Collapsed: "collapsedTag",

        tag:
            SPAN({"class": pack.__KEY__+"array"}, SPAN("$VAR_label("),
                FOR("element", "$node,$CONST_Normal|elementIterator",
                    DIV({"class": "element", "$expandable":"$element.expandable", "_elementObject": "$element", "onclick": "$onClick"},
                        SPAN({"class": "value"},
                            TAG("$element.tag", {"element": "$element", "node": "$element.node"})
                        ),
                        IF("$element.more", SPAN({"class": "separator"}, ","))
                    )
                ),
            SPAN(")")),

        collapsedTag:
            SPAN({"class": pack.__KEY__+"array"}, SPAN("$VAR_label("),
                SPAN({"class": "collapsed"}, "... $node|getElementCount ..."),
            SPAN(")")),

        shortTag:
            SPAN({"class": pack.__KEY__+"array"}, SPAN("$VAR_label("),
                FOR("element", "$node,$CONST_Short|elementIterator",
                    SPAN({"class": "element"},
                        SPAN({"class": "value"},
                            TAG("$element.tag", {"element": "$element", "node": "$element.node"})
                        ),
                        IF("$element.more", SPAN({"class": "separator"}, ","))
                    )
                ),
            SPAN(")")),

        expandableStub:
            TAG("$element,$CONST_Collapsed|getTag", {"node": "$element.node"}),
            
        expandedStub:
            TAG("$tag", {"node": "$node", "element": "$element"}),

        moreTag:
            SPAN(" ... "),

        getElementCount: function(node) {
            if(!node.value) return 0;
            return node.value.length || 0;
        },

        getTag: function(element, type) {
            if(type===this.CONST_Short) {
                return this.getRepForNode(element.node, true).shortTag;
            } else
            if(type===this.CONST_Normal) {
                if(element.expandable) {
                    return this.expandableStub;
                } else {
                    return this.getRepForNode(element.node, true).tag;
                }
            } else
            if(type===this.CONST_Collapsed) {
                var rep = this.getRepForNode(element.node, true);
                if(!rep.collapsedTag) {
                    throw "no 'collapsedTag' property in rep: " + rep.toString();
                }
                return rep.collapsedTag;
            }
        },

        elementIterator: function(node, type) {
            var elements = [];
            if(!node.value) return elements;
            for( var i=0 ; i<node.value.length ; i++ ) {
                
                var element = {
                    "node": template.merge(node.value[i], {"wrapped": true}),
                    "more": (i<node.value.length-1),
                    "expandable": this.isExpandable(node.value[i])
                };

                if(i>2 && type==this.CONST_Short) {
                    element["tag"] = this.moreTag;
                } else {
                    element["tag"] = this.getTag(element, type);
                }

                elements.push(element);

                if(i>2 && type==this.CONST_Short) {
                    elements[elements.length-1].more = false;
                    break;
                }
            }
            return elements;
        },

        isExpandable: function(node) {
            return (node.type=="reference" ||
                    node.type=="dictionary" ||
                    node.type=="map" ||
                    node.type=="array");
        },
        
        onClick: function(event) {
            if (!this.util.isLeftClick(event)) {
                return;
            }
            var row = this.util.getAncestorByClass(event.target, "element");
            if(this.util.hasClass(row, "expandable")) {
                this.toggleRow(row);
            }
            event.stopPropagation();
        },
        
        toggleRow: function(row)
        {
            var valueElement = this.util.getElementByClass(row, "value");
            if (this.util.hasClass(row, "expanded"))
            {
                this.util.removeClass(row, "expanded");
                this.expandedStub.replace({
                    "tag": this.expandableStub,
                    "element": row.elementObject,
                    "node": row.elementObject.node
                }, valueElement);
            } else {
                this.util.setClass(row, "expanded");
                this.expandedStub.replace({
                    "tag": this.getRepForNode(row.elementObject.node).tag,
                    "element": row.elementObject,
                    "node": row.elementObject.node
                }, valueElement);
            }
        }        
    }    
}};
