var level3 = require('Level2');

cc.Class({
    extends: level3,

    properties: {
        
    },

    changeSpeed(){
        let directionRotation = Math.random() > 0.5 ? 1 : -1;
        let speedRotation = 1 + Math.random() * 3;
        this.boardRotation = directionRotation * speedRotation;
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
