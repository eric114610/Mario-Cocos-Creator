// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import Mario from "./Mario";

@ccclass
export default class FakeFloor extends cc.Component {

    canTrigger: boolean = false;
    Triggered: boolean = false;

    @property(Mario)
    mario: Mario = null;

    @property(cc.Node)
    fake1: cc.Node = null;

    @property(cc.Node)
    fake2: cc.Node = null;

    @property(cc.AudioClip)
    fallAudio: cc.AudioClip = null;

    onLoad () {}

    start () {

    }

    update (dt) {
        
        if(this.canTrigger && (this.mario.node.position.x > 733 && this.mario.node.position.x < 755) && (this.mario.node.position.y < -188 && this.mario.node.position.y > -189)) {
            this.canTrigger = false;
            this.Triggered = true;
            this.mario.canMove = false;
            this.mario.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
            this.mario.anim.stop();
            this.mario.animPlayed = false;
            this.mario.anim.play("MarioStand");

            this.scheduleOnce(() => {
                this.mario.canMove = true;
            }, 3.8);

            this.scheduleOnce(() => {
                this.fake1.destroy();
                this.fake2.destroy();
                cc.audioEngine.playEffect(this.fallAudio, false);
            }, 1);

            this.scheduleOnce(() => {
                this.mario.node.setPosition(-1388, 360);
            }, 3.5);

            
        }
    }

    onBeginContact(contact, self, other) {
        if(this.node.name == "triggerFloor") {
            if(other.node.name == "fakeFloor2" && !this.Triggered) {
                this.canTrigger = true;
            }
        }
    }
}
