"use strict";
cc._RF.push(module, 'dfa95b/6cdI6bVWQAr3aO0/', 'Home');
// Script/Menu/Home.js

'use strict';

var Emitter = require('Emitter');
cc.Class({
    extends: cc.Component,

    properties: {
        setting: cc.Button,
        play: cc.Button,
        ranking: cc.Button
    },

    onLoad: function onLoad() {
        this.setting.node.on('click', this.settingGame.bind(this));
        this.play.node.on('click', this.playGame.bind(this));
        this.ranking.node.on('click', this.rankingGame.bind(this));
    },
    settingGame: function settingGame() {
        Emitter.instance.emit('transformScreen', 'setting');
    },
    playGame: function playGame() {
        Emitter.instance.emit('transformScreen', 'level1');
    },
    rankingGame: function rankingGame() {
        Emitter.instance.emit('transformScreen', 'ranking');
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();