const Emitter = require('Emitter');

cc.Class({
    extends: cc.Component,

    properties: {
        backHome: cc.Button,
        listTop: cc.ScrollView,
        addTop: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.addTopTen();
        this.backHome.node.on('click', this.onBackHome, this);
    },

    onBackHome() {
        cc.log('Hello');
        Emitter.instance.emit('transformScreen', 'home');
    },

    addTopTen() {
        for (let i = 1; i < 10; i++) {
            let topTen = cc.instantiate(this.addTop);
            topTen.getComponent(cc.Label).string = "Top  " + (i+1);
            topTen.x = -285;
            topTen.y = -70 * i;
            this.listTop.node.children[1].children[0].addChild(topTen);
        }
    },

    start() {

    },

    // update (dt) {},
});
