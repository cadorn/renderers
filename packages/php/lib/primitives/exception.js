
var TRACING_CONSOLE = require("tracing-console", "registry.pinf.org/cadorn.org/github/fireconsole/packages/firefox-extension/packages/firebug/master");


function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };


var TEMPLATE = require("template", "private-registry.appspot.com/cadorn.com/packages/devcomp/packages/template-pack/master");
var template = exports.template = TEMPLATE.Template(module);
var TRACE_TEMPLATE = require("structures/trace", "insight");


template.supportsNode = function(node) {
    return (node.type=="dictionary" && node.meta && node.meta["lang.type"]=="exception");
};

template.onLoad = function(pack, tags){with(tags) {

    return template.merge(TRACE_TEMPLATE.onLoad(pack, tags), {


        collapsedTag:
            SPAN({"class": pack.__KEY__+"exception"}, "$node|getCaption"),
        
        
        getCaption: function(node) {
            return node.meta["lang.class"] + ": " + node.value.message.value;
        },
        
        getTrace: function(node) {
            return [].concat(node.value.trace.value);
        }

    });
}};
