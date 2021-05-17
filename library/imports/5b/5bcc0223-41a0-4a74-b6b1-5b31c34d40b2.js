"use strict";
cc._RF.push(module, '5bcc0IjQaBKdLaxWzHDTUCy', 'Level1');
// Script/Level1.js

"use strict";

var game = require("Game");

cc.Class({
    extends: cc.Component,

    properties: {
        boardNode: cc.Node,
        knifeNode: cc.Node,
        knifePrefab: cc.Prefab,
        layoutKnife: cc.Layout,
        labelScore: cc.Label,
        knifeMini: cc.Prefab,
        knifeAudio: {
            type: cc.AudioClip,
            default: null
        },
        knifeFail: {
            type: cc.AudioClip,
            default: null
        },
        knifeNodeArr: [],
        isThrow: true,
        score: 0,
        numberKnife: 0,
        level: 1
    },

    onLoad: function onLoad() {
        game.createLayoutKnife(7, this.knifeMini, this.layoutKnife);
        this.node.on('touchstart', this.throwKnife, this);
        this.boardRotation = 3;
        this.remainKnife = this.layoutKnife.node.childrenCount;
    },
    throwKnife: function throwKnife() {
        var _this = this;

        if (this.isThrow) {
            this.isThrow = false;
            this.layoutKnife.node.children[this.numberKnife].active = false;
            this.remainKnife--;
            this.numberKnife++;
            this.knifeNode.runAction(cc.sequence(cc.moveTo(0.1, cc.v2(this.knifeNode.x, this.boardNode.y - this.boardNode.width / 2)), cc.callFunc(function () {
                cc.audioEngine.play(_this.knifeAudio, false, 1);
                var isHit = false;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this.knifeNodeArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
                    game.loseGame(_this.knifeFail, _this.knifeNode, _this.score, _this.level);
                } else {
                    game.createKnifePlayer(_this.knifePrefab, _this.knifeNode, _this.knifeNodeArr, _this.node);
                    _this.isThrow = true;
                    _this.score++;
                    _this.labelScore.string = _this.score;
                    if (_this.remainKnife === 0) {
                        _this.isThrow = false;
                        game.nextLevel(_this.level, _this.score);
                    }
                }
            })));
        }
    },
    start: function start() {},
    update: function update(dt) {
        game.angleKnife(this.boardNode, this.boardRotation, this.knifeNodeArr);
    }
});

cc._RF.pop();