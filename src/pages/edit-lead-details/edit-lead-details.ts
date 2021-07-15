import { Component } from "@angular/core";
import {AlertController,NavController,NavParams} from "ionic-angular";
import firebase from "firebase/app";
import { Observable } from "rxjs";

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
  currentuser = firebase.auth().currentUser;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    this.value = navParams.get("cid");
    this.data = navParams.get("data");
  
    firebase
      .firestore()
      .collection("Company")
      .doc(this.currentuser.photoURL + "/" + "Campaigns" + "/" + this.value)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        this.productss = doc.data().status;
        this.arr = this.productss;
      });

    firebase
      .firestore()
      .collection("Company")
      .doc(this.currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.value)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        this.products = doc.data().CSVfield;
        let test: any = [];
        test = this.products;
        for (var a in test) {
          if (test[a].indicator !== "None") {
            this.anArray.push(test[a]);
          } 
        }
      });
  }

  Getselected(selected_value) {
    let temp = [];
    this.select = selected_value;
    let action;
    for (var s in this.arr) {
      if (this.arr[s].status == selected_value) {
        temp.push(this.arr[s]);
        action = this.arr[s].action;
      }
    }
    this.act = action;
  
  }
  hide() {
    this.hideMe = !this.hideMe;
  }
  ionViewDidLoad() {
  
    firebase
      .firestore()
      .collection("Company")
      .doc(this.currentuser.photoURL)
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
          } 
        }
      
      });
  }

  update() {
   

    //===================================Basic details update ==========================================
    for (var a in this.field) {
      firebase
        .firestore()
        .collection("Company")
        .doc(this.currentuser.photoURL)
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
      .doc(this.currentuser.photoURL)
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

      .then(() => {

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
    
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: err,
          buttons: [
            {
              text: "OK",
              handler: (data) => {
              },
            },
          ],
        });
      });
  }
}
