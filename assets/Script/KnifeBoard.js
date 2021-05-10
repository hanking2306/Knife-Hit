

cc.Class({
    extends: cc.Component,

    properties: {
        boardNode: cc.Node,
    },


    onLoad () {
        this.boardRotation = 3;
        setInterval(()=>{
            this.changeSpeed();
        }, 2000);
    },

    changeSpeed(){
        let directionRotation = Math.random() > 0.5 ? 1 : -1;
        let speedRotation = 1 + Math.random() * 4;
        this.boardRotation = directionRotation * speedRotation;
    },

    start () {

    },

    update (dt) {
        this.boardNode.angle = (this.boardNode.angle + this.boardRotation) % 360;
        this.node.angle = (this.node.angle + this.boardRotation) % 360;
        let rad = Math.PI * (this.node.angle - 90) / 180;
        let r = this.boardNode.width / 2;
        this.node.x = this.boardNode.x + r * Math.cos(rad);
        this.node.y = this.boardNode.y + r * Math.sin(rad);
    },
});
