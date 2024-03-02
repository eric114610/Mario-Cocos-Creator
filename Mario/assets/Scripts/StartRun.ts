// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.AudioClip)
    StartAudio: cc.AudioClip = null;

    onLoad () {}

    start () {
        cc.audioEngine.playMusic(this.StartAudio, false);
        let action;
        action = cc.moveBy(4, 1140, 0);
        this.node.runAction(action);

        this.scheduleOnce(() => {
            if(this.node.name == "Mario")
                cc.director.loadScene("Main");
            else
                cc.director.loadScene("Main2");
        }, 5)
        
    }

    update (dt) {}
}
