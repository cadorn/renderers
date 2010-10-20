
var TRACING_CONSOLE = require("tracing-console", "registry.pinf.org/cadorn.org/github/fireconsole/packages/firefox-extension/packages/firebug/master");


var TEMPLATE = require("template", "private-registry.appspot.com/cadorn.com/packages/devcomp/packages/template-pack/master");
var template = exports.template = TEMPLATE.Template(module);

template.supportsNode = function(node) {
    return (node.meta && node.meta["lang.type"]=="string");
};

template.onLoad = function(pack, tags){with(tags) {

    return {

        VAR_wrapped: false,

        tag:
            SPAN({"class": pack.__KEY__+"string", "wrapped": "$node.wrapped"},
                IF("$node.wrapped", "'"),
                "$node|getValue",
                IF("$node.wrapped", "'")),

        shortTag:
            SPAN({"class": pack.__KEY__+"string", "wrapped": "$node.wrapped"},
                IF("$node.wrapped", "'"),
                "$node|getShortValue",
                IF("$node.wrapped", "'")),

        getValue: function(node) {
            return node.value;
        },
        
        getShortValue: function(node) {
            if(!node.parentNode) {
                return node.value;
            } else {
                return cropString(node.value);
            }
        }    
    }    
}};

function cropString(value) {
    var limit = 50;
    if (value.length > limit) {
        return escapeNewLines(value.substr(0, limit/2) + "..." + value.substr(value.length-limit/2));
    } else {
        return escapeNewLines(value);
    }
}

function escapeNewLines(value) {
    return (""+value).replace(/\r/g, "\\r").replace(/\n/g, "\\n");
}
