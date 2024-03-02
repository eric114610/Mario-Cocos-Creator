// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Platform extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {}

    start () {
        this.platformMove(this.node.name);
    }

    update (dt) {}

    platformMove(Name: String){
        let action: cc.Action;
        let easeRate: number = 2;
        if(Name == "MovePlatform1") {
            var seq = cc.sequence(cc.moveBy(3,-100,0).easing(cc.easeInOut(easeRate)), cc.moveBy(3,100,0).easing(cc.easeInOut(easeRate)));
            action = cc.repeatForever(seq);
        }
        else if(Name == "MovePlatform2") {
            var seq = cc.sequence(cc.moveBy(2,-40,0).easing(cc.easeInOut(easeRate)), cc.moveBy(2,40,0).easing(cc.easeInOut(easeRate)));
            action = cc.repeatForever(seq);
        }
        else if(Name == "MovePlatform3") {
            var seq = cc.sequence(cc.moveBy(2, 0, 80).easing(cc.easeInOut(easeRate)), cc.moveBy(2, 0, -80).easing(cc.easeInOut(easeRate)));
            action = cc.repeatForever(seq);
        }
        else if(Name == "MovePlatform4") {
            var seq = cc.sequence(cc.moveBy(2,-40,0).easing(cc.easeInOut(easeRate)), cc.moveBy(2,40,0).easing(cc.easeInOut(easeRate)));
            action = cc.repeatForever(seq);
        }

        this.scheduleOnce(() =>{
            this.node.runAction(action);
        }, 0.5);
    }
}
