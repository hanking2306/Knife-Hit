(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Ranking.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e0970Qs+KlDNLo3AL44C10K', 'Ranking', __filename);
// Script/Ranking.js

'use strict';

var Emitter = require('Emitter');
var game = require('Game');
cc.Class({
    extends: cc.Component,

    properties: {
        backHome: cc.Button,
        listTop: cc.ScrollView,
        addTop: cc.Prefab,
        masterName: cc.Prefab,
        index: 0
    },

    onLoad: function onLoad() {
        Emitter.instance.registerEvent('showRank', this.onGetArray.bind(this));
        this.addTopTen();
        this.backHome.node.on('click', this.onBackHome, this);
        Emitter.instance.registerEvent('addMasterName', this.addMaster.bind(this));
    },
    onBackHome: function onBackHome() {
        Emitter.instance.emit('transformScreen', 'home');
    },
    onGetArray: function onGetArray(nameMaster, scoreMaster) {
        var goToPoint = this.listTop.node.children[1].children[0];
        var newMasterName = new cc.instantiate(this.masterName);
        newMasterName.getComponent(cc.Label).string = nameMaster;
        newMasterName.x = -20;
        newMasterName.y = -80 * this.index + 80;
        var newMasterScore = new cc.instantiate(this.masterName);
        newMasterScore.getComponent(cc.Label).string = scoreMaster;
        newMasterScore.x = 0;
        newMasterScore.y = -80 * this.index + 80;
        this.index++;
        goToPoint.children[1].addChild(newMasterName);
        goToPoint.children[2].addChild(newMasterScore);
    },
    addTopTen: function addTopTen() {
        for (var i = 1; i < 10; i++) {
            var topTen = new cc.instantiate(this.addTop);
            topTen.getComponent(cc.Label).string = "Top" + " " + (i + 1);
            topTen.x = -50;
            topTen.y = -80 * i;
            this.listTop.node.children[1].children[0].children[0].addChild(topTen);
        }
    },
    addMaster: function addMaster(newMaster, newScore) {
        var goToPoint = this.listTop.node.children[1].children[0];
        var newMasterName = new cc.instantiate(this.masterName);
        newMasterName.getComponent(cc.Label).string = newMaster;
        newMasterName.x = -20;
        newMasterName.y = -80 * this.index + 80;
        var newMasterScore = new cc.instantiate(this.masterName);
        newMasterScore.getComponent(cc.Label).string = newScore;
        newMasterScore.x = 0;
        newMasterScore.y = -80 * this.index + 80;
        this.index++;
        if (goToPoint.children[1].childrenCount < 10) {
            goToPoint.children[1].addChild(newMasterName);
            goToPoint.children[2].addChild(newMasterScore);
        } else {
            // cc.log(score);
        }
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
        //# sourceMappingURL=Ranking.js.map
        