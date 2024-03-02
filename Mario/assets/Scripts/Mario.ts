// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import numberLabel from "./numberLabel"
import LifeLabel from "./LifeLabel";

@ccclass
export default class Mario extends cc.Component {

    goRight: boolean = false;
    goLeft: boolean = false;
    goUp: boolean = false;
    goDown: boolean = false;

    playerSpeed: number = 0;

    onGround: boolean = true;
    onIce: boolean = false;

    currentGound: string = null;
    initPosition: cc.Vec2 = null;
    isDead: boolean = false;
    canMove: boolean = false;
    isWin: boolean = false;

    anim = null;
    animPlayed: boolean = false;

    @property(numberLabel)
    NumberLabel: numberLabel = null;

    @property(LifeLabel)
    lifeLabel: LifeLabel = null;

    @property(cc.AudioClip)
    jumpAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    stompAudio: cc.AudioClip = null;
    
    @property(cc.AudioClip)
    dieAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    eatMushAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    BGM: cc.AudioClip = null;

    movement(dt) {
        this.playerSpeed = 0;
        if(this.onIce) {
            console.log(this.currentGound);
            if(this.currentGound == "ground9")
                this.playerSpeed = 300;
            else if(this.currentGound == "ground12")
                this.playerSpeed = -300;
            else if(this.node.scaleX == 1)
                this.playerSpeed = 300;
            else
                this.playerSpeed = -300;
        }
        if(this.goRight) {
            this.playerSpeed = 200;
            this.node.scaleX = 1;
            if(!this.animPlayed && (this.onGround || this.onIce)) {
                this.anim.stop();
                this.anim.play("MarioAni");
                this.animPlayed = true;
            }
        }
        else if(this.goLeft) {
            this.playerSpeed = -200;
            this.node.scaleX = -1;
            if(!this.animPlayed && (this.onGround || this.onIce)) {
                this.anim.stop();
                this.anim.play("MarioAni");
                this.animPlayed = true;
            }
        }
        else {
            this.anim.stop();
            this.animPlayed = false;
            this.anim.play("MarioStand");
        }

        if(this.getComponent(cc.RigidBody).linearVelocity.y > 0 && (!this.onGround && !this.onIce)) {
            this.anim.stop();
            this.animPlayed = false;
            this.anim.play("MarioJump");
        }
        else if(this.getComponent(cc.RigidBody).linearVelocity.y < 0 && (!this.onGround && !this.onIce)) {
            this.anim.stop();
            this.animPlayed = false;
            this.anim.play("MarioStand");
        }

        if(this.goUp && this.onGround) {
            this.jump();
        }
    
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(this.playerSpeed, this.getComponent(cc.RigidBody).linearVelocity.y);
        
        //console.log(this.getComponent(cc.RigidBody).linearVelocity.y)
        
    }

    jump() {
        this.onGround = false;
        this.onIce = false;
        if(this,this.currentGound == "jumpPlat")
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1200);
        else
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 800);
        cc.audioEngine.playEffect(this.jumpAudio, false);
    }

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.anim = this.getComponent(cc.Animation);
    }

    onKeyDown(event) {
        if(event.keyCode == cc.macro.KEY.right) {
            this.goRight = true;
            this.goLeft = false;
        }
        else if(event.keyCode == cc.macro.KEY.left) {
            this.goRight = false;
            this.goLeft = true;
        }
        else if(event.keyCode == cc.macro.KEY.up) {
            this.goUp = true;
            this.goDown = false;
        }
        else if(event.keyCode == cc.macro.KEY.down) {
            this.goUp = false;
            this.goDown = true;
        }
    }

    onKeyUp(event) {
        if(event.keyCode == cc.macro.KEY.right) {
            this.goRight = false;
        }
        else if(event.keyCode == cc.macro.KEY.left) {
            this.goLeft = false;
        }
        else if(event.keyCode == cc.macro.KEY.up) {
            this.goUp = false;
        }
        else if(event.keyCode == cc.macro.KEY.down) {
            this.goDown = false;
        }
    }

    start () {
        this.initPosition = this.node.position;
        this.scheduleOnce(() => {
            cc.audioEngine.playMusic(this.BGM, true);
        },  0.1);
        
    }

    update (dt) {
        if(this.isWin) {
            this.anim.stop();
            this.animPlayed = false;
            this.anim.play("MarioStand");
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, this.getComponent(cc.RigidBody).linearVelocity.y);
        }
        
        if(!this.canMove || this.isWin) 
            return;
            
        if(this.lifeLabel.lifes <= 0) {
            cc.audioEngine.stopAll();
        }
        this.movement(dt);
        if(this.isDead) {
            this.reset();
            this.isDead = false;
        }
    }

    onBeginContact(contact, self, other) {
        if(other.node.name == "Flag") {
            this.isWin = true;
        }

        if(other.node.name == "BottomBorder") {
            this.isDead = true;
            return;
        }

        if(other.node.name == "GreenMushroom") {
            this.lifeLabel.updateLife(1);
            cc.audioEngine.playEffect(this.eatMushAudio, false);
        }

        this.currentGound = other.node.name;
        if((other.node.group == "GroundGroup" && contact.getWorldManifold().normal.y == -1 && contact.getWorldManifold().normal.x == 0) || other.node.name == "ground2" || other.node.name == "ground6") {
            this.onGround = true;
        }
        else
            this.onGround = false;

        if(other.tag == 1)
            this.onIce = true;
        else
            this.onIce = false;
    }

    onPreSolve(contact, self, other) {
        if(other.node.name == "BottomBorder") {
            return;
        }

        this.currentGound = other.node.name;
        if((other.node.group == "GroundGroup" && contact.getWorldManifold().normal.y == -1 && contact.getWorldManifold().normal.x == 0) || other.node.name == "ground2" || other.node.name == "ground6") {
            this.onGround = true;
            //this.currentGound = other.node.name;
        }
        
        if(other.tag == 1)
            this.onIce = true;
        else
            this.onIce = false;
    }

    reset() {
        cc.audioEngine.playEffect(this.dieAudio, false);
        this.node.position = this.initPosition;
        this.lifeLabel.updateLife(-1);
        this.anim.stop();
        this.animPlayed = false;
        this.anim.play("MarioStand");
    }

    onEndContact(contact, self, other) {
        if(other.node.group == "GroundGroup") {
            this.onGround = false;
            //this.currentGound = other.node.name;
        }
        if(other.tag == 1)
            this.onIce = false;
    }

    die() {
        this.isDead = true;
    }
}
