import { Component } from "@angular/core";
import { AlertController, NavController, NavParams } from "ionic-angular";
import { Http } from "@angular/http";
import * as $ from "jquery";
import * as papa from "papaparse";
import { Observable } from "rxjs";
import firebase from "firebase";
import { v4 as uuid } from "uuid";
import { HomeManagerPage } from "../home-manager/home-manager";
import { ManagerLeadInTrackCampPage } from "../manager-lead-in-track-camp/manager-lead-in-track-camp";

@Component({
  selector: 'page-manager-create-lead-profile',
  templateUrl: 'manager-create-lead-profile.html',
})
export class ManagerCreateLeadProfilePage {

 currentuser = firebase.auth().currentUser;
  public headerRow: any;
  csvContent: any;
  csvData: any;
  campid: any;
  public anArray: any = [];
  public anArray1: any = [];
  products: Observable<any[]>;
  FireHead: any = [];
  data: any;
  index: any;
  arr: any = [];
  show = false;
  name = true;
  name1 = true;
  name2 = true;
  name3 = true;
  name4 = true;
  name5 = true;
  name6 = true;

  arrDummy;
  dummy = [];
  dummy2 = [];

  selectedFiel = [];

  arrFilelds = [
    "Select",
    "None",
    "Custome",
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
    
  ];

  uploadFlag = false;
  uploadFlagg = false;

  MAIN = [];
  Segments: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    private alertCtrl: AlertController,
    public navParam: NavParams
  ) {
    this.Segments = "1";

    this.campid = this.navParams.get("item");
    
  }

  add(){
    this.anArray1.push({ value: "", indicator: "None" });
    this.dummy2.push({ indicator: "None" });
  }

  Add() {
    
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
  
  }

  removeField(valuee, att) {
    if (att == "None" || att == "Custome") {
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

          
            switch (f) {
              case false:
             
                this.dummy[valuee].indicator = att;
                
                break;
              case true:
                let alert = this.alertCtrl.create({
                  title: "Warning!",
                  subTitle: "Check Assigned Fields",
                  buttons: [
                    {
                      text: "OK",
                      handler: (data) => {
                        // this.navCtrl.push(HomeManagerPage);
                      },
                    },
                  ],
                });
                alert.present();
              

                this.anArray[valuee].indicator = "Select";
                this.dummy[valuee].indicator = "Select";

                this.anArray[a].indicator = att;
                this.dummy[a].indicator = att;

              
            }

            break;

          case false:
            alert("Something went  Wrong");
            break;
        }
      } 
    }
  }



  onFileSelect(input: HTMLInputElement) {
    this.headerRow = [];
    this.arr = [];
    this.anArray = [];
    this.arrDummy = [];
  
    const files = input.files;
    var content = this.csvContent;

    if (files && files.length) {
      const fileToRead = files[0];
      const fileReader = new FileReader();
   
      fileReader.onload = () => {
        fileReader.result; // This is valid
        this.extractData(fileReader.result);
      };
      fileReader.readAsText(fileToRead, "UTF-8");
    }
    this.uploadFlagg = true;
  }

  extractData(res) {
    this.arr = null;
    this.headerRow = null;
    this.anArray = [];
    this.arrDummy = [];
  
    let csvData = res;
    let parsedData = papa.parse(csvData).data;
    this.headerRow = parsedData[0]; //Headers
    this.arr = parsedData; //DATA Except headers
  
    var match = this.headerRow.toString().split(",");

    for (var a in match) {
      var variable = match[a];
    
      this.anArray.push({ value: variable, indicator: "None" }); //Creating CsvFields Structure
      this.arrDummy.push({ value: variable, indicator: "" });
      this.dummy.push({ indicator: "None" });
    }
    
  }


  removeField2(index, field ){
    if (field == "None" || field == "Custome") {
      this.anArray1[index].indicator = field;
      this.dummy2[index].indicator = field;
    } else {
      let b = field;
      if (b) {
        let s = this.arrFilelds.includes(field);
            let f;
            let a;

            for (var t in this.dummy2) {
              if (this.dummy2[t].indicator == field) {
                f = true;
                a = t;
                break;
              } else {
                f = false;
              }
            }

            switch (f) {
              case false:
                
                this.dummy2[index].indicator = field;
                break;
              case true:
                let alert = this.alertCtrl.create({
                  title: "Warning!",
                  subTitle: "Check Assigned Fields",
                  buttons: [
                    {
                      text: "OK",
                      handler: (data) => {
                        // this.navCtrl.push(HomeManagerPage);
                      },
                    },
                  ],
                });
                alert.present();
              
                this.anArray1[index].indicator = "Select";
                this.dummy2[index].indicator = "Select";

                this.anArray1[a].indicator = field;
                this.dummy2[a].indicator = field;

            }

      } 
    }

  }

  savefield1() {
    let check;

    for (var i in this.anArray1) {
      if (
        this.anArray1[i].indicator == "None" ||
        this.anArray1[i].indicator == "Select"
      ) {
        this.anArray1[i].indicator = "Select";
        check = true;
      } 
    }

    if (check) {
      alert("Select Filelds ");
    } else {
      let Mainheader = this.anArray1;
    
      firebase
        .firestore()
        .collection("Company")
        .doc(this.currentuser.photoURL)
        .collection("Campaigns")
        .doc(this.campid)
        .update({
          CSVfield: Mainheader,
        })
        .then((res) => {
          //execute function
         
          firebase
            .firestore()
            .collection("Company")
            .doc(this.currentuser.photoURL)
            .collection("Campaigns")
            .doc(this.campid)
            .onSnapshot((doc) => {
              var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            
              this.FireHead = doc.data().CSVfield;
              this.uploadFlag = true;
            });
        });
        let alert = this.alertCtrl.create({
          title: "Sucess",
          subTitle: " Field Added Successfully.. Continue to Add Lead ",
          buttons: [
            {
              text: "OK",
              handler: (data) => {
                let campid = this.campid;
                this.navCtrl.push(ManagerLeadInTrackCampPage, {
                  campid,
                });
               // this.navCtrl.push(HomeManagerPage);
              },
            },
            {
              text: "Cancel",
              role: "cancel",
              handler: () => {
               
                this.navCtrl.push(HomeManagerPage);
              },
            },
          ],
        });
        alert.present();


      let arrz = [];

      firebase
        .firestore()
        .collection("Company")
        .doc(this.currentuser.photoURL)
        .collection("Users").doc(this.currentuser.uid).collection("CampsAsso")
        .doc(this.campid)
        .collection("Fields")
        .doc("records")
        .set(
          {
            Action: false,
            Address: false,
            Apartment: false,
            City: false,
            Company_Name: false,
            Corporate_Website: false,
            Country: false,
            Currency: false,
            Date_of_Birth: false,
            Email: false,
            Facebook: false,
            Facebook_Page: false,
            Fax: false,
            first_name: false,
            Follow_up: false,
            Full_Name: false,
            Gender: false,
            Handler: false,
            Home: false,
            Home_Phone: false,
            Id: false,
            last_name: false,
            Live_Chat: false,
            LiveJournal: false,
            middle_name: false,
            Mobile: false,
            Newsletter_Email: false,
            Opportunity: false,
            Other_Contact: false,
            Personal_Page: false,
            Phone: false,
            Position: false,
            Price: false,
            Profile_URL: false,
            Quality: false,
            Responsible_Person: false,
            Salutation: false,
            Skype: false,
            Source: false,
            Stage: false,
            State: false,
            Telegram_Account: false,
            Twitter: false,
            Vibe_Contact: false,
            VK_Page: false,
            Website: false,
            Work_Email: false,
            Work_Phone: false,
            Zip: false,
          },
          { merge: true }
        )
        firebase
        .firestore()
        .collection("Company")
        .doc(this.currentuser.photoURL)
        .collection("Campaigns").doc(this.currentuser.uid).collection("CampsAsso")
        .doc(this.campid)
        .collection("Fields")
        .doc("records")
        .set(
          {
            Action: false,
            Address: false,
            Apartment: false,
            City: false,
            Company_Name: false,
            Corporate_Website: false,
            Country: false,
            Currency: false,
            Date_of_Birth: false,
            Email: false,
            Facebook: false,
            Facebook_Page: false,
            Fax: false,
            first_name: false,
            Follow_up: false,
            Full_Name: false,
            Gender: false,
            Handler: false,
            Home: false,
            Home_Phone: false,
            Id: false,
            last_name: false,
            Live_Chat: false,
            LiveJournal: false,
            middle_name: false,
            Mobile: false,
            Newsletter_Email: false,
            Opportunity: false,
            Other_Contact: false,
            Personal_Page: false,
            Phone: false,
            Position: false,
            Price: false,
            Profile_URL: false,
            Quality: false,
            Responsible_Person: false,
            Salutation: false,
            Skype: false,
            Source: false,
            Stage: false,
            State: false,
            Telegram_Account: false,
            Twitter: false,
            Vibe_Contact: false,
            VK_Page: false,
            Website: false,
            Work_Email: false,
            Work_Phone: false,
            Zip: false,
          },
          { merge: true }
        )
        .then((res) => {
          let i;

          for (i = 0; i < 4; i++) {
            firebase
            .firestore()
            .collection("Company")
            .doc(this.currentuser.photoURL)
            .collection("Users").doc(this.currentuser.uid).collection("CampsAsso")
            .doc(this.campid)
            .collection("Fields")
            .doc("records")
              .update({
                [Mainheader[i].indicator]: true,
              });
          }
        });
    }
    
  }



  upload() {
   
    let i;
    for (i = 1; i < this.arr.length; i++) {
      let x = [];
      let subMain = []; /////////======> Temp DATA
      x = this.arr[i];
      let j;
      for (j = 0; j < x.length; j++) {
        subMain.push({
          value: this.FireHead[j].value,
          indicator: this.FireHead[j].indicator,
          action: x[j],
        });
      }
    

      let cust = [];
      let uid = uuid();

      for (var a in subMain) {
        if (subMain[a].indicator == "Custome") {
          //non Adressed fields Sorting CustomeFields
          cust.push(subMain[a]);
        } else {
          firebase
            .firestore()
            .collection("Company")
            .doc(this.currentuser.photoURL)
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
          .doc(this.currentuser.photoURL)
          .collection("Campaigns")
          .doc(this.campid)
          .collection("leads")
          .doc(uid)
          .set(
            {
              leads: cust,
              uid: uid,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              SR_id: "NA",
              SR_name: "NA",
              complete: false,
            },
            { merge: true }
          );
      }
    }

    let alert = this.alertCtrl.create({
      title: "Sucess",
      subTitle: " Field Added Successfully ",
      buttons: [
        {
          text: "OK",
          handler: (data) => {
            let campid = this.campid;
            // this.navCtrl.push(CreateNewCampleadPage, {
            //   campid,
            // });
            this.navCtrl.push(HomeManagerPage);
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
           
            this.navCtrl.push(HomeManagerPage);
          },
        },
      ],
    });
    alert.present();
  }

  savefield() {
    let check;

    for (var i in this.anArray) {
      if (
        this.anArray[i].indicator == "None" ||
        this.anArray[i].indicator == "Select"
      ) {
        this.anArray[i].indicator = "Select";
        check = true;
      } 
    }

    if (check) {
      alert("Select Filelds ");
    } else {
      let Mainheader = this.anArray;
     
      firebase
        .firestore()
        .collection("Company")
        .doc(this.currentuser.photoURL)
        .collection("Campaigns")
        .doc(this.campid)
        .update({
          CSVfield: Mainheader,
        })
        .then((res) => {
          //execute function
        
          firebase
            .firestore()
            .collection("Company")
            .doc(this.currentuser.photoURL)
            .collection("Campaigns")
            .doc(this.campid)
            .onSnapshot((doc) => {
              var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            
              this.FireHead = doc.data().CSVfield;
            
              this.uploadFlag = true;
            });
        });

      let arrz = [];

      firebase
        .firestore()
        .collection("Company")
        .doc(this.currentuser.photoURL)
        .collection("Users").doc(this.currentuser.uid).collection("CampsAsso")
        .doc(this.campid)
        .collection("Fields")
        .doc("records")
        .set(
          {
          Action: false,
          Address: false,
          Apartment: false,
          City: false,
          Company_Name: false,
          Corporate_Website: false,
          Country: false,
          Currency: false,
          Date_of_Birth: false,
          Email: false,
          Facebook: false,
          Facebook_Page: false,
          Fax: false,
          first_name: false,
          Follow_up: false,
          Full_Name: false,
          Gender: false,
          Handler: false,
          Home: false,
          Home_Phone: false,
          Id: false,
          last_name: false,
          Live_Chat: false,
          LiveJournal: false,
          middle_name: false,
          Mobile: false,
          Newsletter_Email: false,
          Opportunity: false,
          Other_Contact: false,
          Personal_Page: false,
          Phone: false,
          Position: false,
          Price: false,
          Profile_URL: false,
          Quality: false,
          Responsible_Person: false,
          Salutation: false,
          Skype: false,
          Source: false,
          Stage: false,
          State: false,
          Telegram_Account: false,
          Twitter: false,
          Vibe_Contact: false,
          VK_Page: false,
          Website: false,
          Work_Email: false,
          Work_Phone: false,
          Zip: false,
          },
          { merge: true }
        )
        .then((res) => {
          let i;

          for (i = 0; i < 4; i++) {
            firebase
        .firestore()
        .collection("Company")
        .doc(this.currentuser.photoURL)
        .collection("Users").doc(this.currentuser.uid).collection("CampsAsso")
        .doc(this.campid)
        .collection("Fields")
        .doc("records")
              .update({
                [Mainheader[i].indicator]: true,
              });
          }
        });
    }
  }

  save1() {
    // this.navCtrl.push(CreateCampaignsLeadPage);
    this.navCtrl.push(ManagerLeadInTrackCampPage, {
      item: this.campid,
    });
  }
}
