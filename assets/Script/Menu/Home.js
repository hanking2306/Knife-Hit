const Emitter = require('Emitter');
cc.Class({
    extends: cc.Component,

    properties: {
        setting: cc.Button,
        play: cc.Button,
        ranking: cc.Button,
        logoWolf: cc.Node,
    },

    onLoad() {
        this.setting.node.on('click', this.settingGame.bind(this));
        this.play.node.on('click', this.playGame.bind(this));
        this.ranking.node.on('click', this.rankingGame.bind(this));
        cc.tween(this.logoWolf)
            .repeatForever(
                cc.tween(this.logoWolf)
                    .to(1, {opacity: 100})
                    .to(1, {opacity: 255})
            )
            .start();
    },

    settingGame() {
        Emitter.instance.emit('transformScreen', 'setting');
    },

    playGame(){
        cc.tween(this.logoWolf)
            .to(1, {scale: 0.6})
            .start();
        setTimeout(()=>{
            Emitter.instance.emit('transformScreen', 'level1');
        }, 500);
    },

    rankingGame(){
        Emitter.instance.emit('transformScreen', 'ranking');
    },

    start() {
 
    },

    // update (dt) {},
});
