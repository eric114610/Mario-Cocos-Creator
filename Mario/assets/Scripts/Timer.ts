// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Timer extends cc.Component {

    remainTime: number = null;
    nextSecond: number = 1.0;
    gameEnd: boolean = false;
    canMove: boolean = false;

    onLoad () {}

    start () {
        this.remainTime = 180;
        this.nextSecond = 1.0;
    }

    update (dt) {
        this.getComponent(cc.Label).string = this.remainTime.toString();
        if(this.gameEnd || !this.canMove)
            return;
        if(this.remainTime == 0)
            this.gameEnd = true;
        if(this.nextSecond>0)
            this.nextSecond-=dt;
        else{
            this.nextSecond = 1.0;
            this.remainTime--;
        }

    }
}
