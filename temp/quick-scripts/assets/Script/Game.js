(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ba752mH619FtJcQraovsLYM', 'Game', __filename);
// Script/Game.js

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createKnifePlayer = createKnifePlayer;
exports.createLayoutKnife = createLayoutKnife;
exports.angleKnife = angleKnife;
exports.loseGame = loseGame;
exports.nextLevel = nextLevel;
exports.finishLevel = finishLevel;
exports.settingMS = settingMS;

var _constants = require('constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Emitter = require('Emitter');

function createKnifePlayer(knifePrefab, knifeOriginal, knifeArr, node) {
    var knifeNode = cc.instantiate(knifePrefab);
    knifeNode.setPosition(knifeOriginal.position);
    node.addChild(knifeNode);
    knifeOriginal.setPosition(cc.v2(0, -450));
    knifeArr.push(knifeNode);
}

function createLayoutKnife(number, knifeMini, layoutKnife) {
    for (var i = 1; i < number; i++) {
        var knifeLayout = cc.instantiate(knifeMini);
        knifeLayout.y -= i * 50;
        layoutKnife.node.addChild(knifeLayout);
    }
}

function angleKnife(boardNode, boardRotation, knifeArr) {
    boardNode.angle = (boardNode.angle + boardRotation) % 360;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = knifeArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var knifeNode = _step.value;

            knifeNode.angle = (knifeNode.angle + boardRotation) % 360;
            var rad = Math.PI * (knifeNode.angle - 90) / 180;
            var r = boardNode.width / 2;
            knifeNode.x = boardNode.x + r * Math.cos(rad);
            knifeNode.y = boardNode.y + r * Math.sin(rad);
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

function loseGame(audio, knife, score, level) {
    cc.audioEngine.play(audio, false, 2);
    knife.runAction(cc.sequence(cc.spawn(cc.rotateBy(0.1, 720), cc.moveTo(0.1, cc.v2(knife.x, -800))), cc.callFunc(function () {
        cc.director.loadScene('Home', function () {
            Emitter.instance.emit('transformScreen', 'gameOver');
            var getCompo = cc.director.getScene().getChildByName('Canvas').getChildByName('GameOverNode').getComponent('GameOver');
            getCompo.setScore(score);
            getCompo.setLevel(level);
        });
    })));
}

function nextLevel(level, score) {
    setTimeout(function () {
        cc.director.loadScene("Level " + (level + 1), function () {
            var getScore = cc.director.getScene().getChildByName('Canvas').children[1].children[0].getComponent("Level" + (level + 1));
            getScore.setScore(score);
        });
    }, 1000);
}

function finishLevel(level, score) {
    cc.director.loadScene('Home', function () {
        Emitter.instance.emit('transformScreen', 'gameOver');
        var getCompo = cc.director.getScene().getChildByName('Canvas').getChildByName('GameOverNode').getComponent('GameOver');
        getCompo.setScore(score);
        getCompo.setLevel(level);
    });
}

function settingMS(onMS, offMS, toggleMS) {
    if (onMS.node.active) {
        cc.tween(toggleMS).to(0.3, { position: cc.v2(55, 0) }).call(function () {
            onMS.node.active = false;
            offMS.node.active = true;
        }).start();
    } else {
        cc.tween(toggleMS).to(0.3, { position: cc.v2(-66, 0) }).call(function () {
            onMS.node.active = true;
            offMS.node.active = false;
        }).start();
    }
}

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
        //# sourceMappingURL=Game.js.map
        