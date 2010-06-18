
var TEMPLATE = require("template", "private-registry.appspot.com/cadorn.com/packages/devcomp/packages/template-pack/master");
var template = exports.template = TEMPLATE.Template(module);

template.supportsNode = function(node) {
    return (node.meta && node.meta["lang.type"]=="integer");
};

template.onLoad = function(pack, tags){with(tags) {

    return {

        tag:
            SPAN({"class": pack.__KEY__+"integer"}, "$node|getValue"),

        getValue: function(node) {
            return addCommas(node.value);
        }    
    }    
}};

// @see http://www.mredkj.com/javascript/numberFormat.html
function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
