const Emitter = require('Emitter');

cc.Class({
    extends: cc.Component,

    properties: {
        backHome: cc.Button,
        listTop: cc.ScrollView,
        addTop: cc.Prefab,
        masterName: cc.Prefab,
        index: 1,
    },

    onLoad() {
        this.addTopTen();
        this.backHome.node.on('click', this.onBackHome, this);
        Emitter.instance.registerEvent('addMasterName', this.addMaster.bind(this));
    },

    onBackHome() {
        Emitter.instance.emit('transformScreen', 'home');
    },

    addTopTen() {
        for (let i = 1; i < 10; i++) {
            let topTen = new cc.instantiate(this.addTop);
            topTen.getComponent(cc.Label).string = "Top" + "  " + (i+1);
            topTen.x = -285;
            topTen.y = -70 * i;
            this.listTop.node.children[1].children[0].addChild(topTen);
        }
    },

    addMaster(name, score){
        let masterName = new cc.instantiate(this.masterName);
        masterName.getComponent(cc.Label).string = name + "           " + score;
        masterName.x = -120;
        masterName.y = -70 * this.index;
        this.index++;
        this.listTop.node.children[1].children[0].addChild(masterName);
    },

    start() {
        
    },

    // update (dt) {},
});
