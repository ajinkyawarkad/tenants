import { Component } from "@angular/core";
import firebase from "firebase";
import { NavController, NavParams } from "ionic-angular";
import {  Observable } from "rxjs";


interface Users {
  name: string;
  manager: string;
}

@Component({
  selector: "page-call-details",
  templateUrl: "call-details.html",
})
export class CallDetailsPage {
  uid: any;
  campid: any;
  public date:any;

  productss: Observable<Users[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.campid = navParams.get("campid");
    console.log("camp id", this.campid);

    this.uid = navParams.get("uid");
    console.log("lead id", this.uid);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CallDetailsPage");

    let cu = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("Company")
      .doc("COM#" + cu)
      .collection("Campaigns")
      .doc(this.campid)
      .collection("leads")
      .doc(this.uid)
      .collection("History")
      .doc("Activity1")
      .get()
      .then((doc) => {
        if (doc.data()) {
          firebase
            .firestore()
            .collection("Company")
            .doc("COM#" + cu)
            .collection("Campaigns")
            .doc(this.campid)
            .collection("leads")
            .doc(this.uid)
            .collection("History")
            .doc("Activity1")
            .onSnapshot((doc) => {
              var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
              console.log(source, " data: ");
              this.productss = doc.data().data;
              
              this.date = this.productss[0].Time.toDate();
              let mm = this.date.getMonth();
              let dd = this.date.getDate();
              let yyyy = this.date.getFullYear();
              this.date = dd + '/' + mm + '/' + yyyy;
            
            });
        }else{
          console.log('DATA EMPTY')
        }
      });
  }
}