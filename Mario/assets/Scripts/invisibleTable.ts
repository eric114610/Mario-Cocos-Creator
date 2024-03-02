// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import BlueCoinLabel from "./BlueCoinLabel";

@ccclass
export default class invisibleTable extends cc.Component {

    count: number = 0;
    triggered: boolean = false;

    @property(cc.Prefab)
    blueCoin: cc.Prefab = null;

    @property(BlueCoinLabel)
    blueCoinLabel: BlueCoinLabel = null;

    @property(cc.AudioClip)
    coinAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    touchAudio: cc.AudioClip = null;
    

    onLoad () {}

    start () {

    }

    update (dt) {
        if(this.count == 10 && !this.triggered) {
            this.triggered = true;
            let coin = cc.instantiate(this.blueCoin);
            coin.setPosition(this.node.position.x, this.node.position.y + 30);
            cc.find("Canvas/Effect").addChild(coin);
            cc.audioEngine.playEffect(this.coinAudio, false);

            let action: cc.Action;
            action = cc.spawn(cc.moveTo(0.5, this.node.position.x, this.node.position.y + 60), cc.fadeOut(0.5));
            this.scheduleOnce(() => {
                coin.runAction(action);
                this.blueCoinLabel.updateCoin(1);
            }, 0.1);
            this.scheduleOnce(() => {
                coin.destroy();
            }, 0.6);
        }
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "Mario" && !this.triggered) {
            this.count++;
            console.log("AA");
            if(this.count>2)
                cc.audioEngine.playEffect(this.touchAudio, false);
        }
    }
}
