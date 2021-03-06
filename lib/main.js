"use strict";

var pageMod = require("sdk/page-mod");

pageMod.PageMod({
    attachTo: ["top", "frame"],
    include: "*",
    contentScriptFile: "./replace.js",
    contentScriptOptions: {
        replacements: [
            ["digital crown", "knob"],
            ["kleenex", "facial tissue"],
            ["taptic engine", "vibrator"]
        ]
    }
});
