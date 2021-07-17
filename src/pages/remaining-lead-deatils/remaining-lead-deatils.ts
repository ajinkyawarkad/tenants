import { Component } from "@angular/core";
import firebase from "firebase";
import { AlertController, HideWhen } from "ionic-angular";
import { NavController, NavParams } from "ionic-angular";
import { Observable } from "rxjs";
import { TaskDetailsPage } from "../task-details/task-details";

@Component({
  selector: "page-remaining-lead-deatils",
  templateUrl: "remaining-lead-deatils.html",
})
export class RemainingLeadDeatilsPage {
  product: any;
  Segments: string;
  p: number = 1;
  field = [];
  val = [];
  uid: any;
  t = [];
  campid: any;
  data;
  arr: any = [];
  public hideMe1: boolean = false;
  public date: any;
  productss: Observable<any[]>;
  products: any;
  comments: any;
  moreDetails = [];
  prod: any;
  pend: any = [];
  complete: any = [];
  currentUser = firebase.auth().currentUser;
 cu = firebase.auth().currentUser.uid;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    this.data = navParams.get("data");
    this.arr = this.data.leads;

    this.campid = navParams.get("cid");
    this.Segments = "1";
  }
  Add() {
    if(this.moreDetails.length < 0){
      this.hideMe1 = false
     
    }else{
      this.hideMe1 =true
     
    }
    this.moreDetails.push({ value: "", indicator: "Custome", action: "" });

  }

  remove(idx) {
    this.moreDetails.splice(idx, 1);
  }



  savefield() {
  
    for (var i in this.moreDetails) {
      this.arr.push(this.moreDetails[i]);
    }
  
    firebase
      .firestore()
      .collection("Company")
      .doc(this.currentUser.photoURL)
      .collection("Campaigns")
      .doc(this.campid)
      .collection("leads")
      .doc(this.data.uid)
      .update({
        leads: this.arr,
      });

    let alert = this.alertCtrl.create({
      title: "Sucess",
      subTitle: " Field Updated Successfully .. ",
      buttons: [
        {
          text: "OK",
          handler: (data) => {
            this.moreDetails = []
          },
        },
      ],
    });
    alert.present();
  }

  activity() {
    let cid = this.campid;
    let data = this.data;

    this.navCtrl.push(TaskDetailsPage, {
      cid,
      data,
    });
  }

  comment() {
    let alert = this.alertCtrl.create({
      title: "Leave Comment",
      inputs: [{ name: "comment", placeholder: "Comment" }],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
         
        },
        {
          text: "Save",
          handler: (data) => {
            if (data.comment) {
            
             
              const result = firebase
                .firestore()
                .collection("Company")
                .doc(this.currentUser.photoURL)
                .collection("Campaigns")
                .doc(this.campid)
                .collection("leads")
                .doc(this.data.uid)
                .collection("History")
                .doc("Activity1")
                .set(
                  {
                    comment: firebase.firestore.FieldValue.arrayUnion({
                      Time: new Date(),
                      Comment: data.comment,
                    }),
                  },
                  { merge: true }
                );
              if (result) {
                let alert = this.alertCtrl.create({
                  title: "Success",
                  subTitle: "Comment Added",
                  buttons: [
                    {
                      text: "OK",
                      handler: (data) => {
                        //this.navCtrl.setRoot(HomePage);
                      },
                    },
                  ],
                });
                alert.present();
              }
            } else {
              return false;
            }
          },
        },
      ],
    });
    alert.present();
  }

  ionViewDidLoad() {
  
    let k = Object.keys(this.data);
    let v = Object.values(this.data);
  
    for (var i in k) {
      let r = k[i];
      let rr = v[i];
      if (
        r !== "SR_id" &&
        r !== "SR_name" &&
        r !== "complete" &&
        r !== "uid" &&
        r !== "leads" &&
        r !== "merge" &&
        r !=="pending"
      ) {
        if (
          r !== "action" &&
          r !== "datetime" &&
          r !== "status" &&
          r !== "remark" &&
          r !== "createdAt"
        ) {
          this.field.push({ action: r, val: rr });
        }
      }
      
    }
    let as = this.data;
    let s;
   
  
  

    firebase
      .firestore()
      .collection("Company")
      .doc(this.currentUser.photoURL)
      .collection("Campaigns")
      .doc(this.campid)
      .collection("leads")
      .doc(this.data.uid)
      .collection("History")
      .doc("Activity1")
      //.where("Completed","==","true")
      .get()
      .then((doc) => {
        if (doc.data()) {
          firebase
            .firestore()
            .collection("Company")
            .doc(this.currentUser.photoURL)
            .collection("Campaigns")
            .doc(this.campid)
            .collection("leads")
            .doc(this.data.uid)
            .collection("History")
            .doc("Activity1")
            .onSnapshot((doc) => {
              var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
              
              this.prod = doc.data().data;
             
              for (var i in this.prod) {
                if (this.prod[i].Completed == false) {
                  this.pend.push(this.prod[i]);
                } else {
                  this.complete.push(this.prod[i]);
                }
              }
              
            });
        } 
      });

    firebase
      .firestore()
      .collection("Company")
      .doc(this.currentUser.photoURL)
      .collection("Campaigns")
      .doc(this.campid)
      .collection("leads")
      .doc(this.data.uid)
      .collection("History")
      .doc("Activity1")
      .get()
      .then((doc) => {
        if (doc.data()) {
          firebase
            .firestore()
            .collection("Company")
            .doc(this.currentUser.photoURL)
            .collection("Campaigns")
            .doc(this.campid)
            .collection("leads")
            .doc(this.data.uid)
            .collection("History")
            .doc("Activity1")
            .onSnapshot((doc) => {
              var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
             
              this.comments = doc.data().comment;
            });
        } 
      });
  }
}
