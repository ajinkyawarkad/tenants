import { Component } from "@angular/core";
import { AlertController, NavController, NavParams } from "ionic-angular";
import { CreateCampaignsLeadPage } from "../create-campaigns-lead/create-campaigns-lead";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";
import { Http } from "@angular/http";

import * as $ from "jquery";
import * as papa from "papaparse";
import { HomePage } from "../home/home";
import { Observable } from "rxjs";
import { CreateNewCampleadPage } from "../create-new-camplead/create-new-camplead";
import firebase from "firebase";
import { Camp } from "../../models/user";

import { v4 as uuid } from "uuid";
import { TrackCampaignPage } from "../track-campaign/track-campaign";

interface Camps {
  name: string;
}
@Component({
  selector: "page-create-lead-profile",
  templateUrl: "create-lead-profile.html",
})
export class CreateLeadProfilePage {
  public form: FormGroup;

  public headerRow: any;
  csvContent: any;
  csvData: any;
  campid: any;
  public anArray: any = [];
  public anArray1: any = [];
  products: Observable<Camps[]>;
  FireHead: any = [];
  data: any;
  index: any;
  arr: any = [];
  show = false;

  uploadFlag = false;

  MAIN = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _FB: FormBuilder,
    private http: Http,
    private alertCtrl: AlertController,
    public navParam: NavParams
  ) {
    this.campid = this.navParams.get("item");
    console.log("Camp idd", this.campid);
  }

  Add() {
    this.anArray1.push({ value: "", indicator: "" });
    this.anArray.push({ value: "", indicator: "" });
  }

  remove(idx) {
    this.anArray.splice(idx, 1);
    this.anArray1.splice(idx, 1);
  }

  ionViewDidLoad() {
    $("table#mytable tr").each(function () {
      if ($(this).children("td").length < 0) {
        $(this).hide();
      } else {
        $(this).show();
      }
    });
    console.log("ionViewDidLoad CreateLeadProfilePage");
  }

  onFileSelect(input: HTMLInputElement) {
    const files = input.files;
    var content = this.csvContent;

    if (files && files.length) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
      //fileReader.onload = this.onFileLoad;

      fileReader.onload = () => {
        fileReader.result; // This is valid
        //console.log(fileReader.result)
        this.extractData(fileReader.result);
      };
      fileReader.readAsText(fileToRead, "UTF-8");
    }
  }

  extractData(res) {
    let csvData = res;
    let parsedData = papa.parse(csvData).data;
    this.headerRow = parsedData[0];                    //Headers
    this.arr = parsedData;                            //DATA Except headers
    console.log("Length = : ", this.arr.length);
    console.log("DATA IS = : ", this.arr);

    var match = this.headerRow.toString().split(",");
    console.log(match);

    for (var a in match) {
      var variable = match[a];
      // console.log(variable)
      this.anArray.push({value:variable,indicator: "" });   //Creating CsvFields Structure
     
    }
    console.log("aaaaaaaa",this.anArray);
  }

  // savefield1() {
  //   let Mainheader = this.anArray1;
  //   console.log(Mainheader);

  //   let currentUser = firebase.auth().currentUser;
  //   firebase
  //     .firestore()
  //     .collection("Company")
  //     .doc(currentUser.photoURL)
  //     .collection("Campaigns")
  //     .doc(this.campid)
  //     .update({
  //       CSVfield: Mainheader,
  //     });
  //   //execute function
  //   firebase
  //     .firestore()
  //     .collection("Company")
  //     .doc("COM#" + currentUser.uid)
  //     .collection("Campaigns")
  //     .doc(this.campid)
  //     .onSnapshot((doc) => {
  //       var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
  //       console.log(source, " data: ");
  //       this.FireHead = doc.data().CSVfield;
  //       console.log("Headers from firebase", this.FireHead);
  //     });

  //   let alert = this.alertCtrl.create({
  //     title: "Sucess",
  //     subTitle: " Field Added Successfully .. Now you can add lead ",
  //     buttons: [
  //       {
  //         text: "OK",
  //         handler: (data) => {
  //           let campid=this.campid
  //           this.navCtrl.push(CreateNewCampleadPage,
  //             {
  //             campid
  //             });
  //         },
  //       },
  //       {
  //         text: "Cancel",
  //         role: "cancel",
  //         handler: () => {
  //           console.log("Cancel clicked");
  //           this.navCtrl.push(HomePage);
  //         },
  //       },
  //     ],
  //   });
  //   alert.present();
  // }

  // execute(){
  //   let currentUser=firebase.auth().currentUser
  //   firebase.firestore().collection('Company').doc('COM#'+currentUser.uid).collection('Campaigns').doc(this.value).onSnapshot((doc) => {
  //     var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
  //     console.log(source, " data: ");
  //     this.FireHead =  doc.data().CSVfield ;
  //     console.log("Headers from firebase",this.FireHead) ;
  //     });
  // }

  upload(){
    let currentUser =firebase.auth().currentUser
    let i;
    for (i = 1; i < this.arr.length; i++) {
      let x = [];
      let subMain = []; /////////======> Temp DATA
      x = this.arr[i];
      let j;
      for (j = 0; j < x.length; j++) {
        subMain.push({
          "value": this.FireHead[j].value,                
          "indicator": this.FireHead[j].indicator,
          "action": x[j],
        });
      }
      console.log("SUBMAIN", i, subMain);


      let cust = [];
      let uid = uuid();

      for (var a in subMain) {
        if (subMain[a].indicator == "None") {   //non Adressed fields Sorting CustomeFields
          cust.push(subMain[a]);
        } else {
         
          firebase
            .firestore()
            .collection("Company")
            .doc(currentUser.photoURL)
            .collection("Campaigns")
            .doc(this.campid)
            .collection("leads")
            .doc(uid)
            .set(
              {
                [subMain[a].indicator]: subMain[a].action,    
              },
              { merge: true }
            );
        }
        firebase
          .firestore()
          .collection("Company")
          .doc(currentUser.photoURL)
          .collection("Campaigns")
          .doc(this.campid)
          .collection("leads")
          .doc(uid)
          .set(
            {
              leads: cust,
              uid: uid,
              createdAt:firebase.firestore.FieldValue.serverTimestamp(),
              SR_id:'NA',
              SR_name:'NA',
              
            },
            { merge: true }
          );
      }
    }


    let alert = this.alertCtrl.create({
      title: "Sucess",
      subTitle: " Field Added Successfully .. Now you can add lead ",
      buttons: [
        {
          text: "OK",
          handler: (data) => {
            let campid=this.campid
            this.navCtrl.push(CreateNewCampleadPage,
              {
              campid
              });
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
            this.navCtrl.push(HomePage);
          },
        },
      ],
    });
    alert.present();
  }

  savefield() {                             
    let Mainheader = this.anArray;
    console.log("MAIN HEADERS", Mainheader);

    let currentUser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Company")
      .doc(currentUser.photoURL)
      .collection("Campaigns")
      .doc(this.campid)
      .update({
        CSVfield: Mainheader,
      })
      .then((res) => {
        //execute function
        let currentUser = firebase.auth().currentUser;
        firebase
          .firestore()
          .collection("Company")
          .doc("COM#" + currentUser.uid)
          .collection("Campaigns")
          .doc(this.campid)
          .onSnapshot((doc) => {
            var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            console.log(source, " data: ");
            this.FireHead = doc.data().CSVfield;
            console.log("Headers from firebase", this.FireHead);
            this.uploadFlag = true;
          });
        })




    let arrz = [];

    firebase
      .firestore()
      .collection("Company")
      .doc(currentUser.photoURL)
      .collection("Campaigns")
      .doc(this.campid)
      .collection("Fields")
      .doc("records")
      .set(
        {
          Id: false,
          Salutation: false,
          first_name: false,
          middle_name: false,
          last_name: false,
          Full_Name: false,
          Email:false,
          Phone: false,
          Address: false,
          City: false,
          State: false,
          Country: false,
          Gender: false,
          Company_Name: false,
          Position: false,
          Profile_URL: false,
          Date_of_Birth: false,
          Apartment: false,
          Zip: false,
          Fax: false,
          Price: false,
          Stage: false,
          Quality: false,
          Currency: false,
          Other_Contact: false,
        },
        { merge: true }
      )
      .then((res) => {
        let i;
      
        for (i = 0; i < 4; i++) {
          firebase
            .firestore()
            .collection("Company")
            .doc(currentUser.photoURL)
            .collection("Campaigns")
            .doc(this.campid)
            .collection("Fields")
            .doc("records")
            .update({
              [Mainheader[i].indicator]: true,
            });
        }
      });
    //upload function
    // let i;
    // for (i = 1; i < this.arr.length; i++) {
    //   let x = [];
    //   let subMain = []; /////////======> Temp DATA
    //   x = this.arr[i];
    //   let j;
    //   for (j = 0; j < x.length; j++) {
    //     subMain.push({
    //       value: this.FireHead[j].value,
    //       indicator: this.FireHead[j].indicator,
    //       action: x[j],
    //     });
    //   }
    //   console.log("SUBMAIN", i, subMain);
    //   this.MAIN.push(subMain);
    //   let cust = [];
    //   let uid = uuid();

    //   for (var a in subMain) {
    //     if (subMain[a].indicator == "None") {
    //       cust.push(subMain[a]);
    //     } else {
    //       // this.data2.push({[x]:y})
    //       firebase
    //         .firestore()
    //         .collection("Company")
    //         .doc(currentUser.photoURL)
    //         .collection("Campaigns")
    //         .doc(this.campid)
    //         .collection("leads")
    //         .doc(uid)
    //         .set(
    //           {
    //             [subMain[a].indicator]: subMain[a].action,
    //           },
    //           { merge: true }
    //         );
    //     }
    //     firebase
    //       .firestore()
    //       .collection("Company")
    //       .doc(currentUser.photoURL)
    //       .collection("Campaigns")
    //       .doc(this.campid)
    //       .collection("leads")
    //       .doc(uid)
    //       .set(
    //         {
    //           leads: cust,
    //           uid: uid,
    //           SR_id:'NA',
    //           SR_name:'NA',
    //         },
    //         { merge: true }
    //       );
    //   }
    // }
    // let alert = this.alertCtrl.create({
    //   title: "Sucess",
    //   subTitle: " Field Added Successfully .. Now you can add lead ",
    //   buttons: [
    //     {
    //       text: "OK",
    //       handler: (data) => {
    //         let campid=this.campid
    //         this.navCtrl.push(CreateNewCampleadPage,
    //           {
    //           campid
    //           });
    //       },
    //     },
    //     {
    //       text: "Cancel",
    //       role: "cancel",
    //       handler: () => {
    //         console.log("Cancel clicked");
    //         this.navCtrl.push(HomePage);
    //       },
    //     },
    //   ],
    // });
    // alert.present();
  }

  // execute(){
  //   let currentuser=firebase.auth().currentUser;
  // firebase.firestore().collection('Company').doc('COM#'+currentuser.uid).collection('Campaigns').doc(this.value).onSnapshot((doc) => {
  //   var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
  //   console.log(source, " data: ");
  //   this.FireHead =  doc.data().CSVfield ;
  //   console.log("Headers from firebase",this.FireHead) ;
  //   });

  // }

  // upload(isChecked: boolean){

  //   let Mainheader =this.anArray;
  //   console.log(Mainheader);

  //   let currentUser = firebase.auth().currentUser;
  //   // firebase.firestore().collection('Company').doc(currentUser.photoURL).collection('Campaigns').doc(this.value)
  //   // .update({
  //   //   CSVfield:Mainheader
  //   // }
  //   // )
  //   //  var adminId= firebase.auth().currentUser.uid;
  //   //  var file_data = $('#myfile').prop('files')[0];
  // //  firebase.storage().ref("users").child(adminId +"/"+ this.value + "/file.csv").put(file_data);

  //   let i;
  //   for(i=1;i<this.arr.length;i++){
  //     let x=[];
  //     let subMain=[]; /////////======> Temp DATA
  //     x=this.arr[i]
  //     let j;
  //     for(j=0;j<x.length;j++){
  //       subMain.push({"value":this.FireHead[j].value,"indicator":this.FireHead[j].indicator,"action":x[j]})
  //     }
  //     console.log("SUBMAIN",i,subMain)
  //     this.MAIN.push(subMain)
  //     let cust=[]
  //     let uid=uuid()

  //     for(var a in subMain){

  //       if(subMain[a].indicator == "None"){
  //         cust.push(subMain[a])
  //       }else{
  //         // this.data2.push({[x]:y})
  //       firebase.firestore().collection('Company').doc(currentUser.photoURL).collection('Campaigns').doc(this.value)
  //       .collection('leads').doc(uid)
  //       .set( {
  //           [subMain[a].indicator]: subMain[a].action
  //         },{merge:true})
  //       }
  //       firebase.firestore().collection('Company').doc(currentUser.photoURL).collection('Campaigns').doc(this.value)
  //       .collection('leads').doc(uid)
  //       .set( {
  //         leads:cust,
  //         uid:uid
  //         },{merge:true})

  //     }
  //   }

  //  let alert = this.alertCtrl.create({
  //   title: 'Sucess',
  //   subTitle: ' File Uploaded Successfully',
  //   buttons: [{text: 'OK',
  //             handler: data => {
  //             // this.navCtrl.setRoot(HomePage);
  //             }
  //           }]
  //         });
  // alert.present();
  // }

  save1() {
    // this.navCtrl.push(CreateCampaignsLeadPage);
    this.navCtrl.push(CreateNewCampleadPage, {
      item: this.campid,
    });
  }
}
