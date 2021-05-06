
cc.Class({
    extends: cc.Component,

    properties: {
      button: cc.Button,
    },

    onLoad () {
        this.button.node.on('click', this.loadScene, this);
    },

    loadScene(){
        cc.director.loadScene('Level 1');
    },

    start () {

    },

    // update (dt) {},
});
