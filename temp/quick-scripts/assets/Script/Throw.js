(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Throw.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6cb9c4DYDFE/ZAub9m08qun', 'Throw', __filename);
// Script/Throw.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        boardNode: cc.Node,
        knifeNode: cc.Node,
        knifePrefab: cc.Prefab,
        layoutKnife: cc.Layout,
        labelScore: cc.Label,
        score: 0,
        numberKnife: 0
    },

    onLoad: function onLoad() {
        var _this = this;

        this.node.on('touchstart', this.throwKnife, this);
        this.isThrow = true;
        this.boardNode.zIndex = 1;
        this.boardRotation = 3;
        this.knifeNodeArr = [];
        setInterval(function () {
            _this.changeSpeed();
        }, 2000);
        this.remainKnife = this.layoutKnife.node.childrenCount;
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
                var isHit = false;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this2.knifeNodeArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var knifeNode = _step.value;

                        if (Math.abs(knifeNode.angle) < 15 || Math.abs(360 - knifeNode.angle) < 15) {
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
                    _this2.knifeNode.runAction(cc.sequence(cc.spawn(cc.rotateTo(0.1, 60), cc.moveTo(0.1, cc.v2(_this2.knifeNode.x, -800))), cc.callFunc(function () {
                        cc.director.loadScene('Restart');
                    })));
                } else {
                    var _knifeNode = cc.instantiate(_this2.knifePrefab);
                    _knifeNode.setPosition(_this2.knifeNode.position);
                    _this2.node.addChild(_knifeNode);
                    _this2.knifeNode.setPosition(cc.v2(0, -450));
                    _this2.knifeNodeArr.push(_knifeNode);
                    _this2.isThrow = true;
                    _this2.score++;
                    _this2.labelScore.string = _this2.score;
                    if (_this2.remainKnife === 0) {
                        cc.director.loadScene('Level 2');
                    }
                }
            })));
        }
    },
    start: function start() {},
    update: function update(dt) {
        this.boardNode.angle = (this.boardNode.angle + this.boardRotation) % 360;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.knifeNodeArr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var knifeNode = _step2.value;

                knifeNode.angle = (knifeNode.angle + this.boardRotation) % 360;
                var rad = Math.PI * (knifeNode.angle - 90) / 180;
                var r = this.boardNode.width / 2;
                knifeNode.x = this.boardNode.x + r * Math.cos(rad);
                knifeNode.y = this.boardNode.y + r * Math.sin(rad);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Throw.js.map
        