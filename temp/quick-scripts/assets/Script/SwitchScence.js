(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/SwitchScence.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dfa95b/6cdI6bVWQAr3aO0/', 'SwitchScence', __filename);
// Script/SwitchScence.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        button: cc.Button
    },

    onLoad: function onLoad() {
        this.button.node.on('click', this.loadScene, this);
    },
    loadScene: function loadScene() {
        cc.director.loadScene('Game');
    },
    start: function start() {}
}

// update (dt) {},
);

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
        //# sourceMappingURL=SwitchScence.js.map
        