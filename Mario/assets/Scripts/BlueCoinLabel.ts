// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import GameMgr from "./GameMgr";

@ccclass
export default class BlueCoinLabel extends cc.Component {

    count: number = 0;

    @property(GameMgr)
    gameMgr: GameMgr = null;

    onLoad () {}

    start () {
        this.count = 0;
        this.updateCoin(0);
    }

    update (dt) {}

    updateCoin(i: number) {
        this.count += i;
        this.getComponent(cc.Label).string = this.count.toString();
        if(this.count == 5)
            this.gameMgr.gateOpen = true;
    }
}
