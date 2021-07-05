import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { EditLeadDetailsPage } from '../edit-lead-details/edit-lead-details';
import { RemainingLeadDeatilsPage } from '../remaining-lead-deatils/remaining-lead-deatils';
import { TaskDetailsPage } from '../task-details/task-details';
import { Lead } from "../../models/user";
import { ExportPage } from '../export/export';
import * as $ from "jquery";
import { Observable } from "rxjs";

@Component({
  selector: 'page-pending-leads',
  templateUrl: 'pending-leads.html',
})
export class PendingLeadsPage {
  mainData=[]
  arr=[];
  products: Observable<any[]>;
  productss: Observable<any[]>;
  userInfo: any;
  public pageSize: number = 10;
  last;
  selSts;
  public hideMe: boolean = false;
  public hideMe1: boolean = false;
  public hideMe2: boolean = false;
  public hideMe3 = false;
  public csvShow = false;
  public exelShow = false;
  mainField;

  fileName;
  show = false; //table flag ExelTable

  l//lead = {} as Lead;
  isIndeterminate: boolean;
  masterCheck: boolean;
  checkedCount: number;
  pro: any = [];
  value;

  selectedStatus;
  public filtered = [];

  tru = [];
  fal = [];
  isItemAvailable = false;
  active = [];
  filled = [];
  public anArray: any = [];
  public array = [];
  
  Id;
  Salutation;
  first_name;
  middle_name;
  last_name;
  Full_Name;
  Phone;
  Other_Contact;
  Email;
  Other_Email;
  Address;
  City;
  State;
  Country;
  Gender;
  Company_Name;
  Position;
  Profile_URL;
  Date_of_Birth;
  Apartment;
  Zip;
  Fax;
  Price;
  Stage;
  Quality;
  Currency;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController,
    public afs: AngularFirestore) {
    this.value =  this.navParams.get("cid");
    console.log("camp id in pendimg",this.value)
  }
 

  ionViewDidLoad() {

    let currentuser = firebase.auth().currentUser;

    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.value)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";

        this.products = doc.data().CSVfield;
        for (var a in this.products) {
          if (this.products[a].indicator !== "None") {
            this.active.push(this.products[a].indicator);
          }
        }

        // console.log("active headers",this.active)
      });

    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.value)
      .collection("Fields")
      .doc("records")
      .onSnapshot((res) => {
        let a: any = [];
        a = res.data();
        this.tru = [];
        this.fal = [];

        let k = Object.keys(a);
        let v = Object.values(a);

        for (var i in k) {
          if (k[i] !== "None") {
            if (v[i] == true) {
              this.tru.push(k[i]);
            } else {
              for (var e in this.active) {
                if (this.active[e] == k[i]) {
                  this.fal.push(k[i]);
                }
              }
            }
          }
        }

        console.log("True at : ", this.tru);
        console.log("false at : ", this.fal);
      });






    function closeForm() {
      $(".form-popup-bg").removeClass("is-visible");
    }

    $(document).ready(function ($) {
      /* Contact Form Interactions */
      $("#btnOpenForm").on("click", function (event) {
        event.preventDefault();

        $(".form-popup-bg").addClass("is-visible");
      });

      //close popup when clicking x or off popup
      $(".form-popup-bg").on("click", function (event) {
        if (
          $(event.target).is(".form-popup-bg") ||
          $(event.target).is("#btnCloseForm")
        ) {
          event.preventDefault();
          $(this).removeClass("is-visible");
        }
      });
    });

    $("#fixed-form-container .body").hide();
    $("#fixed-form-container .button").click(function () {
      $(this).next("#fixed-form-container div").slideToggle(400);
      $(this).toggleClass("expanded");
    });

    //this.filter.status = "Select"
    $(document).on("change", "table thead input", function () {
      var checked = $(this).is(":checked");
      //var checkedValue = $('.messageCheckbox:checked').eq(index);
      // console.log("checkedValue", checked);
      var index = $(this).parent().index();
      $("table tr").each(function () {
        if (checked) {
          $(this).find("td").eq(index).show();
          $(this).find("th").eq(index).show();
        } else {
          $(this).find("td").eq(index).hide();
          $(this).find("th").eq(index).hide();
        }
      });
    });

  
    this.arr = this.mainData
   
    console.log(this.value)

    firebase
    .firestore()
    .collection("Company")
    .doc(currentuser.photoURL)
    .collection("Campaigns")
    .doc(this.value)
    .collection("leads").where('pending','==',true).onSnapshot((snap)=> {
      this.mainData = []
      snap.docs.forEach(dat => {
        this.mainData.push(dat.data())

      })
    })


    firebase
    .firestore()
    .collection("Company")
    .doc(currentuser.photoURL)
    .collection("Campaigns")
    .doc(this.value)
    .collection("Fields")
    .doc("records")
    .onSnapshot((res) => {
      (this.Address = res.data().Address),
        (this.Apartment = res.data().Apartment),
        (this.City = res.data().City),
        (this.Company_Name = res.data().Company_Name),
        (this.Country = res.data().Country),
        (this.Currency = res.data().Currency),
        (this.Date_of_Birth = res.data().Date_of_Birth),
        (this.Email = res.data().Email),
        (this.Fax = res.data().Fax),
        (this.Full_Name = res.data().Full_Name),
        (this.Gender = res.data().Gender),
        (this.Id = res.data().Id),
        (this.Other_Contact = res.data().Other_Contact),
        (this.Other_Email = res.data().Other_Email),
        (this.Phone = res.data().Phone),
        (this.Position = res.data().Position),
        (this.Profile_URL = res.data().Profile_URL),
        (this.Quality = res.data().Quality),
        (this.Salutation = res.data().Salutation),
        (this.Stage = res.data().Stage),
        (this.State = res.data().State),
        (this.Price = res.data().Price),
        (this.Zip = res.data().Zip),
        (this.first_name = res.data().first_name),
        (this.last_name = res.data().last_name),
        (this.middle_name = res.data().middle_name);

      //==========
    });

    this.userInfo = this.afs
    .collection("Company")
    .doc(currentuser.photoURL)
    .collection("Admin")
    .doc(currentuser.uid);
  this.productss = this.userInfo.valueChanges().Users;

  firebase
    .firestore()
    .collection("Company")
    .doc(currentuser.photoURL)
    .collection("Admin")
    .doc(currentuser.uid)
    .onSnapshot((doc) => {
      var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      // console.log(source, " data: ");
      this.productss = doc.data().Users;
      // console.log(this.productss);
    });


    console.log('ionViewDidLoad PendingLeadsPage', this.mainData);
  }
  hide() {
    this.hideMe = true;
  }
  hide1() {
    this.hideMe1 = true;
  }
  hide2() {
    this.hideMe2 = !this.hideMe2;
  }

  hide3() {
    this.hideMe3 = !this.hideMe3;
  }
  // hide4() {
  //   this.hideMe4 = true;
  // }

  checkMaster() {
    setTimeout(() => {
      this.hide();
      this.mainData.forEach((obj) => {
        obj.isChecked = this.masterCheck;
        // console.log(obj.isChecked);

        if (obj.isChecked == true && this.array.includes(obj.uid) === false) {
          this.array.push(obj.uid);
          // console.log(this.array);
          this.checkedCount = this.array.length;
          // console.log("count", this.checkedCount);
        }
        if (obj.isChecked == false) {
          var index = this.array.indexOf(obj.uid);
          if (index !== -1) {
            this.array.splice(index, 1);
          }
          // console.log(this.array);
          // console.log(this.array.length);
          // console.log("count", this.checkedCount);
        }
      });
    });
  }

  checkEvent(lead: Lead) {
    this.hide();
    let checked = 0;

    this.mainData.map((obj) => {
      // console.log(obj.isChecked);
      checked++;
      if (obj.isChecked == true && this.array.includes(obj.uid) === false) {
        this.array.push(obj.uid);
        // console.log(this.array);
        this.checkedCount = this.array.length;
      }
      if (obj.isChecked == false) {
        var index = this.array.indexOf(obj.uid);
        if (index !== -1) {
          this.array.splice(index, 1);
        }
        // console.log(this.array);
        this.checkedCount = this.array.length;
        // console.log("count", this.checkedCount);
      }
    });
  }

  insertsr(dataa) {
    console.log("iasa", dataa);
   
    let currentuser = firebase.auth().currentUser;
    console.log("AAAAA", this.array);
    let i, j;
    for (i = 0; i < this.array.length; i++) {
      firebase
        .firestore()
        .collection("Company")
        .doc(currentuser.photoURL)
        .collection("Campaigns")
        .doc(this.value)
        .collection("leads")
        .doc(this.array[i])
        .update({
          SR_id: dataa.id,
          SR_name: dataa.name ,
        });
    }
    let alert = this.alertCtrl.create({
      title: "Success",
      subTitle: "Handler added Successfully",
      //scope: id,
      buttons: [{ text: "OK", handler: (data) => {} }],
    });
    alert.present();
  }
  showPopup(value) {
    let alert = this.alertCtrl.create({
      title: "Confirm Delete",
      subTitle: "Do you really want to delete?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "OK",

          handler: (data) => {
            // console.log(value);
            this.deleteItem1(value);
          },
        },
      ],
    });
    alert.present();
  }

  deleteItem1(value1) {
    let currentuser = firebase.auth().currentUser;
    this.afs.collection("Company").doc( currentuser.photoURL + "/" + "Campaigns" + "/" +this.value + "/" + "leads" + "/" + value1)
      .delete();
  }

  setField(field) {
    this.pro = [];
    let currentuser = firebase.auth().currentUser;

    this.mainField = field;
    switch (this.mainField) {
      case "Status":
        let test1 = [];
        firebase
          .firestore()
          .collection("Company")
          .doc(currentuser.photoURL)
          .collection("Campaigns")
          .doc(this.value)
          .get()
          .then((doc) => {
            test1 = doc.data().status;
            for (var i in test1) {
              this.pro.push(test1[i].status);
            }
            console.log(this.pro);
          });
        break;

      case "Handler":
        let test = [];
        firebase
          .firestore()
          .collection("Company")
          .doc(currentuser.photoURL)
          .collection("Admin")
          .doc(currentuser.uid)
          .get()
          .then((doc) => {
            test = doc.data().Users;
            for (var i in test) {
              let nam = test[i].name;
              let name = nam;
              this.pro.push(name);
            }
            console.log(this.pro);
          });
        break;

      case "Action":
        this.pro[0] = "Schedule Meet";
        this.pro[1] = "Callback";
        this.pro[2] = "Send Mail";
        this.pro[3] = "None";
        break;
    }
  }

  showhide(name, ev) {
    let currentUser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Company")
      .doc(currentUser.photoURL)
      .collection("Campaigns")
      .doc(this.value)
      .collection("Fields")
      .doc("records")
      .update({
        [name]: ev.value,
      });
  }


  showOptions(val) {
    this.selSts = status;

    this.mainData = [];
    this.filled = [];
    this.filtered = [];
    

    let currentuser = firebase.auth().currentUser;
    this.selectedStatus = status;

    if (status == "All") {
      firebase
        .firestore()
        .collection("Company")
        .doc(currentuser.photoURL)
        .collection("Campaigns")
        .doc(this.value)
        .collection("leads")
        .limit(this.pageSize)
        .onSnapshot((snaps) => {
          if (!snaps.docs.length) {
            // console.log("No Data Available");
            alert("No Data Available");
            return false;
          }
          this.mainData = [];
          this.filled = [];

          snaps.docs.forEach((doc) => {
            this.filled.push(doc.data());
          });
          this.mainData = this.filled;
        });
      this.mainData = this.filled;
    } else {
      switch (this.mainField) {
        case "Handler":
          firebase
            .firestore()
            .collection("Company")
            .doc(currentuser.photoURL)
            .collection("Campaigns")
            .doc(this.value)
            .collection("leads")
            .where("SR_name", "==", val)
            .get()
            .then((data) => {
              data.docs.forEach((snap) => {
                this.filled.push(snap.data());
              });
            });
          this.mainData = this.filled;
          break;

        case "Action":
          firebase
            .firestore()
            .collection("Company")
            .doc(currentuser.photoURL)
            .collection("Campaigns")
            .doc(this.value)
            .collection("leads")
            .where("action", "==", val)
            .get()
            .then((data) => {
              data.docs.forEach((snap) => {
                this.filled.push(snap.data());
              });
            });
          this.mainData = this.filled;
          break;

        case "Status":
          firebase
            .firestore()
            .collection("Company")
            .doc(currentuser.photoURL)
            .collection("Campaigns")
            .doc(this.value)
            .collection("leads")
            .where("status", "==", val)
            .get()
            .then((data) => {
              data.docs.forEach((snap) => {
                this.filled.push(snap.data());
              });
            });
          this.mainData = this.filled;
          break;
      }
    }
    this.csvShow = true;
    this.exelShow = true;
  }

  // downloadCsv() {
  //   if ((this.filtered = [])) {
  //     let currentuser = firebase.auth().currentUser;
  //     this.selectedStatus = status;

  //     if (this.selSts == "All") {
  //       firebase
  //         .firestore()
  //         .collection("Company")
  //         .doc(currentuser.photoURL)
  //         .collection("Campaigns")
  //         .doc(this.cid)
  //         .collection("leads")
  //         .get()
  //         .then((data) => {
  //           data.docs.forEach((snap) => {
  //             this.filtered.push(snap.data());
  //           });
  //         });
  //       console.log("filtered00", this.filtered);
  //     } else {
  //       firebase
  //         .firestore()
  //         .collection("Company")
  //         .doc(currentuser.photoURL)
  //         .collection("Campaigns")
  //         .doc(this.campid)
  //         .collection("leads")
  //         .where("status", "==", this.selSts)
  //         .get()
  //         .then((data) => {
  //           data.docs.forEach((snap) => {
  //             this.filtered.push(snap.data());
  //           });
  //         });
  //       console.log("filtered00", this.filtered);
  //     }
  //   } else {
  //     console.log("blanks0");
  //   }

  //   this.fileName = this.value.name + ".csv";

  //   let element = document.getElementById("details");
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  //   XLSX.writeFile(wb, this.fileName);

  //   console.log("filtered", this.filtered);
  // }

  //==================================>Table v/s Export<============================
  showDownload() {
    // if( this.hideMe3 == false){
    // this.hideMe3 = true
    // }else{
    // this.hideMe3 = false
    // }
    // ;
    this.navCtrl.push(ExportPage, {
      campd: this.value,
    });
  }
  // getItems(ev) {
  //   // this.prod =[]
  //   this.mainData = [];
  //   var val = ev.target.value;
  //   if (val && val.trim() != "") {
  //     this.prod = this.prod.filter((item) => {
  //       console.log("searchh", item);
  //       return (
  //         item.first_name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
  //         item.last_name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
  //         item.Phone.toLowerCase().indexOf(val.toLowerCase()) > -1
  //       );
  //       // item.SR_name.toLowerCase().indexOf(val.toLowerCase()) > -1
  //       // item.status.toLowerCase().indexOf(val.toLowerCase()) > -1
  //     });
  //   }
  //}

  edit(data) {
    let cid = this.value;
    console.log("edit pagee",cid)
    this.navCtrl.push(EditLeadDetailsPage, {
      cid,
      data,
    });
  }
  gotocall(data) {
    let cid = this.value;
    this.navCtrl.push(TaskDetailsPage, {
      cid,
      data,
    });
  }

  remaining(data) {
    let cid = this.value;
    this.navCtrl.push(RemainingLeadDeatilsPage, { data, cid });
  }

}
