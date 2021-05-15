const Emitter = require('Emitter');

cc.Class({
    extends: cc.Component,

    properties: {
        homeScreen: cc.Node,
        settingScreen: cc.Node,
        gameOver: cc.Node,
        ranking: cc.Node,
    },

    onLoad () {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent('transformScreen', this.onTransformScreen.bind(this));
    },
    onTransformScreen(name){
        switch(name){
            case 'home':{
                this.homeScreen.active = true;
                this.settingScreen.active = false;
                this.gameOver.active = false;
                this.ranking.active = false;
                break;
            }
            case 'setting':{
                this.settingScreen.active = true;
                this.homeScreen.active = false;
                this.gameOver.active = false;
                this.ranking.active = false;
                break;
            }
            case 'level1':{
                cc.director.loadScene('Level 1');
                break;
            }
            case 'gameOver':{
                this.gameOver.active = true;
                this.homeScreen.active = false;
                this.settingScreen.active = false;
                this.ranking.active = false;
                break;
            }
            case 'ranking':{
                this.gameOver.active = false;
                this.homeScreen.active = false;
                this.settingScreen.active = false;
                this.ranking.active = true;
                break;
            }
        }
    },
    start () {

    },

    // update (dt) {},
});
