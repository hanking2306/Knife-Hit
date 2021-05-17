"use strict";
cc._RF.push(module, '90247M3rvZKKrfbZmOv4FCi', 'Setting');
// Script/Setting.js

'use strict';

var Emitter = require('Emitter');
var game = require('Game');
cc.Class({
    extends: cc.Component,

    properties: {
        backHome: cc.Node,
        onMusic: cc.Label,
        offMusic: cc.Label,
        toggleMusic: cc.Node,
        onSound: cc.Label,
        offSound: cc.Label,
        toggleSound: cc.Node
    },

    onLoad: function onLoad() {
        this.offMusic.node.active = false;
        this.offSound.node.active = false;
        this.backHome.on('click', this.onBackHome.bind(this));
    },
    onBackHome: function onBackHome() {
        Emitter.instance.emit('transformScreen', 'home');
    },
    onOffMusic: function onOffMusic() {
        game.settingMS(this.onMusic, this.offMusic, this.toggleMusic);
    },
    onOffSound: function onOffSound() {
        game.settingMS(this.onSound, this.offSound, this.toggleSound);
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();