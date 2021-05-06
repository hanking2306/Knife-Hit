cc.Class({
    extends: cc.Component,

    properties: {
       boardNode: cc.Node,
       knifeNode: cc.Node,
       knifePrefab: cc.Prefab,
       layoutKnife: cc.Layout,
       labelScore: cc.Label,
       score: 0,
       numberKnife: 0,
    },

    onLoad () {
        this.node.on('touchstart', this.throwKnife, this);
        this.isThrow = true;
        this.boardNode.zIndex = 1;
        this.boardRotation = 3;
        this.knifeNodeArr = [];
        setInterval(()=>{
            this.changeSpeed();
        }, 2000);
        this.remainKnife = this.layoutKnife.node.childrenCount;
    },

    changeSpeed(){
        let directionRotation = Math.random() > 0.5 ? 1 : -1;
        let speedRotation = 1 + Math.random() * 4;
        this.boardRotation = directionRotation * speedRotation;
    },

    throwKnife() {
        if(this.isThrow){
            this.isThrow = false;
            this.layoutKnife.node.children[this.numberKnife].active= false;
            this.remainKnife--;
            this.numberKnife++;
            this.knifeNode.runAction(
                cc.sequence(
                    cc.moveTo(0.1, cc.v2(this.knifeNode.x, this.boardNode.y - this.boardNode.width/2)), 
                    cc.callFunc(()=>{
                        let isHit = false;
                        for(let knifeNode of this.knifeNodeArr){
                            if(Math.abs(knifeNode.angle) < 15 || Math.abs(360 - knifeNode.angle) < 15){
                                isHit = true;
                                break;
                            }
                        }

                        if(isHit){
                            this.knifeNode.runAction(cc.sequence(
                                    cc.spawn(
                                        cc.rotateTo(0.1, 60),
                                        cc.moveTo(0.1, cc.v2(this.knifeNode.x, -800))
                                    ),
                                    cc.callFunc(()=>{
                                        cc.director.loadScene('Restart');
                                    })
                                )
                            );
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
                                cc.director.loadScene('Level 2');
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
        this.boardNode.angle = (this.boardNode.angle + this.boardRotation) % 360; 
        for(let knifeNode of this.knifeNodeArr){
            knifeNode.angle = (knifeNode.angle + this.boardRotation) % 360;
            let rad = Math.PI * (knifeNode.angle - 90) / 180;
            let r = this.boardNode.width / 2;
            knifeNode.x = this.boardNode.x + r * Math.cos(rad);
            knifeNode.y = this.boardNode.y + r * Math.sin(rad);
        }
    },
});
