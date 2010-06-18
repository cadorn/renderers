

function dump(obj) { print(require('test/jsdump').jsDump.parse(obj)) };


var TEMPLATE = require("template", "private-registry.appspot.com/cadorn.com/packages/devcomp/packages/template-pack/master");
var template = exports.template = TEMPLATE.Template(module);
var DICTIONARY_TEMPLATE = require("primitives/dictionary", "insight");


template.supportsNode = function(node) {
    return (node.type=="dictionary" && node.meta && node.meta["lang.type"]=="object");
};

template.onLoad = function(pack, tags){with(tags) {

    return template.merge(DICTIONARY_TEMPLATE.onLoad(pack, tags), {

        getLabel: function(node) {
            return node.meta["lang.class"];
        },
        
        getMemberNameDecorator: function(member) {

            var decorator = [];

            if(member.node.meta["lang.visibility"]) {
                decorator.push(member.node.meta["lang.visibility"]);
            } else
            if(member.node.meta["lang.undeclared"]) {
                decorator.push("undeclared");
            }

            if(member.node.meta["lang.static"]) {
                decorator.push("static");
            }

            return decorator.join("-");
        }

    });
}};
