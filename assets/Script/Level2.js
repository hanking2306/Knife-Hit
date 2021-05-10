var game = require('Game');
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
        }, 2000);
    },

    changeSpeed(){
        let directionRotation = Math.random() > 0.5 ? 1 : -1;
        let speedRotation = 1 + Math.random() * 4;
        this.boardRotation = directionRotation * speedRotation;
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
                                cc.director.loadScene('Level 2', ()=>{
                                    let getScore = cc.director.getScene().getChildByName('Canvas').children[1].children[0].getComponent('Level2');
                                    getScore.setScore(this.score);
                                });
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