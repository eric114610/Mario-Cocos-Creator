// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import Mario from "./Mario";

@ccclass
export default class Flower extends cc.Component {

    @property(Mario)
    mario: Mario = null;

    @property(cc.AudioClip)
    FlowerAudio: cc.AudioClip = null;
    
    private anim = null;
    isDead: boolean = false;
    canMove: boolean = false;

    isPlayed: boolean = false;
    AudioID: number = null;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        this.anim = this.getComponent(cc.Animation);
    }

    start () {
        //this.getComponent(cc.RigidBody).linearVelocity = cc.v2(100,0);
        let seed = Math.random()*3;
        let action: cc.Action;
        let seq = cc.sequence(cc.moveBy(1.5, 0, 60), cc.moveBy(2, 0, 0), cc.moveBy(1.5, 0, -60));
        action = cc.repeatForever(seq);
        this.scheduleOnce(() => {
            this.node.runAction(action);
        }, seed);
    }

    update (dt) {
        // if(this.node.y > 668 && this.node.y < 727 && !this.isPlayed) {
        //     this.isPlayed = true;
        //     this.AudioID = cc.audioEngine.playEffect(this.FlowerAudio, true);
        // }
        // else {
        //     this.isPlayed = false;
        //     cc.audioEngine.stopEffect(this.AudioID);
        // }
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "Mario") {
            cc.audioEngine.playEffect(this.FlowerAudio, false);
            this.mario.die();
        }
    }
}
