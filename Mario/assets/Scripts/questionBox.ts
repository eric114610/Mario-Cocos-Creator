// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import numberLabel from "./numberLabel"
import Mario from "./Mario";
import BlueCoinLabel from "./BlueCoinLabel";

@ccclass
export default class questionBox extends cc.Component {

    @property(cc.Prefab)
    TriggeredBox: cc.Prefab = null;

    @property(cc.Prefab)
    CoinPrefab: cc.Prefab = null;

    @property(numberLabel)
    NumberLabel: numberLabel = null;

    @property(cc.Prefab)
    MushroomPrefab: cc.Prefab = null;

    @property(cc.AudioClip)
    mushAppearAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    coinAudio: cc.AudioClip = null;

    @property(cc.Prefab)
    goombaPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    blueCoin: cc.Prefab = null;

    @property(BlueCoinLabel)
    blueCoinLabel: BlueCoinLabel = null;

    Triggered: boolean = false;
    contactTag: number = 0;
    onContact: boolean = false;

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {

    }

    update (dt) {
        if(this.onContact) {
            if(this.contactTag == 4) {
                let goom = cc.find("Canvas/Goomba/Goomba3");
                goom.setPosition(this.node.position.x, this.node.position.y+32);
                goom.getComponent(cc.RigidBody).linearVelocity = cc.v2(50,0);
                cc.audioEngine.playEffect(this.mushAppearAudio, false);
                this.onContact = false;
            }
            else if(this.contactTag == 5) {
                let goom = cc.find("Canvas/Goomba/Goomba4");
                goom.setPosition(this.node.position.x, this.node.position.y+32);
                goom.getComponent(cc.RigidBody).linearVelocity = cc.v2(-50,0);
                cc.audioEngine.playEffect(this.mushAppearAudio, false);
                this.onContact = false;
            }
            else if(this.contactTag == 6) {
                let goom = cc.find("Canvas/Goomba/Goomba5");
                goom.setPosition(this.node.position.x, this.node.position.y+32);
                goom.getComponent(cc.RigidBody).linearVelocity = cc.v2(-50,0);
                cc.audioEngine.playEffect(this.mushAppearAudio, false);
                this.onContact = false;
            }
            else if(this.contactTag == 7) {
                let goom = cc.find("Canvas/Goomba/Goomba6");
                goom.setPosition(this.node.position.x, this.node.position.y+32);
                goom.getComponent(cc.RigidBody).linearVelocity = cc.v2(50,0);
                cc.audioEngine.playEffect(this.mushAppearAudio, false);
                this.onContact = false;
            }
        }
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "Mario" && contact.getWorldManifold().normal.y == -1) {
            
            if(!this.Triggered) {
                //console.log("Contact");
                this.Triggered = true;
                let Tbox = cc.instantiate(this.TriggeredBox);
                Tbox.setPosition(this.node.position.x, this.node.position.y);
                cc.find("Canvas/Effect").addChild(Tbox);

                if(self.tag == 2) {
                    let coin = cc.instantiate(this.CoinPrefab);
                    coin.setPosition(this.node.position.x, this.node.position.y + 10);
                    cc.find("Canvas/Effect").addChild(coin);
                    cc.audioEngine.playEffect(this.coinAudio, false);

                    let action: cc.Action;
                    action = cc.spawn(cc.moveTo(0.5, this.node.position.x, this.node.position.y + 30), cc.fadeOut(0.5));
                    this.scheduleOnce(() => {
                        coin.runAction(action);
                        this.NumberLabel.updatePoints(50);
                    }, 0.1);
                    this.scheduleOnce(() => {
                        coin.destroy();
                    }, 0.6);
                }
                else if(self.tag == 3) {
                    let mush = cc.instantiate(this.MushroomPrefab);
                    mush.setPosition(this.node.position.x, this.node.position.y+16);
                    cc.find("Canvas/Effect").addChild(mush);
                    cc.audioEngine.playEffect(this.mushAppearAudio, false);
                }
                else if(self.tag == 4) {
                    this.onContact = true;
                    this.contactTag = 4;
                }
                else if(self.tag == 5) {
                    this.onContact = true;
                    this.contactTag = 5;
                }
                else if(self.tag == 6) {
                    this.onContact = true;
                    this.contactTag = 6;
                }
                else if(self.tag == 7) {
                    this.onContact = true;
                    this.contactTag = 7;
                }
                else if(self.tag == 10) {
                    let coin = cc.instantiate(this.blueCoin);
                    coin.setPosition(this.node.position.x, this.node.position.y + 10);
                    cc.find("Canvas/Effect").addChild(coin);
                    cc.audioEngine.playEffect(this.coinAudio, false);

                    let action: cc.Action;
                    action = cc.spawn(cc.moveTo(0.5, this.node.position.x, this.node.position.y + 30), cc.fadeOut(0.5));
                    this.scheduleOnce(() => {
                        coin.runAction(action);
                        this.blueCoinLabel.updateCoin(1);
                    }, 0.1);
                    this.scheduleOnce(() => {
                        coin.destroy();
                    }, 0.6);
                }
            }
        }
        else {
            this.onContact = false;
        }
    }
}
