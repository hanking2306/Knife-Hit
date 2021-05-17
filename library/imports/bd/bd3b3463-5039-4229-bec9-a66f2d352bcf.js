"use strict";
cc._RF.push(module, 'bd3b3RjUDlCKb7Jpm8tNSvP', 'Level5');
// Script/Level5.js

'use strict';

var game = require('Game');
cc.Class({
    extends: cc.Component,

    properties: {
        boardNode: cc.Node,
        knifeNode: cc.Node,
        knifePrefab: cc.Prefab,
        layoutKnife: cc.Layout,
        labelScore: cc.Label,
        knifeBoard1: cc.Node,
        knifeBoard2: cc.Node,
        knifeBoard3: cc.Node,
        knifeBoard4: cc.Node,
        knifeMini: cc.Prefab,
        knifeAudio: {
            type: cc.AudioClip,
            default: null
        },
        knifeFail: {
            type: cc.AudioClip,
            default: null
        },
        // loading: cc.Node,
        knifeNodeArr: [],
        score: 0,
        numberKnife: 0,
        level: 5
    },

    setScore: function setScore(value) {
        this.score = value;
        this.labelScore.string = this.score;
    },
    onLoad: function onLoad() {
        var _this = this;

        // this.loading.active = false;
        game.createLayoutKnife(9, this.knifeMini, this.layoutKnife);
        this.node.on('touchstart', this.throwKnife, this);
        this.isThrow = true;
        this.boardRotation = 2;
        this.remainKnife = this.layoutKnife.node.childrenCount;
        this.knifeNodeArr.push(this.knifeBoard1, this.knifeBoard2, this.knifeBoard3, this.knifeBoard4);
        setInterval(function () {
            _this.changeSpeed();
        }, 2000);
    },
    changeSpeed: function changeSpeed() {
        var directionRotation = Math.random() > 0.5 ? 1 : -1;
        var speedRotation = 1 + Math.random() * 4;
        this.boardRotation = directionRotation * speedRotation;
    },
    throwKnife: function throwKnife() {
        var _this2 = this;

        if (this.isThrow) {
            this.isThrow = false;
            this.layoutKnife.node.children[this.numberKnife].active = false;
            this.remainKnife--;
            this.numberKnife++;
            this.knifeNode.runAction(cc.sequence(cc.moveTo(0.1, cc.v2(this.knifeNode.x, this.boardNode.y - this.boardNode.width / 2)), cc.callFunc(function () {
                cc.audioEngine.play(_this2.knifeAudio, false, 1);
                var isHit = false;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this2.knifeNodeArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var knifeNode = _step.value;

                        if (Math.abs(knifeNode.angle) < 15 || 360 - Math.abs(knifeNode.angle) < 15) {
                            isHit = true;
                            break;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                if (isHit) {
                    game.loseGame(_this2.knifeFail, _this2.knifeNode, _this2.score, _this2.level);
                } else {
                    game.createKnifePlayer(_this2.knifePrefab, _this2.knifeNode, _this2.knifeNodeArr, _this2.node);
                    _this2.isThrow = true;
                    _this2.score++;
                    _this2.labelScore.string = _this2.score;
                    if (_this2.remainKnife === 0) {
                        _this2.isThrow = false;
                        game.finishLevel(_this2.level, _this2.score);
                    }
                }
            })));
        }
    },


    // start () {},

    update: function update(dt) {
        game.angleKnife(this.boardNode, this.boardRotation, this.knifeNodeArr);
    }
});

cc._RF.pop();