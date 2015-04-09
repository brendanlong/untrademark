/*globals self: false */
"use strict";

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function capitalizeAll(str) {
    var words = str.split(" ");
    var result = "";
    for (var i = 0; i < words.length; ++i) {
        var word = capitalize(words[i]);
        if (i > 0) {
            result += " ";
        }
        result += word;
    }
    return result;
}

var regexFunctions = [
    String.toLowerCase,
    String.toUpperCase,
    capitalize,
    capitalizeAll
];

var replacements = [];
for (var r = 0; r < self.options.replacements.length; ++r) {
    var replacement = self.options.replacements[r];
    var find = replacement[0];
    var replace = replacement[1];

    for (var f = 0; f < regexFunctions.length; ++f) {
        replacements.push([
            new RegExp(regexFunctions[f](find).replace(" ", "\\s"), "g"),
            regexFunctions[f](replace)
        ]);
    }
}

function doReplacement(node) {
    if (node.nodeType === 3 && node.data.trim().length > 0) {
        for (var r = replacements.length; r--;) {
            var replacement = replacements[r];
            node.data = node.data.replace(replacement[0], replacement[1]);
        }
    }
}

var observer = new MutationObserver(function(mutations) {
    observer.disconnect();
    mutations.forEach(function(mutation) {
        walkTheDOM(mutation.target, doReplacement);
    });
    observer.observe(document.body, {childList: true, subtree: true});
});
observer.observe(document.body, {childList: true, subtree: true});

/* From: http://www.javascriptcookbook.com/article/Traversing-DOM-subtrees-with-a-recursive-walk-the-DOM-function/ */
function walkTheDOM(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walkTheDOM(node, func);
        node = node.nextSibling;
    }
}

walkTheDOM(document.body, doReplacement);
