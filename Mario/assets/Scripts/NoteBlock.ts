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

    @property(cc.AudioClip)
    keyAudio: cc.AudioClip = null;

    isPlayed: boolean = false;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {
        
    }

    update (dt) {}

    onBeginContact(contact, self, other) {
        // if(other.node.name == "Mario" && contact.getWorldManifold().normal.y == 1) {
        //     cc.audioEngine.playEffect(this.keyAudio, false);
        // }
    }

    onPreSolve(contact, self, other) {
        if(other.node.name == "Mario" && contact.getWorldManifold().normal.y == 1) {
            if(!this.isPlayed) {
                cc.audioEngine.playEffect(this.keyAudio, false);
                this.isPlayed = true;
                this.scheduleOnce(() => {
                    this.isPlayed = false;
                }, 2);
            }
        }
    }
}
