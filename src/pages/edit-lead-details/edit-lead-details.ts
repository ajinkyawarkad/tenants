import { Component, ViewChild } from "@angular/core";
import {
  AlertController,
  IonicPage,
  NavController,
  NavParams,
} from "ionic-angular";
import { Leadd, Leadref } from "../../models/user";

import firebase, { database } from "firebase/app";
import { Storage } from "@ionic/storage";

import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

import { uuid } from "uuidv4";
import { Observable } from "rxjs";
import * as $ from "jquery";

interface Lead {
  status: string;
  action: string;
}

interface Lead {
  status: string;
  action: string;
}

@Component({
  selector: "page-edit-lead-details",
  templateUrl: "edit-lead-details.html",
})
export class EditLeadDetailsPage {
  public hideMe: boolean = false;
  public hideMe1: boolean = false;
  field = [];
  val = [];
  myDate;
  value: any;
  id: any;
  data: any;
  data1: any;
  public anArray: any = [];

  arr: any = [];
  act;
  select;
  public products: Observable<any[]>;
  public productss: Observable<any[]>;
  public non: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    this.value = navParams.get("cid");
    console.log(this.value);

    this.data = navParams.get("data");
    console.log("Data", this.data);

    let currentuser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL + "/" + "Campaigns" + "/" + this.value)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ");
        this.productss = doc.data().status;
        this.arr = this.productss;
        console.log(this.productss);
      });

    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.value)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ");
        this.products = doc.data().CSVfield;

        console.log("csv ", this.products);
        let test: any = [];
        test = this.products;
        for (var a in test) {
          if (test[a].indicator !== "None") {
            this.anArray.push(test[a]);
          } else {
            // this.anArray2.push(test[a]);
          }
        }
      });
  }

  Getselected(selected_value) {
    let temp = [];
    console.log("SELECT", selected_value);
    this.select = selected_value;
    let action;
    for (var s in this.arr) {
      if (this.arr[s].status == selected_value) {
        temp.push(this.arr[s]);
        action = this.arr[s].action;
      }
    }

    this.act = action;
    console.log("TEMO", this.act);
  }
  hide() {
    this.hideMe = !this.hideMe;
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad EditLeadDetailsPage");

    let currentuser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.value)
      .collection("leads")
      .doc(this.data.uid)
      .onSnapshot((res) => {
        let a: any = [];
        let b: any = [];
        a = res.data();
        b = res.data().leads;

        this.field = [];
        this.val = [];

        let k = Object.keys(a);
        let v = Object.values(a);
        this.non = b;

        console.log("TEMO", this.non);

        for (var i in k) {
          let r = k[i];
          let val = v[i];
          if (
            r !== "SR_id" &&
            r !== "SR_name" &&
            r !== "uid" &&
            r !== "leads" &&
            r !== "merge"
          ) {
            if (
              r !== "action" &&
              r !== "datetime" &&
              r !== "status" &&
              r !== "remark"
            ) {
              this.field.push({ action: r, value: val });
            }
          } else {
            console.log("fiegggggggggggld", k[i]);
          } //"SR_id" || "SR_name" || "uid" || "leads"
        }
        console.log("field", this.field);
      });
  }

  update() {
    console.log(this.value);

    for (var a in this.field) {
      console.log({ [this.field[a].action]: this.field[a].value });
    }

    let currentuser = firebase.auth().currentUser;
    //===================================Basic details update ==========================================
    for (var a in this.field) {
      firebase
        .firestore()
        .collection("Company")
        .doc(currentuser.photoURL)
        .collection("Campaigns")
        .doc(this.value)
        .collection("leads")
        .doc(this.data.uid)
        .update({
          [this.field[a].action]: this.field[a].value,
        });
    }
    //=======================================================================
    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.value)
      .collection("leads")
      .doc(this.data.uid)
      .set(
        {
          leads: this.non,
        },
        { merge: true }
      )

      // firebase
      // .firestore()
      // .collection("Company")
      // .doc(currentuser.photoURL)
      // .collection("Campaigns")
      // .doc(this.value.cid)
      // .collection("leads")
      // .doc(this.data.uid)

      // .update(
      // Object.assign({
      // action: this.data.action,
      // remark: this.data.remark,
      // status: this.data.status,
      // datetime: this.data.datetime,
      // })
      // )
      .then(() => {
        console.log("updated..");
        let alert = this.alertCtrl.create({
          title: "Sucess",
          subTitle: "Updated Sucessfully",
          buttons: [
            {
              text: "OK",
              handler: (data) => {
                this.navCtrl.pop();
              },
            },
          ],
        });
        alert.present();
      })
      .catch((err) => {
        console.log(err);
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: err,
          buttons: [
            {
              text: "OK",
              handler: (data) => {
                // this.navCtrl.setRoot(ProfilePage);
              },
            },
          ],
        });
      });
  }
}
