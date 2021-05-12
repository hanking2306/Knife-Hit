"use strict";
cc._RF.push(module, 'dfa95b/6cdI6bVWQAr3aO0/', 'Home');
// Script/Other Node/Home.js

'use strict';

var Emitter = require('Emitter');
cc.Class({
    extends: cc.Component,

    properties: {
        setting: cc.Node,
        play: cc.Node
    },

    onLoad: function onLoad() {
        this.setting.on('click', this.settingGame.bind(this));
        this.play.on('click', this.playGame.bind(this));
    },
    settingGame: function settingGame() {
        Emitter.instance.emit('transformScreen', 'setting');
    },
    playGame: function playGame() {
        Emitter.instance.emit('transformScreen', 'level1');
    },
    start: function start() {
        cc.log(this);
    }
}

// update (dt) {},
);

cc._RF.pop();