// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
declare const firebase: any;
const {ccclass, property} = cc._decorator;

@ccclass
export default class InitButton extends cc.Component {

    @property(cc.Label)
    EmailInput: cc.Label = null;

    @property(cc.Label)
    PasswordInput: cc.Label = null;

    @property(cc.Label)
    UserInput: cc.Label = null;

    @property(cc.AudioClip)
    BGM: cc.AudioClip = null;

    userData = null;
    userKey = null;

    onLoad () {
        firebase.database().ref("currentUser").on("value", (snap) => {
            this.userData = snap.val();
        })
        firebase.database().ref("currentKey").on("value", (snap) => {
            this.userKey = snap.val();
        })
    }

    start () {
        if(this.BGM!=null)
            cc.audioEngine.playMusic(this.BGM, true);
        
        if(this.node.name == "Button1") {
            let Loginbtn = new cc.Component.EventHandler();
            Loginbtn.target = this.node;
            Loginbtn.component = "InitButton";
            Loginbtn.handler = "loadLoginScene";

            cc.find("Canvas/Button1").getComponent(cc.Button).clickEvents.push(Loginbtn);
        }
        else if(this.node.name == "Button2") {
            let SignUpbtn = new cc.Component.EventHandler();
            SignUpbtn.target = this.node;
            SignUpbtn.component = "InitButton";
            SignUpbtn.handler = "loadSignUpScene";

            cc.find("Canvas/Button2").getComponent(cc.Button).clickEvents.push(SignUpbtn);
        }
        else if(this.node.name == "Button3") {
            let Confirmbtn = new cc.Component.EventHandler();
            Confirmbtn.target = this.node;
            Confirmbtn.component = "InitButton";
            Confirmbtn.handler = "LogIN";

            cc.find("Canvas/Block/Button3").getComponent(cc.Button).clickEvents.push(Confirmbtn);
        }
        else if(this.node.name == "Button4"){
            let Confirmbtn = new cc.Component.EventHandler();
            Confirmbtn.target = this.node;
            Confirmbtn.component = "InitButton";
            Confirmbtn.handler = "SignUp";
            console.log("AA");

            cc.find("Canvas/Block/Button4").getComponent(cc.Button).clickEvents.push(Confirmbtn);
        }
        else if(this.node.name == "Button5"){
            let S1btn = new cc.Component.EventHandler();
            S1btn.target = this.node;
            S1btn.component = "InitButton";
            S1btn.handler = "Stage1";

            cc.find("Canvas/Button5").getComponent(cc.Button).clickEvents.push(S1btn);
        }
        else if(this.node.name == "Button6"){
            let S2btn = new cc.Component.EventHandler();
            S2btn.target = this.node;
            S2btn.component = "InitButton";
            S2btn.handler = "Stage2";

            cc.find("Canvas/Button6").getComponent(cc.Button).clickEvents.push(S2btn);
        }
        else if(this.node.name == "Button7"){
            let rebtn = new cc.Component.EventHandler();
            rebtn.target = this.node;
            rebtn.component = "InitButton";
            rebtn.handler = "ReturnTo";

            cc.find("Canvas/Button7").getComponent(cc.Button).clickEvents.push(rebtn);
        }
        else if(this.node.name == "Button8"){
            let rebtn = new cc.Component.EventHandler();
            rebtn.target = this.node;
            rebtn.component = "InitButton";
            rebtn.handler = "LeaderGo";

            cc.find("Canvas/Button8").getComponent(cc.Button).clickEvents.push(rebtn);
        }
        else if(this.node.name == "Button9"){
            let rebtn = new cc.Component.EventHandler();
            rebtn.target = this.node;
            rebtn.component = "InitButton";
            rebtn.handler = "LogOut";

            cc.find("Canvas/Button9").getComponent(cc.Button).clickEvents.push(rebtn);
        }
    }

    update (dt) {}

    loadLoginScene() {
        cc.audioEngine.stopAll();
        cc.director.loadScene("LogIn");
    }

    loadSignUpScene() {
        cc.audioEngine.stopAll();
        cc.director.loadScene("SignUp");
    }

    LogIN() {
        console.log(this.EmailInput.string, this.PasswordInput.string);
        let email = this.EmailInput.string;
        let password = this.PasswordInput.string;

        firebase.auth().signInWithEmailAndPassword(email, password).then( (userCredential) => {
            var currentKey;
            var currentUserData;
            var user = userCredential.user;
            firebase.database().ref("userData").once("value", (snapshot) => {
                snapshot.forEach((snap2) => {
                    console.log(snap2.val().Email);
                    //console.log(snap2.key);
                    if(snap2.val().Email == user.email) {
                        currentUserData = snap2.val();
                        currentKey = snap2.key;
                        console.log(currentUserData);
                    }
                })
            
            }).then(() => {
                firebase.database().ref().update({currentUser: currentUserData});
                firebase.database().ref().update({currentKey: currentKey});
                cc.audioEngine.stopAll();
                cc.director.loadScene("StageSelect");
            })
        }
        ).then(() => {}).catch(e => alert(e))

    }

    SignUp() {
        console.log(this.EmailInput.string, this.PasswordInput.string, this.UserInput.string)
        let email = this.EmailInput.string;
        let password = this.PasswordInput.string;
        let username = this.UserInput.string;

        firebase.auth().createUserWithEmailAndPassword(email, password).then( (userCredential) => {
            var user = userCredential.user;
            var data = {
                Email: email,
                Password: password,
                Username: username,
                life: 5,
                points: 0,
                clear1: 0
            }

            firebase.database().ref("userData").push(data).then((cur) => {
                //console.log(cur.key);
                firebase.database().ref().update({currentUser: data});
                firebase.database().ref().update({currentKey: cur.key});
                cc.audioEngine.stopAll();
                cc.director.loadScene("StageSelect");
            }).catch((err) => {
                alert(err.message);
            });
        }
    ).catch(e => alert(e.message))

    }

    Stage1() {
        cc.audioEngine.stopAll();
        cc.director.loadScene("Start");
    }

    Stage2() {
        if(this.userData.clear1 == 1) {
            cc.audioEngine.stopAll();
            cc.director.loadScene("Start2");
        }
        else {
            alert("Please first clear stage 1");
        }
    }

    ReturnTo() {
        cc.director.loadScene("StageSelect");
    }

    LeaderGo() {
        cc.director.loadScene("LeaderBoard");
    }

    LogOut() {
        firebase.auth().signOut().then( () => {
            cc.director.loadScene("Init");
        }).catch( (e) => { alert("error on signout") });
    }
}
