var gameOver = require('Throw');
cc.Class({
    extends: gameOver,

    properties: {
        restartButton: cc.Button,
    },

    

    onLoad () {
        this.restartButton.node.on('click', this.replay, this);
    },

    replay(){
        cc.log(this.score);
    },

    start () {

    },

    // update (dt) {},
});
