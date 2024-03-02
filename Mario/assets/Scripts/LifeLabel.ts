// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
declare const firebase: any;
const {ccclass, property} = cc._decorator;
import numberLabel from "./numberLabel";

@ccclass
export default class LifeLabel extends cc.Component {

    lifes: number = 0;

    @property(numberLabel)
    Numlabel: numberLabel = null;

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
        this.lifes = 3;
        //this.getComponent(cc.Label).string = this.lifes.toString();
    }

    update (dt) {
        if(this.userData!= null && this.userKey!=null) {
            this.getComponent(cc.Label).string = this.userData.life;
            this.lifes = this.userData.life;
        }
    }

    updateLife(num: number) {
        if(this.lifes+num <= 10)
            this.lifes += num;
        else 
            this.Numlabel.updatePoints(200);

        //this.getComponent(cc.Label).string = this.lifes.toString();
        firebase.database().ref("userData/" + this.userKey).update({life: this.lifes});
        firebase.database().ref("currentUser").update({life: this.lifes});
    }
}
