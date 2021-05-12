const Emitter = require('../Emitter/Emitter');
export function angleKnife(boardNode, boardRotation, knifeArr){
    boardNode.angle = (boardNode.angle + boardRotation) % 360; 
    for(let knifeNode of knifeArr){
        knifeNode.angle = (knifeNode.angle + boardRotation) % 360;
        let rad = Math.PI * (knifeNode.angle - 90) / 180;
        let r = boardNode.width / 2;
        knifeNode.x = boardNode.x + r * Math.cos(rad);
        knifeNode.y = boardNode.y + r * Math.sin(rad);
    }
}

export function loseGame(knife, score, level){
    knife.runAction(cc.sequence(
        cc.spawn(
            cc.rotateBy(0.1, 720),
            cc.moveTo(0.1, cc.v2(knife.x, -800))
        ),
        cc.callFunc(()=>{
            cc.director.loadScene('Home', ()=> {
                Emitter.instance.emit('transformScreen', 'gameOver');
                let getCompo = cc.director.getScene().getChildByName('Canvas').getChildByName('GameOver').getComponent('GameOver');
                getCompo.setScore(score);
                getCompo.setLevel(level);
            });
        })
    )
    );
}

export function nextLevel(level, score){
    cc.director.loadScene("Level " + (level + 1), ()=>{
        let getScore = cc.director.getScene().getChildByName('Canvas').children[1].children[0].getComponent("Level" + (level + 1));
        getScore.setScore(score);
    });
}

export function settingMS(onMS, offMS, toggleMS){
    if(onMS.node.active){
        onMS.node.active = false;
        offMS.node.active = true;
        toggleMS.runAction(cc.moveTo(0.1, cc.v2(55, 0)));
    }
    else {
        onMS.node.active = true;
        offMS.node.active = false;
        toggleMS.runAction(cc.moveTo(0.1, cc.v2(-66, 0)));
    }
}