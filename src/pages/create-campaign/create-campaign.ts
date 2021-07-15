import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { Slides } from "ionic-angular";
import { CreateLeadProfilePage } from "../create-lead-profile/create-lead-profile";
import { Camp, Sts } from "../../models/user";
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from "firebase/app";
import { Storage } from "@ionic/storage";
import { v4 as uuid } from "uuid";
import { Observable } from "rxjs";


@Component({
  selector: "page-create-campaign",
  templateUrl: "create-campaign.html",
})
export class CreateCampaignPage {
  @ViewChild(Slides) slides: Slides;
  slideOpts;

  createSuccess = false;
  camp = {} as Camp;
  sts = {} as Sts;
  uuid1 = uuid();
  products: Observable<any[]>;
  productss: Observable<any[]>;
  userInfo: any;
  public anArray: any = [];
  public acArr: any = [];
  formSlide = true;
  currentuser = firebase.auth().currentUser;

  constructor(
  
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public afs: AngularFirestore,
    private storage: Storage
  ) {
    this.slideOpts = {
      effect: "flip",
    };
  }
  temp() {
    this.navCtrl.push(CreateLeadProfilePage);
  }

  checkAlert(evt) {
    var val = evt.target.value;
    if (val === "Remove client from profile") {
      alert("this will remove client profile permently");
    }
  }
 

  Add() {
    if (this.anArray.length < 8) {
      this.anArray.push({ status: "", action: "None" });
    } else {
      alert("you reached to limit.. ");
    }
  }

  remove(idx) {
    this.anArray.splice(idx, 1);
  }
  ionViewDidLoad() {
    this.sts.sts1 = "Interested";
    this.sts.sts2 = "Not-Interested";
    this.sts.action1 = "None"
    this.sts.action2 ="None"
   
   

    firebase
      .firestore()
      .collection("Company")
      .doc(this.currentuser.photoURL)
      .collection("Admin")
      .doc(this.currentuser.uid)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        this.products = doc.data().Managers;
       
      });

    firebase
      .firestore()
      .collection("Company")
      .doc(this.currentuser.photoURL)
      .collection("Admin")
      .doc(this.currentuser.uid)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        this.productss = doc.data().Users;
       
      });
  }

  insertUser(camp: Camp, data, data2) {
   
    let ids: any = [];
    ids = data;
    let x = [];
    let y = [];
    for (var z in ids) {
      x.push(ids[z].id);
      y.push(ids[z].name);
    }

    var obj = [
      {
        status: this.sts.sts1,
        action: this.sts.action1,
      },
      {
        status: this.sts.sts2,
        action: this.sts.action2,
      },
    ];
    let i;
    let n = this.anArray.length;
    for (i = 0; i < n; i++) {
      obj.push(this.anArray[i]);
    }
    
    this.storage
      .get("cuid")
      .then((val) => {
     
        this.storage.set("campId", this.uuid1);

        firebase
          .firestore()
          .collection("Company")
          .doc(val)
          .collection("Campaigns")
          .doc(this.uuid1)
          .set(
            Object.assign({
              cid: this.uuid1,
              name: camp.name,
              goals: camp.goals,
              manager: data2.name,
              manId: data2.id,

              SR_id: x,
              SR_name: y,
              status: obj,
              active: true,
            })
          );

          firebase
        .firestore()
        .collection("Company")
        .doc(val)
        .collection("Users")
        .doc(data2.id)
        .collection("CampsAsso")
        .doc(this.uuid1)
        .set(
          Object.assign(
            {
              cid: this.uuid1,
              name: camp.name,
              goals: camp.goals,
              manager: data2.name,
              active: true,
            },
            { merge: true }
          )
        );

        for (var d in x) {
          firebase
            .firestore()
            .collection("Company")
            .doc(val)
            .collection("Users")
            .doc(x[d])
            .collection("CampsAsso")
            .doc(this.uuid1)
            .set(
              Object.assign(
                {
                  cid: this.uuid1,
                  name: camp.name,
                  goals: camp.goals,
                  manager: data2.name,
                  active: true,
                },
                { merge: true }
              )
            );
        }

        let alert = this.alertCtrl.create({
          title: "Success",
          subTitle: "Compaign Added Successfully. Now You Can Add Leads",
          //scope: id,
          buttons: [
            {
              text: "OK",
              handler: (data) => {
                this.navCtrl.push(CreateLeadProfilePage, {
                  item: this.uuid1,
                  manId:data2.id,
                  Srs:x
                });
              },
            },
          ],
        });
        alert.present();
      })
      .catch((err) => {
       
        let alert = this.alertCtrl.create({
        
          subTitle: err,
          buttons: [{ text: "OK", handler: (data) => {} }],
        });
        alert.present();
      });

   
  }

  save() {
    this.navCtrl.push(CreateLeadProfilePage);
  }
  ionViewDidEnter() {
    //lock manual swipe for main slider
    this.slides.lockSwipeToNext(true);
    this.slides.lockSwipeToPrev(true);
    this.slides.onlyExternal = true;
  }

  slideToSlide() {
    this.formSlide= false
    if (this.slides.getActiveIndex() + 1 === this.slides.length()) {
      this.slides.slideTo(0);
    } else {
      this.slides.lockSwipeToNext(false);
      this.slides.slideTo(this.slides.getActiveIndex() + 1);
      this.slides.lockSwipeToNext(true);
    }
  }

  slideToPrev() {
    this.formSlide = true
    if (this.slides.getActiveIndex() + 1 == this.slides.length()) {
      this.slides.lockSwipeToPrev(false);
      this.slides.slideTo(this.slides.getActiveIndex() - 1);
      this.slides.lockSwipeToPrev(true);
    }
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: "Success",
      message: "Compaign Created Successfully. Now You Can Add Leads",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
        },
        {
          text: "Add",
          handler: () => { 
            this.navCtrl.push(CreateLeadProfilePage);
          },
        },
      ],
    });
    alert.present();
  }
}
