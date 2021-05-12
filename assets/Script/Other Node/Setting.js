const Emitter = require('../Emitter/Emitter');
const game = require('../Game Function/Game');
cc.Class({
    extends: cc.Component,

    properties: {
        backHome: cc.Node,
        buttonMusic: cc.Button,
        onMusic: cc.Label,
        offMusic: cc.Label,
        toggleMusic: cc.Node,
        buttonSound: cc.Button,
        onSound: cc.Label,
        offSound: cc.Label,
        toggleSound: cc.Node,
    },

    onLoad () {
        this.offMusic.node.active = false;
        this.offSound.node.active = false;
        this.backHome.on('click', this.onBackHome.bind(this));
        this.buttonMusic.node.on('click', this.onOffMusic, this);
        this.buttonSound.node.on('click', this.onOffSound, this);
    },

    onBackHome(){
        Emitter.instance.emit('transformScreen', 'home');
    },

    onOffMusic(){
        game.settingMS(this.onMusic, this.offMusic, this.toggleMusic);
    },

    onOffSound(){
        game.settingMS(this.onSound, this.offSound, this.toggleSound);
    },

    start () {

    },

    // update (dt) {},
});
