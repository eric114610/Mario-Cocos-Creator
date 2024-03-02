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

    userData = null;
    userKey = null;

    @property(cc.Label)
    userLabel: cc.Label = null;

    @property(cc.Label)
    lifeLabel: cc.Label = null;

    @property(cc.Label)
    pointLabel: cc.Label = null;

    onLoad () {
        firebase.database().ref("currentUser").on("value", (snap) => {
            this.userData = snap.val();
        })
        firebase.database().ref("currentKey").on("value", (snap) => {
            this.userKey = snap.val();
        })
    }

    start () {
        
    }

    update (dt) {
        //console.log(this.userData, this.userKey);
        if(this.userData!= null && this.userKey!=null) {
            this.pointLabel.string = this.userData.points;
            this.lifeLabel.string = this.userData.life;
            this.userLabel.string = this.userData.Username.toUpperCase();
            
        }
    }
}
