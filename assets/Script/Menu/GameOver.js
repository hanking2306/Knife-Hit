const Emitter = require('../Emitter/Emitter');
cc.Class({
    extends: cc.Component,

    properties: {
        restart: cc.Button,
        home: cc.Button,
        rank: cc.Button,
        scoreEndGame: cc.Label,
        levelEndGame: cc.Label,
        addButton: cc.Button,
        fillName: cc.EditBox,
        arrRecord: [],
        score: 0,
        level: 0,
    },

    setScore(value) {
        this.score = value;
    },

    setLevel(value) {
        this.level = value;
    },

    onLoad() {
        let rank = cc.sys.localStorage.getItem('top');
        cc.log(JSON.parse(rank))
        this.arrRecord=JSON.parse(rank)
        this.restart.node.on('click', this.replayGame.bind(this));
        this.home.node.on('click', this.goToHome.bind(this));
        this.rank.node.on('click', this.goToRank.bind(this));
        this.addButton.node.on('click', this.onAddName.bind(this));
    },

    replayGame() {
        cc.director.loadScene('Level 1');
    },

    goToHome() {
        Emitter.instance.emit('transformScreen', 'home');
    },

    goToRank() {
        Emitter.instance.emit('transformScreen', 'ranking');
    },

    onAddName() {
        let checkName = true;
        let arrNameScore = {
            name: '',
            score: 0,
        }
        if (this.fillName.string === "") {
            checkName = false;
        }
        else {
            checkName = true;
        }
        if (checkName) {
            arrNameScore.name = this.fillName.string;
            arrNameScore.score = this.score;
            this.arrRecord.push(arrNameScore);
            cc.sys.localStorage.setItem('top', JSON.stringify(this.arrRecord));
            var dataLocal = JSON.parse(cc.sys.localStorage.getItem('top'));
            dataLocal.map((item)=>{
                cc.log(item)
                Emitter.instance.emit('addMasterName', item.name, item.score);
            })
            checkName = false;
        }
    },

    start() {
        this.scoreEndGame.string = this.score;
        this.levelEndGame.string = "Level " + this.level;
    },

    update(dt) {

    },
});