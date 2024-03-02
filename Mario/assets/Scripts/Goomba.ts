// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import Mario from "./Mario";

@ccclass
export default class Goomba extends cc.Component {

    @property(Mario)
    mario: Mario = null;
    
    private anim = null;
    isDead: boolean = false;
    canMove: boolean = false;
    reverse: boolean = false;
    counter: number = 0;

    onLoad () {
        //cc.director.getPhysicsManager().enabled = true;
        this.anim = this.getComponent(cc.Animation);
    }

    start () {
        let seed = Math.random();
        this.scheduleOnce(() => {
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(100,0);
        }, seed);
    }

    update (dt) {
        if(this.isDead)
            this.getComponent(cc.RigidBody).active = false;
        if(this.counter<30)
            this.counter++;
        else{
            if(this.reverse) {
                this.reverse = false;
                this.node.scaleX = 1;
            }
            else {
                this.reverse = true;
                this.node.scaleX = -1;
            }
            this.counter = 0;
        }
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "EnemyRight1") {
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(-50,0);
            //console.log("AA");
        }
        else if(other.node.name == "EnemyLeft1") {
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(50,0);
            //console.log("AB");
        }
        else if(other.node.name == "Mario" && !this.isDead) {
            if(contact.getWorldManifold().normal.y == 1) {
                cc.audioEngine.playEffect(this.mario.stompAudio, false);
                this.anim.play("GoombaDie");
                this.isDead = true;
                //contact.disabled = true;
                
                this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
                this.scheduleOnce(() => {
                    this.node.destroy();
                }, 1);
            }
            else if(!this.isDead) {
                this.mario.die();
                this.getComponent(cc.RigidBody).linearVelocity = this.getComponent(cc.RigidBody).linearVelocity;
            }
        }
        else if(contact.getWorldManifold().normal.y == 0 && contact.getWorldManifold().normal.x == 1) {
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(-50,0);
        }
        else if(contact.getWorldManifold().normal.y == 0 && contact.getWorldManifold().normal.x == -1) {
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(50,0);
        }
    }
}
