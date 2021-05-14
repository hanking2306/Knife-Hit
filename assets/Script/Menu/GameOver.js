const Emitter = require('../Emitter/Emitter');
cc.Class({
    extends: cc.Component,

    properties: {
        restart: cc.Button,
        home: cc.Button,
        rank: cc.Button,
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
        this.restart.node.on('click', this.replayGame.bind(this));
        this.home.node.on('click', this.goToHome.bind(this));
        this.rank.node.on('click', this.goToRank.bind(this));
    },

    replayGame(){
        cc.director.loadScene('Level 1');
    },

    goToHome(){
        Emitter.instance.emit('transformScreen', 'home');
    },

    goToRank(){
        Emitter.instance.emit('transformScreen', 'ranking');
    },

    start () {
        this.scoreEndGame.string = this.score;
        this.levelEndGame.string = "Level " + this.level;
    },

    // update (dt) {},
});