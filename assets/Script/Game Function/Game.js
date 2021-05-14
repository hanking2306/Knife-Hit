import exp from 'constants';

const Emitter = require('../Emitter/Emitter');

export function createKnifePlayer(knifePrefab, knifeOriginal, knifeArr, node) {
    let knifeNode = cc.instantiate(knifePrefab);
    knifeNode.setPosition(knifeOriginal.position);
    node.addChild(knifeNode);
    knifeOriginal.setPosition(cc.v2(0, -450));
    knifeArr.push(knifeNode);
}

export function createLayoutKnife(number, knifeMini, layoutKnife) {
    for (let i = 1; i < number; i++) {
        let knifeLayout = cc.instantiate(knifeMini);
        knifeLayout.y -= i * 50;
        layoutKnife.node.addChild(knifeLayout);
    }
}

export function angleKnife(boardNode, boardRotation, knifeArr) {
    boardNode.angle = (boardNode.angle + boardRotation) % 360;
    for (let knifeNode of knifeArr) {
        knifeNode.angle = (knifeNode.angle + boardRotation) % 360;
        let rad = Math.PI * (knifeNode.angle - 90) / 180;
        let r = boardNode.width / 2;
        knifeNode.x = boardNode.x + r * Math.cos(rad);
        knifeNode.y = boardNode.y + r * Math.sin(rad);
    }
}


export function loseGame(audio, knife, score, level) {
    cc.audioEngine.play(audio, false, 1);
    knife.runAction(cc.sequence(
        cc.spawn(
            cc.rotateBy(0.1, 720),
            cc.moveTo(0.1, cc.v2(knife.x, -800))
        ),
        cc.callFunc(() => {
            cc.director.loadScene('Home', () => {
                Emitter.instance.emit('transformScreen', 'gameOver');
                let getCompo = cc.director.getScene().getChildByName('Canvas').getChildByName('GameOverNode').getComponent('GameOver');
                getCompo.setScore(score);
                getCompo.setLevel(level);
            });
        })
    )
    );
}

export function nextLevel(level, score) {
    // isThrow = false;
    setTimeout(()=>{
        // loading.active = true;
        cc.director.loadScene("Level " + (level + 1), () => {
            let getScore = cc.director.getScene().getChildByName('Canvas').children[1].children[0].getComponent("Level" + (level + 1));
            getScore.setScore(score);
        });
    }, 1000);
}

export function finishLevel(level, score){
    cc.director.loadScene('Home', () => {
        Emitter.instance.emit('transformScreen', 'gameOver');
        let getCompo = cc.director.getScene().getChildByName('Canvas').getChildByName('GameOver').getComponent('GameOver');
        getCompo.setScore(score);
        getCompo.setLevel(level);
    });
}

export function settingMS(onMS, offMS, toggleMS){
    if(onMS.node.active){
        cc.tween(toggleMS)
            .to(0.3, {position: cc.v2(55, 0)})
            .call(()=>{
                onMS.node.active = false;
                offMS.node.active = true;
            })
            .start();
    }
    else {
        cc.tween(toggleMS)
            .to(0.3, {position: cc.v2(-66, 0)})
            .call(()=>{
                onMS.node.active = true;
                offMS.node.active = false;
            })
            .start();
    }
}
