"use strict";
cc._RF.push(module, 'dfa95b/6cdI6bVWQAr3aO0/', 'SwitchScence');
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
        cc.director.loadScene('Level 1');
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();