cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    onLoad () {
        
    },

    playGame(){
        cc.director.loadScene('Level 1');
    },

    settingGame(){
        cc.director.loadScene('Setting');
    },

    rankGame(){
        
    },

    start () {

    },

    // update (dt) {},
});
