import { Component } from "@angular/core";
import firebase from "firebase";
import { AlertController, NavController, NavParams } from "ionic-angular";
import { CallDetailsPage } from "../call-details/call-details";
import { EditLeadDetailsPage } from "../edit-lead-details/edit-lead-details";
import { ExportPage } from "../export/export";
import { TaskDetailsPage } from "../task-details/task-details";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { LeadInTrackCampPage } from "../lead-in-track-camp/lead-in-track-camp";
import { Lead } from "../../models/user";
import * as $ from "jquery";
import { LoadingController } from "ionic-angular";
import { RemainingLeadDeatilsPage } from "../remaining-lead-deatils/remaining-lead-deatils";
import * as XLSX from "xlsx";

interface Users {
  name: string;
  manager: string;
}

@Component({
  selector: "page-leads-details",
  templateUrl: "leads-details.html",
})
export class LeadsDetailsPage {
  public page: number = 10;
  public hideMe: boolean = false;
  public hideMe1: boolean = false;
  public hideMe2: boolean = false;
  public hideMe3 = false;
  public hideMe4 = true;
  public csvShow = false;
  public exelShow = false;
  mainField;

  fileName;
  show = false; //table flag ExelTable
  public pageSize: number = 10;
  last;
  public first: any = [];
  public prev_strt_at: any = [];
  public pagination_clicked_count = 0;
  public disable_next: boolean = false;
  public disable_prev: boolean = false;
  public itemnumberbypage = 0;
  selSts;

  value: any;
  userInfo: any;
  products: Observable<Users[]>;
  productss: Observable<Users[]>;
  productsss: any;
  prod = [];
  public anArray: any = [];
  public det = [];
  public hed = [];
  public array = [];
  public filtered = [];

  tru = [];
  fal = [];
  public leaduid: any;
  public campid: any;
  isItemAvailable = false;
  active = [];
  filled = [];
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
  Corporate_Website;
  Facebook;
  Facebook_Page;
  Home;
  Home_Phone;
  Live_Chat;
  LiveJournal;
  Mobile;
  Newsletter_Email;
  Opportunity;
  Personal_Page;
  Responsible_Person;
  Skype;
  Source;
  Telegram_Account;
  Twitter;
  Vibe_Contact;
  VK_Page;
  Website;
  Work_Email;
  Work_Phone;

  //=============
  Handler;
  Action;
  Follow_Up;
  Status;
  Remark;

  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  lead = {} as Lead;
  isIndeterminate: boolean;
  masterCheck: boolean;
  checkedCount: number;
  pro: any = [];

  selectedStatus;

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
    if (this.array.length == null) {
      this.hideMe = false;
    } else {
      this.hideMe = true;
    }
  }
  hide1() {
    this.hideMe1 = !this.hideMe1;
  }
  hide2() {
    this.hideMe2 = !this.hideMe2;
  }

  hide3() {
    this.hideMe3 = !this.hideMe3;
  }
  hide4() {
    this.hideMe4 = true;
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
          .doc(this.value.cid)
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

  showOptions(val) {
    this.selSts = status;

    this.productsss = [];
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
        .doc(this.campid)
        .collection("leads")
        .limit(this.pageSize)
        .onSnapshot((snaps) => {
          if (!snaps.docs.length) {
            // console.log("No Data Available");
            alert("No Data Available");
            return false;
          }
          this.productsss = [];
          this.filled = [];

          snaps.docs.forEach((doc) => {
            this.filled.push(doc.data());
          });
          this.productsss = this.filled;
        });
      this.productsss = this.filled;
    } else {
      switch (this.mainField) {
        case "Handler":
          firebase
            .firestore()
            .collection("Company")
            .doc(currentuser.photoURL)
            .collection("Campaigns")
            .doc(this.campid)
            .collection("leads")
            .where("SR_name", "==", val)
            .get()
            .then((data) => {
              data.docs.forEach((snap) => {
                this.filled.push(snap.data());
              });
            });
          this.productsss = this.filled;
          break;

        case "Action":
          firebase
            .firestore()
            .collection("Company")
            .doc(currentuser.photoURL)
            .collection("Campaigns")
            .doc(this.campid)
            .collection("leads")
            .where("action", "==", val)
            .get()
            .then((data) => {
              data.docs.forEach((snap) => {
                this.filled.push(snap.data());
              });
            });
          this.productsss = this.filled;
          break;

        case "Status":
          firebase
            .firestore()
            .collection("Company")
            .doc(currentuser.photoURL)
            .collection("Campaigns")
            .doc(this.campid)
            .collection("leads")
            .where("status", "==", val)
            .get()
            .then((data) => {
              data.docs.forEach((snap) => {
                this.filled.push(snap.data());
              });
            });
          this.productsss = this.filled;
          break;
      }
    }
    this.csvShow = true;
    this.exelShow = true;
  }

  downloadCsv() {
    if ((this.filtered = [])) {
      let currentuser = firebase.auth().currentUser;
      this.selectedStatus = status;

      if (this.selSts == "All") {
        firebase
          .firestore()
          .collection("Company")
          .doc(currentuser.photoURL)
          .collection("Campaigns")
          .doc(this.campid)
          .collection("leads")
          .get()
          .then((data) => {
            data.docs.forEach((snap) => {
              this.filtered.push(snap.data());
            });
          });
        console.log("filtered00", this.filtered);
      } else {
        firebase
          .firestore()
          .collection("Company")
          .doc(currentuser.photoURL)
          .collection("Campaigns")
          .doc(this.campid)
          .collection("leads")
          .where("status", "==", this.selSts)
          .get()
          .then((data) => {
            data.docs.forEach((snap) => {
              this.filtered.push(snap.data());
            });
          });
        console.log("filtered00", this.filtered);
      }
    } else {
      console.log("blanks0");
    }

    this.fileName = this.value.name + ".csv";

    let element = document.getElementById("details");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, this.fileName);

    console.log("filtered", this.filtered);
  }

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
          // if(this.checkedCount == 0){
          //   this.hideMe = false

          // }else{
          //   this.hideMe = true
          // }
          console.log("HideMe", this.hideMe);
        }
        if (obj.isChecked == false) {
          var index = this.array.indexOf(obj.uid);
          if (index !== -1) {
            this.array.splice(index, 1);
          }
          // console.log(this.array);
          // console.log(this.array.length);
          // console.log("count", this.checkedCount);
          // if(this.checkedCount == 0){
          //   this.hideMe = false

          // }else{
          //   this.hideMe = true
          // }
          console.log("HideMe", this.hideMe);
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
        .doc(this.value.cid)
        .collection("leads")
        .doc(this.array[i])
        .update({
          SR_id: dataa.id,
          SR_name: dataa.name,
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

  getItems(ev) {
    // this.prod =[]
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

    console.log("ionViewDidLoad LeadsDetailsPage");

    let currentuser = firebase.auth().currentUser;

    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
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
      .doc(currentuser.photoURL)
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

        // this.tru.push("Handler")
        // this.tru.push("Action")
        // this.tru.push("Follow_Up")
        // this.tru.push("Status")
        // this.tru.push("Remark")

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
          (this.middle_name = res.data().middle_name),
          (this.Corporate_Website = res.data().Corporate_Website),
          (this.Facebook = res.data().Facebook),
          (this.Facebook_Page = res.data().Facebook_Page),
          (this.Home = res.data().Home),
          (this.Home_Phone = res.data().Home_Phone),
          (this.Live_Chat = res.data().Live_Chat),
          (this.LiveJournal = res.data().LiveJournal),
          (this.Mobile = res.data().Mobile),
          (this.Newsletter_Email = res.data().Newsletter_Email),
          (this.Opportunity = res.data().Opportunity),
          (this.Personal_Page = res.data().Personal_Page),
          (this.Responsible_Person = res.data().Responsible_Person),
          (this.Skype = res.data().Skype),
          (this.Source = res.data().Source),
          (this.Telegram_Account = res.data().Telegram_Account),
          (this.Twitter = res.data().Twitter),
          (this.Vibe_Contact = res.data().Vibe_Contact),
          (this.VK_Page = res.data().VK_Page),
          (this.Website = res.data().Website),
          (this.Work_Email = res.data().Work_Email),
          (this.Work_Phone = res.data().Work_Phone);

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

    //let currentuser=firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
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
    //loading.present();
    //>...............................................................................<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.value.cid)
      .collection("leads")
      //.orderBy('datetime')
      .limit(this.pageSize)
      .onSnapshot((snaps) => {
        if (!snaps.docs.length) {
          firebase
            .firestore()
            .collection("Company")
            .doc(currentuser.photoURL)
            .collection("Campaigns")
            .doc(this.value.cid)
            .collection("leads")
            .limit(10)
            .onSnapshot((snaps) => {
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
          // console.log("No Data Available");

          return false;
        }
        // loading.dismiss();
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

    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.value.cid)
      .collection("leads")
      //.orderBy('datetime')
      .limit(this.pageSize)
      .onSnapshot((snaps) => {
        if (!snaps.docs.length) {
          firebase
            .firestore()
            .collection("Company")
            .doc(currentuser.photoURL)
            .collection("Campaigns")
            .doc(this.value.cid)
            .collection("leads")
            .limit(10)
            .onSnapshot((snaps) => {
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
          // console.log("No Data Available");

          return false;
        }
        // loading.dismiss();
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

  SelectedPageSize(data) {
    this.page = parseInt(<string>data);
    //alert(typeof(page));

    let currentuser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.value.cid)
      .collection("leads")
      //.orderBy("datetime")
      .limit(this.page)
      .onSnapshot((snaps) => {
        if (!snaps.docs.length) {
          firebase
            .firestore()
            .collection("Company")
            .doc(currentuser.photoURL)
            .collection("Campaigns")
            .doc(this.value.cid)
            .collection("leads")
            .limit(this.page)
            .onSnapshot((snaps) => {
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
          // console.log("No Data Available");

          return false;
        }
        // loading.dismiss();
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
      .doc(currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.value.cid)
      .collection("leads")
      .startAfter(last)

      .limit(this.page)
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
      .doc(currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.value.cid)
      .collection("leads")
      .endBefore(first)
      .limit(this.page)
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
    let cid = this.value.cid;
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
    let cid = this.campid;
    this.navCtrl.push(TaskDetailsPage, {
      cid,
      data,
    });
  }

  remaining(data) {
    let cid = this.campid;
    this.navCtrl.push(RemainingLeadDeatilsPage, { data, cid });
  }

  calldetails(uid) {
    // console.log("campid", this.campid);
    let campid = this.campid;
    this.navCtrl.push(CallDetailsPage, {
      uid,
      campid,
    });
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
        currentuser.photoURL +
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
