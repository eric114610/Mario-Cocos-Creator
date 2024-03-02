// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import Mario from "./Mario";
import BlueCoinLabel from "./BlueCoinLabel";

@ccclass
export default class Pipe extends cc.Component {

    toUpdate: boolean = false;
    updateX: number = 0;
    updateY: number = 0;
    runAni: boolean = false;
    AniRunned: boolean = false;

    @property(Mario)
    mario: Mario = null;

    @property(cc.AudioClip)
    pipeAudio: cc.AudioClip = null;

    @property(BlueCoinLabel)
    blueCoinLabel: BlueCoinLabel = null;


    onLoad () {}

    start () {

    }

    update (dt) {
        if(this.toUpdate) {
            this.toUpdate = false;
            this.mario.canMove = false;
            cc.audioEngine.playEffect(this.pipeAudio, false);

            let action;
            if(this.node.name == "Pipe1-1")
                action = cc.moveBy(1, 15, 0);
            else if(this.node.name == "Pipe1-2")
            action = cc.moveBy(1, -15, 0);

            this.mario.node.runAction(action);
            this.mario.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);

            this.scheduleOnce(() => {
                this.mario.node.setPosition(this.updateX, this.updateY);
                this.mario.canMove = true;
            }, 1);
            
        }
    }

    onBeginContact(contact, self, other) {
        if(this.node.name == "Pipe1-1") {
            console.log(contact.getWorldManifold().normal.x, contact.getWorldManifold().normal.y);
            if(other.node.name == "Mario" ) {
                this.toUpdate = true;
                this.updateX = 1204;
                this.updateY = 119;
                if(this.blueCoinLabel.count == 5 && !this.AniRunned) {
                    this.runAni = true;
                    this.AniRunned = true;
                }
            }
        }
        else if(this.node.name == "Pipe1-2") {
            console.log(contact.getWorldManifold().normal.x, contact.getWorldManifold().normal.y);
            if(other.node.name == "Mario" ) {
                this.toUpdate = true;
                this.updateX = -295;
                this.updateY = 219;
            }
        }
    }
}
