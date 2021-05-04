cc.Class({
    extends: cc.Component,

    properties: {
       boardNode: cc.Node,
       dartNode: cc.Node,
       dartPrefab: cc.Prefab,
    },

    onLoad () {
        this.node.on('touchstart', this.throwDart, this);
        this.boardRotation = 2;
        this.dartNodeArr = [];
    },

    throwDart() {
        this.dartNode.runAction(
            cc.sequence(
                cc.moveTo(0.2, cc.v2(this.dartNode.x, this.boardNode.y - this.boardNode.width/2 - 10)), 
                cc.callFunc(()=>{
                    let dartNode = cc.instantiate(this.dartPrefab);
                    dartNode.setPosition(0, this.dartNode.y + 200);
                    this.node.addChild(dartNode);
                    this.dartNode.setPosition(cc.v2(0, -400));
                    this.dartNodeArr.push(dartNode);
                })
            )
        );
    },

    start () {
        
    },

    update (dt) {
        this.boardNode.angle += this.boardRotation; 
        for(let dartNode of this.dartNodeArr){
            dartNode.angle += this.boardRotation;
            let rad = Math.PI * (dartNode.angle - 90) / 180;
            let r = this.boardNode.width / 1.9;
            dartNode.x = r * Math.cos(rad);
            dartNode.y = 200 + r * Math.sin(rad);
        }
    },
});
