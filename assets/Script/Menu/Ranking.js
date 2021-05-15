const Emitter = require('Emitter');
const game = require('Game');
cc.Class({
    extends: cc.Component,

    properties: {
        backHome: cc.Button,
        listTop: cc.ScrollView,
        addTop: cc.Prefab,
        masterName: cc.Prefab,
        index: 0,
    },

    onLoad() {
        Emitter.instance.registerEvent('showRank', this.onGetArray.bind(this));
        this.addTopTen();
        this.backHome.node.on('click', this.onBackHome, this);
        Emitter.instance.registerEvent('addMasterName', this.addMaster.bind(this));
    },

    onBackHome() {
        Emitter.instance.emit('transformScreen', 'home');
    },

    onGetArray(nameMaster, scoreMaster) {
        let goToPoint = this.listTop.node.children[1].children[0];
        let newMasterName = new cc.instantiate(this.masterName);
        newMasterName.getComponent(cc.Label).string = nameMaster;
        newMasterName.x = 0;
        newMasterName.y = -80 * this.index + 80;
        let newMasterScore = new cc.instantiate(this.masterName);
        newMasterScore.getComponent(cc.Label).string = scoreMaster;
        newMasterScore.x = 0;
        newMasterScore.y = -80 * this.index + 80;
        this.index++;
        goToPoint.children[1].addChild(newMasterName);
        goToPoint.children[2].addChild(newMasterScore);
    },

    addTopTen() {
        for (let i = 1; i < 10; i++) {
            let topTen = new cc.instantiate(this.addTop);
            topTen.getComponent(cc.Label).string = "Top" + " " + (i + 1);
            topTen.x = -50;
            topTen.y = -80 * i;
            this.listTop.node.children[1].children[0].children[0].addChild(topTen);
        }
    },

    addMaster(newMaster, newScore) {
        let goToPoint = this.listTop.node.children[1].children[0];
        let newMasterName = new cc.instantiate(this.masterName);
        newMasterName.getComponent(cc.Label).string = newMaster;
        newMasterName.x = 0;
        newMasterName.y = -80 * this.index + 80;
        let newMasterScore = new cc.instantiate(this.masterName);
        newMasterScore.getComponent(cc.Label).string = newScore;
        newMasterScore.x = 0;
        newMasterScore.y = -80 * this.index + 80;
        this.index++;
        if (goToPoint.children[1].childrenCount < 10) {
            goToPoint.children[1].addChild(newMasterName);
            goToPoint.children[2].addChild(newMasterScore);
        }
        else {
            // cc.log(score);
        }
    },

    start() {

    },

    // update (dt) {},
});
