import { Component } from "@angular/core";
import firebase from "firebase";
import { AlertController, NavController, NavParams } from "ionic-angular";
import { Observable } from "rxjs";
import { Lead } from "../../models/user";
import * as XLSX from "xlsx";

interface Users {
  name: string;
  manager: string;
}

@Component({
  selector: "page-export",
  templateUrl: "export.html",
})
export class ExportPage {
  p: number = 1;
  public hideMe: boolean = false;
  public hideMe1: boolean = false;
  public hideMe2: boolean = false;
  public hideMe3 = false;
  public hideMe4 = true;
  public csvShow = false;
  public exelShow = false;
  currentuser = firebase.auth().currentUser;


  fileName;
  show = false; //table flag ExelTable
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
  Handle;
  Action;
  Follow_Up;
  Status;
  Remark;

  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  lead = {} as Lead;

  isIndeterminate: boolean;
  masterCheck: boolean;
  checkedCount: number;
  pro: [];

  selectedStatus;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.value = navParams.get("campd");
    this.campid = this.value.cid;
   
  }

  ionViewDidLoad() {
    
    firebase
      .firestore()
      .collection("Company")
      .doc(this.currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.campid)
      .get()
      .then((doc) => {
        this.pro = doc.data().status;
      });

    firebase
      .firestore()
      .collection("Company")
      .doc(this.currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.campid)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";

        this.products = doc.data().CSVfield;
        for (var a in this.products) {
          if (this.products[a].indicator !== "None") {
            this.active.push(this.products[a].indicator);
          }
        }
        
      });

    firebase
      .firestore()
      .collection("Company")
      .doc(this.currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.campid)
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
       
      });

    firebase
      .firestore()
      .collection("Company")
      .doc(this.currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.campid)
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

   
  }

  showhide(name, ev) {
   
    firebase
      .firestore()
      .collection("Company")
      .doc(this.currentuser.photoURL)
      .collection("Campaigns")
      .doc(this.campid)
      .collection("Fields")
      .doc("records")
      .update({
        [name]: ev.value,
      });
  }

  showOptions(status) {
    this.filled = [];
    this.selectedStatus = status;

    if (status == "All") {
      firebase
        .firestore()
        .collection("Company")
        .doc(this.currentuser.photoURL)
        .collection("Campaigns")
        .doc(this.campid)
        .collection("leads")
        .get()
        .then((data) => {
          data.docs.forEach((snap) => {
            this.filled.push(snap.data());
          });
        });
    } else {
      firebase
        .firestore()
        .collection("Company")
        .doc(this.currentuser.photoURL)
        .collection("Campaigns")
        .doc(this.campid)
        .collection("leads")
        .where("status", "==", status)
        .get()
        .then((data) => {
          data.docs.forEach((snap) => {
            this.filled.push(snap.data());
          });
        });
    }
    this.csvShow = true;
    this.exelShow = true;

  }

  downloadCsv() {
    this.fileName = this.value.name + ".csv";

    let element = document.getElementById("details");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, this.fileName);
  }

  downloadExel() {
    this.fileName = this.value.name + ".xlsx";

    let element = document.getElementById("details");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, this.fileName);
  }
}
