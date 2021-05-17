"use strict";
cc._RF.push(module, '797e84kE55DGr613xxW+hrd', 'MainController');
// Script/MainController.js

'use strict';

var Emitter = require('Emitter');

cc.Class({
    extends: cc.Component,

    properties: {
        homeScreen: cc.Node,
        settingScreen: cc.Node,
        gameOver: cc.Node,
        ranking: cc.Node
    },

    onLoad: function onLoad() {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent('transformScreen', this.onTransformScreen.bind(this));
    },
    onTransformScreen: function onTransformScreen(name) {
        switch (name) {
            case 'home':
                {
                    this.homeScreen.active = true;
                    this.settingScreen.active = false;
                    this.gameOver.active = false;
                    this.ranking.active = false;
                    break;
                }
            case 'setting':
                {
                    this.settingScreen.active = true;
                    this.homeScreen.active = false;
                    this.gameOver.active = false;
                    this.ranking.active = false;
                    break;
                }
            case 'level1':
                {
                    cc.director.loadScene('Level 1');
                    break;
                }
            case 'gameOver':
                {
                    this.gameOver.active = true;
                    this.homeScreen.active = false;
                    this.settingScreen.active = false;
                    this.ranking.active = false;
                    break;
                }
            case 'ranking':
                {
                    this.gameOver.active = false;
                    this.homeScreen.active = false;
                    this.settingScreen.active = false;
                    this.ranking.active = true;
                    break;
                }
        }
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();