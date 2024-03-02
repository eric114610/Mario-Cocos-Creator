// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
declare const firebase: any;
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.AudioClip)
    EndAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    FallAudio: cc.AudioClip = null;

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
        cc.audioEngine.playMusic(this.EndAudio, false);
        let action;
        action = cc.moveBy(2, 0, -700);

        this.scheduleOnce(() => {
            cc.audioEngine.playEffect(this.FallAudio, false);
            this.node.runAction(action);
            firebase.database().ref("userData/" + this.userKey).update({points: 0, life: 5, clear1: 0});
            firebase.database().ref("currentUser").update({points: 0, life: 5, clear1: 0});
        }, 0.5);

        this.scheduleOnce(() => {
            cc.director.loadScene("StageSelect");
        }, 5)
        
    }

    update (dt) {}
}
