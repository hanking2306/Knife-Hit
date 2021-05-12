const Emitter = require('../Emitter/Emitter');
cc.Class({
    extends: cc.Component,

    properties: {
        restart: cc.Node,
        home: cc.Node,
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
        this.home.on('click', this.goHome.bind(this));
    },

    replayGame(){
        cc.director.loadScene('Level 1');
    },

    goHome(){
        Emitter.instance.emit('transformScreen', 'home');
    },



    start () {
        this.scoreEndGame.string = this.score;
        this.levelEndGame.string = "Level " + this.level;
    },

    // update (dt) {},
});