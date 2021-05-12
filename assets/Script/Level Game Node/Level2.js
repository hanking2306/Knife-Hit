var game = require('../Game Function/Game');
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
       score: 0,
       numberKnife: 0,
       level: 2,
    },

    setScore(value){
        this.score = value;
        this.labelScore.string = this.score;
    },

    onLoad () {
        this.node.on('touchstart', this.throwKnife, this);
        this.isThrow = true;
        this.boardRotation = 3;
        this.knifeNodeArr = [];
        this.remainKnife = this.layoutKnife.node.childrenCount;
        this.knifeNodeArr.push(this.knifeBoard1, this.knifeBoard2);
        setInterval(()=>{
            this.changeSpeed();
        }, 3000);
    },

    changeSpeed(){
        let speedRotation = Math.random();
        this.boardRotation = this.boardRotation + speedRotation;
    },

    throwKnife() {
        if(this.isThrow){
            this.isThrow = false;
            this.layoutKnife.node.children[this.numberKnife].active = false;
            this.remainKnife--;
            this.numberKnife++;
            this.knifeNode.runAction(
                cc.sequence(
                    cc.moveTo(0.1, cc.v2(this.knifeNode.x, this.boardNode.y - this.boardNode.width/2)), 
                    cc.callFunc(()=>{
                        let isHit = false;
                        for(let knifeNode of this.knifeNodeArr){
                            if(Math.abs(knifeNode.angle) < 15 || (360 - Math.abs(knifeNode.angle)) < 15){
                                isHit = true;
                                break;
                            }
                        }
                        if(isHit){
                            game.loseGame(this.knifeNode, this.score, this.level);
                        } else {
                            let knifeNode = cc.instantiate(this.knifePrefab);
                            knifeNode.setPosition(this.knifeNode.position);
                            this.node.addChild(knifeNode);
                            this.knifeNode.setPosition(cc.v2(0, -450));
                            this.knifeNodeArr.push(knifeNode);
                            this.isThrow = true;
                            this.score++;
                            this.labelScore.string = this.score;
                            if(this.remainKnife === 0){
                                game.nextLevel(this.level, this.score);
                            }
                        }  
                    })
                )
            );
        }
    },

    start () {
        
    },

    update (dt) {
        game.angleKnife(this.boardNode, this.boardRotation, this.knifeNodeArr);
    },
});