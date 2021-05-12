const Emitter = require('../Emitter');

cc.Class({
    extends: cc.Component,

    properties: {
        homeScreen: cc.Node,
        settingScreen: cc.Node,
        level1: cc.Node,
        gameOver: cc.Node,
    },

    onLoad () {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent('transformScreen', this.onTransformScreen.bind(this));
    },
    onTransformScreen(name){
        cc.log(name);
        switch(name){
            case 'home':{
                this.homeScreen.active = true;
                this.settingScreen.active = false;
                this.level1.active = false;
                this.gameOver.active = false;
                break;
            }
            case 'setting':{
                this.settingScreen.active = true;
                this.homeScreen.active = false;
                this.level1.active = false;
                this.gameOver.active = false;
                break;
            }
            case 'level1':{
                this.level1.active = true;
                this.homeScreen.active = false;
                this.settingScreen.active = false;
                this.gameOver.active = false;
                break;
            }
            case 'gameOver':{
                this.gameOver.active = true;
                this.level1.active = false;
                this.homeScreen.active = false;
                this.settingScreen.active = false;
                break;
            }
        }
    },
    start () {

    },

    // update (dt) {},
});
