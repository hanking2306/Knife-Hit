const game = require('Game');
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
        knifeMini: cc.Prefab,
        knifeAudio: {
            type: cc.AudioClip,
            default: null,
        },
        knifeFail: {
            type: cc.AudioClip,
            default: null,
        },
        knifeNodeArr: [],
        score: 0,
        numberKnife: 0,
        level: 2,
    },

    setScore(value) {
        this.score = value;
        this.labelScore.string = this.score;
    },

    onLoad() {
        game.createLayoutKnife(8, this.knifeMini, this.layoutKnife);
        this.node.on('touchstart', this.throwKnife, this);
        this.isThrow = true;
        this.boardRotation = 3;
        this.remainKnife = this.layoutKnife.node.childrenCount;
        this.knifeNodeArr.push(this.knifeBoard1, this.knifeBoard2);
        setInterval(() => {
            this.changeSpeed();
        }, 4000);
    },

    changeSpeed() {
        let speedRotation = Math.random();
        this.boardRotation = this.boardRotation + speedRotation;
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

    // start () {},

    update(dt) {
        game.angleKnife(this.boardNode, this.boardRotation, this.knifeNodeArr);
    },
});