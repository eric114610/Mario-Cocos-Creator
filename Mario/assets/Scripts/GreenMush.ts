// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class GreenMush extends cc.Component {


    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(100,0);
    }

    update (dt) {}

    onBeginContact(contact, self, other) {
        if(other.node.name == "Mario") {
            this.node.destroy();
        }
        else if(other.node.name == "BottomBorder") {
            this.node.destroy();
        }
        else {
            if(contact.getWorldManifold().normal.x == 1) {
                this.getComponent(cc.RigidBody).linearVelocity = cc.v2(-100,0);
                //console.log(this.getComponent(cc.RigidBody).linearVelocity.x);
            }
            else if(contact.getWorldManifold().normal.x == -1)
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(100,0);
        }
    }
}
