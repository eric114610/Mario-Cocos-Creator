// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
declare const firebase: any;
const {ccclass, property} = cc._decorator;
import Mario from "./Mario";
import LifeLabel from "./LifeLabel";
import Timer from "./Timer";
import numberLabel from "./numberLabel";

@ccclass
export default class GameMgr extends cc.Component {

    @property(Mario)
    mario: Mario = null;

    @property(LifeLabel)
    lifeLabel: LifeLabel = null;

    @property(Timer)
    timer: Timer = null;

    @property(cc.Node)
    flag: cc.Node = null;

    @property(cc.AudioClip)
    WinAudio: cc.AudioClip = null;

    @property(numberLabel)
    NumberLabel: numberLabel = null;
    
    isTriggered: boolean = false;
    gateOpen: boolean = false;

    userData = null;
    userKey = null;

    onLoad () {
        firebase.database().ref("currentUser").on("value", (snap) => {
            this.userData = snap.val();
        })
        firebase.database().ref("currentKey").on("value", (snap) => {
            this.userKey = snap.val();
        })
    }

    start () {
        this.scheduleOnce(() => {
            this.mario.canMove = true;
            this.timer.canMove = true;
        }, 0.1);
    }

    update (dt) {
        if(this.lifeLabel.lifes <= 0 || this.timer.remainTime <= 0) {
            this.mario.canMove = false;
            this.timer.canMove = false;
            cc.director.loadScene("End");
        }

        if(this.mario.isWin && !this.isTriggered) {
            this.mario.canMove = false;
            this.timer.canMove = false;
            cc.audioEngine.stopAll();
            cc.audioEngine.playMusic(this.WinAudio, false);
            this.NumberLabel.updatePoints(300);
            firebase.database().ref("userData/" + this.userKey).update({clear1: 1});
            firebase.database().ref("currentUser").update({clear1: 1});

            this.scheduleOnce(() => {
                cc.director.loadScene("StageSelect");
            }, 4)
            this.isTriggered = true;
        }
    }
}
