

cc.Class({
    extends: cc.Component,

    properties: {
       onMusic: cc.Label,
       onSound: cc.Label,
       toggleMusic: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on('click', this.onOffSound, this);
    },

    onOffSound(){
        let action = cc.moveTo(0.1, cc.v2(55, 0));
        this.node.runAction(action);
    },

    start () {

    },

    // update (dt) {},
});
