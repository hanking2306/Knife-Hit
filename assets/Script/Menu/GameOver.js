const Emitter = require('Emitter');
const game = require('Game');
cc.Class({
    extends: cc.Component,

    properties: {
        restart: cc.Button,
        home: cc.Button,
        rank: cc.Button,
        record: cc.Node,
        scoreEndGame: cc.Label,
        levelEndGame: cc.Label,
        addButton: cc.Button,
        fillName: cc.EditBox,
        arrRecord: [],
        score: 0,
        level: 0,
    },

    onLoad() {
        this.restart.node.active = false;
        this.rank.node.active = false;
        this.record.active = false;
        let rank = cc.sys.localStorage.getItem('TopTen');
        this.arrRecord = JSON.parse(rank);
        this.restart.node.on('click', this.replayGame.bind(this));
        this.home.node.on('click', this.goToHome.bind(this));
        this.rank.node.on('click', this.goToRank.bind(this));
        this.addButton.node.on('click', this.onAddName.bind(this));
    },

    setScore(value) {
        this.score = value;
    },

    setLevel(value) {
        this.level = value;
    },

    replayGame() {
        cc.director.loadScene('Level 1');
    },

    onAddName() {
        this.restart.node.active = true;
        this.rank.node.active = true;
        this.record.active = true;
        this.fillName.node.active = false;
        let arrNameScore = {
            name: '',
            score: 0,
        }
        if(this.fillName.string === ""){
            arrNameScore.name = "NoName";
        }
        else {
            arrNameScore.name = this.fillName.string;
        }
        arrNameScore.score = this.score;
        if (typeof (this.arrRecord) == 'undefined' || this.arrRecord == null) {
            this.arrRecord = [];
        }
        this.arrRecord.push(arrNameScore);
        this.sortArrRecord(this.arrRecord);
        cc.sys.localStorage.setItem('TopTen', JSON.stringify(this.arrRecord));
        var dataLocal = JSON.parse(cc.sys.localStorage.getItem('TopTen'));
        dataLocal.map((item) => {
            Emitter.instance.emit('addMasterName', item.name, item.score);
        })
    },

    goToHome() {
        for (let i = 0; i < this.arrRecord.length - 1; i++) {
            if (i < 10) {
                Emitter.instance.emit('getAndAdd', this.arrRecord[i].name, this.arrRecord[i].score);
            }
        };
        Emitter.instance.emit('transformScreen', 'home');
    },

    goToRank() {
        Emitter.instance.emit('transformScreen', 'ranking');
    },

    sortArrRecord(anyArr) {
        for (let i = 0; i < anyArr.length; i++) {
            for (let j = i + 1; j < anyArr.length; j++) {
                if (anyArr[i].score < anyArr[j].score) {
                    [anyArr[i], anyArr[j]] = [anyArr[j], anyArr[i]];
                }
            }
        }
    },

    start() {
        this.scoreEndGame.string = this.score;
        this.levelEndGame.string = "Level " + this.level;
    },

    update(dt) {
        
    },
});