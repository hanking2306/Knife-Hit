cc.Class({
    extends: cc.Component,

    properties: {
        scoreEndGame: cc.Label,
        levelEndGame: cc.Label,
        score: 0,
        level: 0,
    },

    setScore(value){
        this.score = value;
    },

    setLevel(value){
        this.level = value;
    },

    onLoad () {

    },

    replay(){
        cc.director.loadScene('Level 1');
    },

    goHome(){
        cc.director.loadScene('Home');
    },



    start () {
        this.scoreEndGame.string = this.score;
        this.levelEndGame.string = "Level " + this.level;
    },

    // update (dt) {},
});