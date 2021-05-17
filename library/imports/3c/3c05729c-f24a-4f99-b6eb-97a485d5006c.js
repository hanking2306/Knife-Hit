"use strict";
cc._RF.push(module, '3c057Kc8kpPmbbrl6SF1QBs', 'GameOver');
// Script/GameOver.js

'use strict';

var Emitter = require('Emitter');
var game = require('Game');
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
        level: 0
    },

    onLoad: function onLoad() {
        this.restart.node.active = false;
        this.rank.node.active = false;
        this.record.active = false;
        var rank = cc.sys.localStorage.getItem('TopTen');
        this.arrRecord = JSON.parse(rank);
        this.restart.node.on('click', this.replayGame.bind(this));
        this.home.node.on('click', this.goToHome.bind(this));
        this.rank.node.on('click', this.goToRank.bind(this));
        this.addButton.node.on('click', this.onAddName.bind(this));
    },
    setScore: function setScore(value) {
        this.score = value;
    },
    setLevel: function setLevel(value) {
        this.level = value;
    },
    replayGame: function replayGame() {
        cc.director.loadScene('Level 1');
    },
    onAddName: function onAddName() {
        this.restart.node.active = true;
        this.rank.node.active = true;
        this.record.active = true;
        this.fillName.node.active = false;
        var arrNameScore = {
            name: '',
            score: 0
        };
        if (this.fillName.string === "") {
            arrNameScore.name = "NoName";
        } else {
            arrNameScore.name = this.fillName.string;
        }
        arrNameScore.score = this.score;
        if (typeof this.arrRecord == 'undefined' || this.arrRecord == null) {
            this.arrRecord = [];
        }
        this.arrRecord.push(arrNameScore);
        this.sortArrRecord(this.arrRecord);
        cc.sys.localStorage.setItem('TopTen', JSON.stringify(this.arrRecord));
        var dataLocal = JSON.parse(cc.sys.localStorage.getItem('TopTen'));
        dataLocal.map(function (item) {
            Emitter.instance.emit('addMasterName', item.name, item.score);
        });
    },
    goToHome: function goToHome() {
        for (var i = 0; i < this.arrRecord.length - 1; i++) {
            if (i < 10) {
                Emitter.instance.emit('getAndAdd', this.arrRecord[i].name, this.arrRecord[i].score);
            }
        };
        Emitter.instance.emit('transformScreen', 'home');
    },
    goToRank: function goToRank() {
        Emitter.instance.emit('transformScreen', 'ranking');
    },
    sortArrRecord: function sortArrRecord(anyArr) {
        for (var i = 0; i < anyArr.length; i++) {
            for (var j = i + 1; j < anyArr.length; j++) {
                if (anyArr[i].score < anyArr[j].score) {
                    var _ref = [anyArr[j], anyArr[i]];
                    anyArr[i] = _ref[0];
                    anyArr[j] = _ref[1];
                }
            }
        }
    },
    start: function start() {
        this.scoreEndGame.string = this.score;
        this.levelEndGame.string = "Level " + this.level;
    },
    update: function update(dt) {}
});

cc._RF.pop();