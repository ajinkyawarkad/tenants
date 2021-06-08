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
  field = [];
  val = [];
  uid: any;
  t=[];
  campid: any;
  data;
  public date:any;
  productss: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
this.data = navParams.get("data");
console.log("Data", this.data);

    this.campid = navParams.get("campid");
    console.log("camp id", this.campid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemainingLeadDeatilsPage');

    let k = Object.keys(this.data);
    let v = Object.values(this.data);
    console.log("TEMO", k);
    console.log("TEMO", v);

    for (var i in k) {
     
      let r = k[i];
      let rr = v[i];
      if (r !== "SR_id" && r !== "SR_name" && r !== "uid" && r !== "leads" && r !== "merge") {
      if (r !== "action" && r !== "datetime" && r !== "status" && r !== "remark" && r!== "createdAt") {
        this.field.push({"action":r, "val":rr});
      }
      } 
       console.log("field", this.field);
    }
    let as = this.data
    let s;
    for(s=0;s<1;s++){
      this.t.push({"action":"Created At","val":as.createdAt.toDate()})
    }
   
    
    console.log("fdddddddeld", this.t);
    
    let cu = firebase.auth().currentUser.uid;

    firebase
      .firestore()
      .collection("Company")
      .doc("COM#" + cu)
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
            .doc("COM#" + cu)
            .collection("Campaigns")
            .doc(this.campid)
            .collection("leads")
            .doc(this.data.uid)
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
  


