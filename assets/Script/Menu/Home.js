const Emitter = require('Emitter');
cc.Class({
    extends: cc.Component,

    properties: {
        setting: cc.Node,
        play: cc.Node,
    },

    onLoad() {
        this.setting.on('click', this.settingGame.bind(this));
        this.play.on('click', this.playGame.bind(this));
    },

    settingGame() {
        Emitter.instance.emit('transformScreen', 'setting');
    },

    playGame(){
        Emitter.instance.emit('transformScreen', 'level1');
    },

    start() {
 
    },

    // update (dt) {},
});
