import { Component } from "@angular/core";
import firebase from "firebase";
import { AlertController } from "ionic-angular";
import { NavController, NavParams } from "ionic-angular";
import { HomePage } from "../home/home";

@Component({
  selector: "page-edit-csv-field",
  templateUrl: "edit-csv-field.html",
})
export class EditCsvFieldPage {
  products: any;
  campid: any;
  anArray: any = [];
  arr: any = [];

  arrFilelds = [
    "Select",
    "None",
    "Custome",
    "Action",
    "Address",
    "Apartment",
    "City",
    "Company_Name",
    "Corporate_Website",
    "Country",
    "Currency",
    "Date_of_Birth",
    "Email",
    "Facebook",
    "Facebook_Page",
    "Fax",
    "first_name",
    "Follow_up",
    "Full_Name",
    "Gender",
    "Handler",
    "Home",
    "Home_Phone",
    "Id",
    "last_name",
    "Live_Chat",
    "LiveJournal",
     "middle_name",
    "Mobile",
    "Newsletter_Email",
    "Opportunity",
    "Other_Contact",
    "Personal_Page",
    "Phone",
    "Position",
    "Price",
    "Profile_URL",
    "Quality",
    "Responsible_Person",
    "Salutation",
    "Skype",
    "Source",
    "Stage",
    "State",
    "Telegram_Account",
    "Twitter",
    "Vibe_Contact",
    "VK_Page",
    "Website",
    "Work_Email",
    "Work_Phone",
    "Zip",
    "E-mail",
  ];


  dummy = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    this.campid = navParams.get("campid");
  }
  Add() {
    //this.arr.push({'value':'','action':' '});
    // if (this.arr.length < 5) {
    //   this.arr.push({ value: "", action: "" });
    // } else {
    //   alert("you reached to limit.. ");
    // }
    this.anArray.push({ value: "", indicator: "None" });
    this.dummy.push({indicator: "None" });
  }

  remove(idx) {
    this.anArray.splice(idx, 1);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EditCsvFieldPage");
    let currentuser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.campid)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ");
        this.products = doc.data().CSVfield;
        console.log("csv ", this.products);
        this.anArray = this.products;
      });

    for (var r in this.anArray) {
      this.dummy.push({ indicator: this.anArray[r].indicator });
    }
  }


  removeField(valuee, att) {
    console.log("fa", this.anArray);
    console.log("fa", this.dummy);
    if (att == "None" || att =="Custome") {
      this.anArray[valuee].indicator = att;
      this.dummy[valuee].indicator = att;
      
    } else {
      let b = att;
      if (b) {
        let s = this.arrFilelds.includes(att);

        switch (s) {
          case true:
            let f;
            let a;

            // let f = this.dummy.includes({indicator:att});
            for (var t in this.dummy) {
              if (this.dummy[t].indicator == att) {
                f = true;
                a = t;
                break;
              } else {
                f = false;
              }
            }

            //a = match found index
            //value
            console.log("fa", f);
            switch (f) {
              case false:
                // this.dummy.push(att)
                console.log(valuee, att);
                this.dummy[valuee].indicator = att;
                // console.log("false Dummy", this.dummy);
                // console.log("False Anarray", this.anArray);
                break;
              case true:
                alert("Duplicate Fields not allowed");
                console.log(valuee, att);

                console.log("indessss", a);

                this.anArray[valuee].indicator = "Select";
                this.dummy[valuee].indicator = "Select";

                this.anArray[a].indicator = att;
                this.dummy[a].indicator = att;

                console.log("true Dummy", this.dummy);
                console.log("true anArray", this.anArray);

              // let a = this.dummy.indexOf(att);
            }

            break;

          case false:
            alert("Something went  Wrong");
            break;
        }
      } else {
        console.log("Bllank");
      }
     
    }
  }




  savefield() {
    //let Mainheader =this.anArray;

    //console.log("EDITED/Added",this.arr);

    let currentUser = firebase.auth().currentUser;
    // firebase.firestore().collection('Company').doc(currentUser.photoURL).collection('Campaigns').doc(this.campid)
    // .collection('leads').get().then(dat =>{
    //   dat.docs.forEach(snap =>
    //     {
    //       for(var z in this.anArray){
    //         firebase.firestore().collection('Company').doc(currentUser.photoURL).collection('Campaigns').doc(this.campid)
    //         .collection('leads').doc(snap.data().uid).update({
    //           leads:firebase.firestore.FieldValue.arrayUnion(
    //             this.anArray[z]
    //           )
    //         })

    //       }

    //     })
    // })

    for (var x in this.anArray) {
      firebase
        .firestore()
        .collection("Company")
        .doc(currentUser.photoURL)
        .collection("Campaigns")
        .doc(this.campid)
        .update({
          CSVfield: firebase.firestore.FieldValue.arrayUnion(this.anArray[x]),
        });
    }

    let alert = this.alertCtrl.create({
      title: "Sucess",
      subTitle: " Field Updated Successfully .. ",
      buttons: [
        {
          text: "OK",
          handler: (data) => {
            this.navCtrl.push(HomePage);
          },
        },
      ],
    });
    alert.present();
  }
}
