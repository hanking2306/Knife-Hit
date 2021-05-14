const game = require("Game");

cc.Class({
    extends: cc.Component,

    properties: {
        boardNode: cc.Node,
        knifeNode: cc.Node,
        knifePrefab: cc.Prefab,
        layoutKnife: cc.Layout,
        labelScore: cc.Label,
        knifeMini: cc.Prefab,
        knifeAudio: cc.AudioClip,
        knifeFail: cc.AudioClip,
        knifeNodeArr: [],
        isThrow: true,
        score: 0,
        numberKnife: 0,
        level: 1,
    },

    onLoad() {
        game.createLayoutKnife(7, this.knifeMini, this.layoutKnife);
        this.node.on('touchstart', this.throwKnife, this);
        this.boardRotation = 3;
        this.remainKnife = this.layoutKnife.node.childrenCount;
    },

    throwKnife() {
        if (this.isThrow) {
            this.isThrow = false;
            this.layoutKnife.node.children[this.numberKnife].active = false;
            this.remainKnife--;
            this.numberKnife++;
            this.knifeNode.runAction(
                cc.sequence(
                    cc.moveTo(0.1, cc.v2(this.knifeNode.x, this.boardNode.y - this.boardNode.width / 2)),
                    cc.callFunc(() => {
                        cc.audioEngine.play(this.knifeAudio, false, 1);
                        let isHit = false;
                        for (let knifeNode of this.knifeNodeArr) {
                            if (Math.abs(knifeNode.angle) < 15 || (360 - Math.abs(knifeNode.angle)) < 15) {
                                isHit = true;
                                break;
                            }
                        }
                        if (isHit) {
                            game.loseGame(this.knifeFail, this.knifeNode, this.score, this.level);
                        } else {
                            game.createKnifePlayer(this.knifePrefab, this.knifeNode, this.knifeNodeArr, this.node);
                            this.isThrow = true;
                            this.score++;
                            this.labelScore.string = this.score;
                            if (this.remainKnife === 0) {
                                this.isThrow = false;
                                game.nextLevel(this.level, this.score);
                            }
                        }
                    })
                )
            );
        }
    },

    start() {
        
    },

    update(dt) {
        game.angleKnife(this.boardNode, this.boardRotation, this.knifeNodeArr);
    },
});