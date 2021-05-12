const Emitter = require('../Emitter/Emitter');
cc.Class({
    extends: cc.Component,

    properties: {
        restart: cc.Node,
        scoreEndGame: cc.Label,
        levelEndGame: cc.Label,
        score: 0,
        level: 0,
    },

    setScore(value){
        this.score = value;
    },

    setLevel(value){
        this.level = value;
    },

    onLoad () {
        this.restart.on('click', this.replayGame.bind(this));
    },

    replayGame(){
        Emitter.instance.emit('transformScreen', 'home');
    },

    goHome(){
        cc.director.loadScene('Home');
    },



    start () {
        this.scoreEndGame.string = this.score;
        this.levelEndGame.string = "Level " + this.level;
    },

    // update (dt) {},
});