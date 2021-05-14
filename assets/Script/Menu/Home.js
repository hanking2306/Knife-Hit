const Emitter = require('Emitter');
cc.Class({
    extends: cc.Component,

    properties: {
        setting: cc.Button,
        play: cc.Button,
        ranking: cc.Button
    },

    onLoad() {
        this.setting.node.on('click', this.settingGame.bind(this));
        this.play.node.on('click', this.playGame.bind(this));
        this.ranking.node.on('click', this.rankingGame.bind(this));
    },

    settingGame() {
        Emitter.instance.emit('transformScreen', 'setting');
    },

    playGame(){
        Emitter.instance.emit('transformScreen', 'level1');
    },

    rankingGame(){
        Emitter.instance.emit('transformScreen', 'ranking');
    },

    start() {
 
    },

    // update (dt) {},
});
