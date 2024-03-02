// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
declare const firebase: any;
const {ccclass, property} = cc._decorator;

@ccclass
export default class numberLabel extends cc.Component {

    points: number = 0;

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
        this.points = 0;
        //this.getComponent(cc.Label).string = this.points.toString();
    }

    update (dt) {
        if(this.userData!= null && this.userKey!=null) {
            this.getComponent(cc.Label).string = this.userData.points;
            this.points = this.userData.points;
        }
    }

    updatePoints(num: number) {
        if(this.points+num>=9999)
            this.points = 9999;
        else
            this.points += num;
        //this.getComponent(cc.Label).string = this.points.toString();
        firebase.database().ref("userData/" + this.userKey).update({points: this.points});
        firebase.database().ref("currentUser").update({points: this.points});
    }
}
