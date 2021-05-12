"use strict";
cc._RF.push(module, 'dfa95b/6cdI6bVWQAr3aO0/', 'Home');
// Script/Home Node/Home.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {},
    playGame: function playGame() {
        cc.director.loadScene('Level 1');
    },
    settingGame: function settingGame() {
        cc.director.loadScene('Setting');
    },
    rankGame: function rankGame() {},
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();