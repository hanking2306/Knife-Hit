"use strict";
cc._RF.push(module, 'b76616cizlNqb0E93qgqsxe', 'Throw');
// Script/Throw.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        boardNode: cc.Node,
        dartNode: cc.Node,
        dartPrefab: cc.Prefab
    },

    onLoad: function onLoad() {
        this.node.on('touchstart', this.throwDart, this);
        this.boardRotation = 2;
        this.dartNodeArr = [];
    },
    throwDart: function throwDart() {
        var _this = this;

        this.dartNode.runAction(cc.sequence(cc.moveTo(0.2, cc.v2(this.dartNode.x, this.boardNode.y - this.boardNode.width / 2 - 10)), cc.callFunc(function () {
            var dartNode = cc.instantiate(_this.dartPrefab);
            dartNode.setPosition(0, _this.dartNode.y + 200);
            _this.node.addChild(dartNode);
            _this.dartNode.setPosition(cc.v2(0, -400));
            _this.dartNodeArr.push(dartNode);
        })));
    },
    start: function start() {},
    update: function update(dt) {
        this.boardNode.angle += this.boardRotation;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.dartNodeArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var dartNode = _step.value;

                dartNode.angle += this.boardRotation;
                var rad = Math.PI * (dartNode.angle - 90) / 180;
                var r = this.boardNode.width / 1.9;
                dartNode.x = r * Math.cos(rad);
                dartNode.y = 200 + r * Math.sin(rad);
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
    }
});

cc._RF.pop();