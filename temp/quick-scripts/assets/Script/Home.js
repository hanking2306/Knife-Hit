(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Home.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dfa95b/6cdI6bVWQAr3aO0/', 'Home', __filename);
// Script/Home.js

'use strict';

var Emitter = require('Emitter');
cc.Class({
    extends: cc.Component,

    properties: {
        setting: cc.Button,
        play: cc.Button,
        ranking: cc.Button,
        logoWolf: cc.Node
    },

    onLoad: function onLoad() {
        this.preLoadRank = {
            name: 'Gamer',
            score: 0
        };
        Emitter.instance.registerEvent('getAndAdd', this.onGetAndAdd.bind(this));
        this.setting.node.on('click', this.settingGame.bind(this));
        this.play.node.on('click', this.playGame.bind(this));
        this.ranking.node.on('click', this.rankingGame.bind(this));
        cc.tween(this.logoWolf).repeatForever(cc.tween(this.logoWolf).to(1, { opacity: 100 }).to(1, { opacity: 255 })).start();
    },
    onGetAndAdd: function onGetAndAdd(masterName, masterScore) {
        this.preLoadRank.name = masterName;
        this.preLoadRank.score = masterScore;
        for (var i = 0; i < this.preLoadRank.length - 1; i++) {
            if (i < 10) {
                Emitter.instance.emit('showRank', this.preLoadRank.name, this.preLoadRank.score);
            }
        };
    },
    settingGame: function settingGame() {
        Emitter.instance.emit('transformScreen', 'setting');
    },
    playGame: function playGame() {
        cc.tween(this.logoWolf).to(1, { scale: 0.6 }).start();
        setTimeout(function () {
            Emitter.instance.emit('transformScreen', 'level1');
        }, 500);
    },
    rankingGame: function rankingGame() {
        Emitter.instance.emit('transformScreen', 'ranking');
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Home.js.map
        