// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
declare const firebase: any;
const {ccclass, property} = cc._decorator;

@ccclass
export default class LeaderBoard extends cc.Component {

    @property(cc.Label)
    n1: cc.Label = null;

    @property(cc.Label)
    s1: cc.Label = null;

    @property(cc.Label)
    n2: cc.Label = null;

    @property(cc.Label)
    s2: cc.Label = null;

    @property(cc.Label)
    n3: cc.Label = null;

    @property(cc.Label)
    s3: cc.Label = null;

    @property(cc.Label)
    n4: cc.Label = null;

    @property(cc.Label)
    s4: cc.Label = null;

    @property(cc.Label)
    n5: cc.Label = null;

    @property(cc.Label)
    s5: cc.Label = null;

    first: number = -1;
    second: number = -1;
    third: number = -1;
    forth: number = -1;
    fifth: number = -1;

    firstLa: string = "NONE"
    secondLa: string = "NONE"
    thirdLa: string = "NONE"
    forthLa: string = "NONE"
    fifthLa: string = "NONE"

    onLoad () {
        firebase.database().ref("userData").once("value", (snap) => {
            snap.forEach((snap2) => {
                //console.log(snap2.val());

                let num = snap2.val().points;
                let name = snap2.val().Username;
                let current;
                if(num>this.fifth) {
                    if(num>this.forth) {
                        if(num>this.third) {
                            if(num>this.second) {
                                if(num>this.first) {
                                    this.fifth = this.forth;
                                    this.fifthLa = this.forthLa;
                                    this.forth = this.third;
                                    this.forthLa = this.thirdLa;
                                    this.third = this.second;
                                    this.thirdLa = this.secondLa;
                                    this.second = this.first;
                                    this.secondLa = this.firstLa;
                                    this.first = num;
                                    this.firstLa = name;
                                }
                                else {
                                    this.fifth = this.forth;
                                    this.fifthLa = this.forthLa;
                                    this.forth = this.third;
                                    this.forthLa = this.thirdLa;
                                    this.third = this.second;
                                    this.thirdLa = this.secondLa;
                                    this.second = num;
                                    this.secondLa = name;
                                }
                            }
                            else {
                                this.fifth = this.forth;
                                this.fifthLa = this.forthLa;
                                this.forth = this.third;
                                this.forthLa = this.thirdLa;
                                this.third = num;
                                this.thirdLa = name;
                            }
                        }
                        else {
                            this.fifth = this.forth;
                            this.fifthLa = this.forthLa;
                            this.forth = num;
                            this.forthLa = name;
                        }
                    }
                    else {
                        this.fifth = num;
                        this.fifthLa = name;
                    }
                }
            })

                
        }).then(() => {
            if(this.first==-1)
                this.first = 0;
            if(this.second==-1)
                this.second = 0;
            if(this.third==-1)
                this.third = 0;
            if(this.forth==-1)
                this.forth = 0;
            if(this.fifth==-1)
                this.fifth = 0;

            this.n1.string = this.firstLa.toUpperCase();
            this.s1.string = this.first.toString();
            this.n2.string = this.secondLa.toUpperCase();
            this.s2.string = this.second.toString();
            this.n3.string = this.thirdLa.toUpperCase();
            this.s3.string = this.third.toString();
            this.n4.string = this.forthLa.toUpperCase();
            this.s4.string = this.forth.toString();
            this.n5.string = this.fifthLa.toUpperCase();
            this.s5.string = this.fifth.toString();
        })
    }

    start () {

    }

    update (dt) {

    }
}
