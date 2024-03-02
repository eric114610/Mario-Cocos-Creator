// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import BlueCoinLabel from "./BlueCoinLabel";

@ccclass
export default class blueCoin extends cc.Component {

    @property(BlueCoinLabel)
    blueCoinLabel: BlueCoinLabel = null;

    @property(cc.AudioClip)
    coinAudio: cc.AudioClip = null;

    onLoad () {}

    start () {

    }

    update (dt) {}

    onBeginContact(contact, self, other) {
        if(other.node.name == "Mario") {
            cc.audioEngine.playEffect(this.coinAudio, false);
            self.node.destroy();
            //console.log("destroy");
            this.blueCoinLabel.updateCoin(1);
        }
    }
}
