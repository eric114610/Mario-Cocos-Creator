// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import numberLabel from "./numberLabel"

@ccclass
export default class Coin extends cc.Component {

    @property(numberLabel)
    NumberLabel: numberLabel = null;

    @property(cc.AudioClip)
    coinAudio: cc.AudioClip = null;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {

    }

    update (dt) {}

    onBeginContact(contact, self, other) {
        if(other.node.name == "Mario") {
            cc.audioEngine.playEffect(this.coinAudio, false);
            self.node.destroy();
            //console.log("destroy");
            this.NumberLabel.updatePoints(10);
        }
    }
}
