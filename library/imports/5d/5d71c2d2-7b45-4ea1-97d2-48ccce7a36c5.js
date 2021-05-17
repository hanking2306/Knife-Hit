"use strict";
cc._RF.push(module, '5d71cLSe0VOoZfSSMzOejbF', 'Emitter');
// Script/Emitter.js

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Emitter = require('events');

var mEmitter = function () {
    function mEmitter() {
        _classCallCheck(this, mEmitter);

        this._emitter = new Emitter();
        this._emitter.setMaxListeners(100);
    }

    _createClass(mEmitter, [{
        key: 'emit',
        value: function emit() {
            var _emitter;

            (_emitter = this._emitter).emit.apply(_emitter, arguments);
        }
    }, {
        key: 'registerEvent',
        value: function registerEvent(event, listener) {
            this._emitter.on(event, listener);
        }
    }, {
        key: 'registerOnce',
        value: function registerOnce(event, listener) {
            this._emitter.once(event, listener);
        }
    }, {
        key: 'removeEvent',
        value: function removeEvent(event, listener) {
            this._emitter.removeListener(event, listener);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this._emitter.removeAllListeners();
            this._emitter = null;
            mEmitter.instance = null;
        }
    }]);

    return mEmitter;
}();

mEmitter.instance = null;
module.exports = mEmitter;

cc._RF.pop();