import { Component } from "@angular/core";
import firebase from "firebase";
import { AlertController, NavController, NavParams } from "ionic-angular";
import { CallDetailsPage } from "../call-details/call-details";
import { EditLeadDetailsPage } from "../edit-lead-details/edit-lead-details";
import { TaskDetailsPage } from "../task-details/task-details";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { LeadInTrackCampPage } from "../lead-in-track-camp/lead-in-track-camp";
import { Lead } from "../../models/user";
import * as $ from "jquery";
import { LoadingController } from "ionic-angular";
import { RemainingLeadDeatilsPage } from "../remaining-lead-deatils/remaining-lead-deatils";
////////////
import * as XLSX from 'xlsx';

interface Users {
  name: string;
  manager: string;
}

@Component({
  selector: "page-leads-details",
  templateUrl: "leads-details.html",
})


export class LeadsDetailsPage {
  p: number = 1;
  public hideMe: boolean = false;
  public hideMe1: boolean = false;
  public hideMe2: boolean = false;
  
  fileName;
  show= false; //table flag ExelTable
  pageSize: number = 10;
  last;
  public first: any = [];
  public prev_strt_at: any = [];
  public pagination_clicked_count = 0;
  public disable_next: boolean = false;
  public disable_prev: boolean = false;
  public itemnumberbypage = 0;

  value: any;
  userInfo: any;
  products: Observable<Users[]>;
  productss: Observable<Users[]>;
  productsss: any;
  prod: any = [];
  public anArray: any = [];
  public det = [];
  public hed = [];
  public array = [];
  tru = [];
  fal = [];
  public leaduid: any;
  public campid: any;
  isItemAvailable = false;
  active = [];
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

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

  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  lead = {} as Lead;
  isIndeterminate: boolean;
  masterCheck: boolean;
  checkedCount: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afs: AngularFirestore,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.value = navParams.get("product");
    console.log(this.value);
    this.campid = this.value.cid;
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


//==================================>Table v/s Export<============================
  exportexcel(){
    this.fileName= this.value.name+'.xlsx';

    let element = document.getElementById('details');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
 
    XLSX.writeFile(wb, this.fileName);
 
  }

  exportcsv() {
    this.fileName= this.value.name+'.csv';
  
    let element = document.getElementById('details');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    XLSX.writeFile(wb, this.fileName);
 
  }


  checkMaster() {
    setTimeout(() => {
      this.hide();
      this.productsss.forEach((obj) => {
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

    this.productsss.map((obj) => {
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

 
  
  insertsr(data) {
    // console.log("i", data.id);
    // console.log("i", data.name);
    let currentuser = firebase.auth().currentUser;
    let i, j;
    for (i = 0; i < this.array.length; i++) {
      firebase
        .firestore()
        .collection("Company")
        .doc("COM#" + currentuser.uid)
        .collection("Campaigns")
        .doc(this.value.cid)
        .collection("leads")
        .doc(this.array[i])
        .update({
          
          SR_name: data.name + " " + data.last,
          SR_id: data.id,
        });
    }
    let alert = this.alertCtrl.create({
      title: "Success",
      subTitle: "added",
      //scope: id,
      buttons: [{ text: "OK", handler: (data) => {} }],
    });
    alert.present();

    // console.log(lead.sr)
  }

  getItems(ev) {
    //  this.prod =[]
    this.productsss = [];
    var val = ev.target.value;
    if (val && val.trim() != "") {
      this.prod = this.prod.filter((item) => {
        console.log("searchh", item);
        return (
          item.first_name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.last_name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.Phone.toLowerCase().indexOf(val.toLowerCase()) > -1
        );
        // item.SR_name.toLowerCase().indexOf(val.toLowerCase()) > -1
        // item.status.toLowerCase().indexOf(val.toLowerCase()) > -1
      });
    }
  }

  ionViewDidLoad() {
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

    console.log("ionViewDidLoad LeadsDetailsPage");

    let currentuser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Company")
      .doc("COM#" + currentuser.uid)
      .collection("Campaigns")
      .doc(this.value.cid)
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
      .doc("COM#" + currentuser.uid)
      .collection("Campaigns")
      .doc(this.value.cid)
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

    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.value.cid)
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
      });

    this.userInfo = this.afs
      .collection("Company")
      .doc("COM#" + currentuser.uid)
      .collection("Admin")
      .doc(currentuser.uid);
    this.productss = this.userInfo.valueChanges().Users;

    firebase
      .firestore()
      .collection("Company")
      .doc("COM#" + currentuser.uid)
      .collection("Admin")
      .doc(currentuser.uid)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        // console.log(source, " data: ");
        this.productss = doc.data().Users;
        // console.log(this.productss);
      });

    //let currentuser=firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Company")
      .doc("COM#" + currentuser.uid)
      .collection("Campaigns")
      .doc(this.value.cid)
      .collection("leads")
      .onSnapshot((snaps) => {
        if (!snaps.docs.length) {
          // console.log("No Data Available");
          alert("No Data Available");
          return false;
        }

        this.det = [];
        this.prod = [];
        snaps.docs.forEach((doc) => {
          this.det.push(doc.data());
          var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          this.prod = this.det;
        });
      });

    let loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading...",
      duration: 2000,
    });
    loading.present();

    firebase
      .firestore()
      .collection("Company")
      .doc("COM#" + currentuser.uid)
      .collection("Campaigns")
      .doc(this.value.cid)
      .collection("leads")
      .limit(this.pageSize)
      .onSnapshot((snaps) => {
        if (!snaps.docs.length) {
          // console.log("No Data Available");
          alert("No Data Available");
          return false;
        }
        loading.dismiss();
        this.hed = [];
        this.productsss = [];
        snaps.docs.forEach((doc) => {
          this.hed.push(doc.data());

          var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          // console.log(source, " data: ", doc.data());
          this.productsss = this.hed;
          // console.log("HHHHHHH", this.productsss);

          this.last = doc;
          this.first = doc;
          // console.log("last", this.last);
        });
      });
    this.prev_strt_at = [];
    this.pagination_clicked_count = 0;
    this.disable_next = false;
    this.disable_prev = false;
    this.itemnumberbypage = 1;

    // Push first item to use for Previous action
    // this.push_prev_startAt(this.first);

    console.log("ionViewDidLoad TrackCampaignPage");
  }

  showhide(name, ev) {
    let currentUser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Company")
      .doc(currentUser.photoURL)
      .collection("Campaigns")
      .doc(this.campid)
      .collection("Fields")
      .doc("records")
      .update({
        [name]: ev.value,
      });
  }

  nextPage(last) {
    this.disable_next = true;
    let currentuser = firebase.auth().currentUser;

    let loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading...",
      duration: 2000,
    });
    loading.present();

    firebase
      .firestore()
      .collection("Company")
      .doc("COM#" + currentuser.uid)
      .collection("Campaigns")
      .doc(this.value.cid)
      .collection("leads")
      .startAfter(last)
      .limit(this.pageSize)
      .onSnapshot((snaps) => {
        if (!snaps.docs.length) {
          // console.log("No Data Available");
          alert("No More Data");
          return false;
        }
        loading.dismiss();
        this.hed = [];
        this.productsss = [];
        snaps.forEach(
          (doc) => {
            this.hed.push(doc.data());
            var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            // console.log(source, " data: ");

            this.productsss = this.hed;
            // console.log("nxt", this.productsss);

            this.last = doc;
            this.first = doc;

            //console.log("first",this.push_prev_startAt)
            this.disable_next = false;
          },
          (error) => {
            this.disable_next = false;
          }
        );
        this.pagination_clicked_count++;
        this.itemnumberbypage * this.pagination_clicked_count;
      });
  }

  prevPage(first) {
    // this.productsss.push(this.first)
    this.disable_prev = true;
    let loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading...",
      duration: 2000,
    });
    loading.present();
    let currentuser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Company")
      .doc("COM#" + currentuser.uid)
      .collection("Campaigns")
      .doc(this.value.cid)
      .collection("leads")
      .endBefore(first)
      .limit(this.pageSize)
      .onSnapshot((snaps) => {
        if (!snaps.docs.length) {
          // console.log("No Data Available");
          alert("No More Data");
          return false;
        }
        loading.dismiss();
        this.hed = [];
        this.productsss = [];
        snaps.forEach(
          (doc) => {
            this.hed.push(doc.data());

            var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            // console.log(source, " data: ");

            this.productsss = this.hed;
            // console.log("prev", this.productsss);
            this.last = doc;
            this.first = doc;

            //Enable buttons again
            this.disable_prev = false;
            this.disable_next = false;
          },
          (error) => {
            this.disable_prev = false;
          }
        );
        this.pagination_clicked_count--;
        this.itemnumberbypage / this.pagination_clicked_count;
      });
  }

  edit(data) {
    let cid = this.value;
    this.navCtrl.push(EditLeadDetailsPage, {
      cid,
      data,
    });
  }
  add() {
    this.navCtrl.push(LeadInTrackCampPage, {
      product: this.value,
    });
  }
  gotocall(data) {
    let cid = this.value;
    this.navCtrl.push(TaskDetailsPage, {
      cid,
      data,
    });
  }
  calldetails(uid) {
    // console.log("campid", this.campid);
    let campid = this.campid;
    this.navCtrl.push(CallDetailsPage, {
      uid,
      campid,
    });
  }

  remaining(data) {
    // console.log("campid", this.campid);

    let campid = this.campid;
    this.navCtrl.push(RemainingLeadDeatilsPage, { data, campid });
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
    this.afs
      .collection("Company")
      .doc(
        "COM#" +
          currentuser.uid +
          "/" +
          "Campaigns" +
          "/" +
          this.value.cid +
          "/" +
          "leads" +
          "/" +
          value1
      )
      .delete();
  }
}
