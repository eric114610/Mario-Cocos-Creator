// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import Pipe from "./Pipe";

@ccclass
export default class Chain extends cc.Component {

    Action: cc.Action = null;
    runaction: boolean = false;

    @property(Pipe)
    pipe: Pipe = null;

    onLoad () {}

    start () {
        let action: cc.Action;
        if(this.node.name == "Chain1") {
            action = cc.moveBy(3, 0, 96);
        }
        else if(this.node.name == "Chain2") {
            action = cc.moveBy(2, 0, 64);
        }
        else if(this.node.name == "Chain3") {
            action = cc.moveBy(1, 0, 32);
        }
        this.Action = action;
        // this.scheduleOnce(() => {
        //     this.node.runAction(action);
        // }, 1);
    }

    update (dt) {
        if(this.pipe.runAni && !this.runaction) {
            this.runaction = true;
            this.scheduleOnce(() => {
                this.pipe.runAni = false;
            }, 1);
            this.scheduleOnce(() => {
                this.node.runAction(this.Action);
            }, 1);
        }
    }
}
