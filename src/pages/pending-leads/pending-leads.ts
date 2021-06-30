import { Component } from '@angular/core';
import firebase from 'firebase';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-pending-leads',
  templateUrl: 'pending-leads.html',
})
export class PendingLeadsPage {
  mainData=[]
  arr=[];
  cid;
  
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.cid =  this.navParams.get("cid");
  }
 

  ionViewDidLoad() {
    this.arr = this.mainData
    let currentuser  = firebase.auth().currentUser
    console.log(this.cid)

    firebase
    .firestore()
    .collection("Company")
    .doc(currentuser.photoURL)
    .collection("Campaigns")
    .doc(this.cid)
    .collection("leads").where('pending','==',true).onSnapshot((snap)=> {
      snap.docs.forEach(dat => {
        this.mainData.push(dat.data())

      })
    })


    firebase
    .firestore()
    .collection("Company")
    .doc(currentuser.photoURL)
    .collection("Campaigns")
    .doc(this.cid)
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

    console.log('ionViewDidLoad PendingLeadsPage', this.mainData);
  }

}
