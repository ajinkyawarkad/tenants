import { Component } from "@angular/core";
import firebase from "firebase";
import { NavController, NavParams } from "ionic-angular";
import {  Observable } from "rxjs";

@Component({
  selector: 'page-remaining-lead-deatils',
  templateUrl: 'remaining-lead-deatils.html',
})
export class RemainingLeadDeatilsPage {
  product:any;
  uid: any;
  campid: any;
  public date:any;
  productss: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = navParams.get("product");
    console.log("product", this.product);

    this.uid=this.product.uid;

    this.campid = navParams.get("campid");
    console.log("camp id", this.campid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemainingLeadDeatilsPage');
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
              
              console.log(this.productss)
            });
        }else{
          console.log('DATA EMPTY')
        }
      });
  }
  }
  


