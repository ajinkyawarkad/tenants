import { Component, ViewChild } from "@angular/core";
import {NavController,NavParams,AlertController} from "ionic-angular";
import { Slides } from "ionic-angular";
import {FormGroup,FormBuilder,FormControl,Validators,FormArray} from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from "firebase";
import { Observable } from "rxjs";
import { EditCsvFieldPage } from "../edit-csv-field/edit-csv-field";

interface Camps {
name: string;
role: string;
}

interface Status {
status: string;
action: string;
}


@Component({
selector: "page-edit-campaigns-details",
templateUrl: "edit-campaigns-details.html",
})
export class EditCampaignsDetailsPage {
@ViewChild(Slides) slides: Slides;
slideOpts;
public form: FormGroup;
createSuccess = false;
public productsss:any[];
public prod:any;
userInfo: any;
products: Observable<Camps[]>;
productss:any;
pro: any;
proo: any;
sts:any=[];
anArray:any=[];
anArray2:any=[];


product: { cid: ""; name: ""; goals: ""; manager: ""; sr: "" };
value: any;
public statuss: any;

constructor(
private _FB: FormBuilder,
public navCtrl: NavController,
public navParams: NavParams,
private alertCtrl: AlertController,
public afs: AngularFirestore
) {
this.value = navParams.get("product");
console.log("prod",this.value);
}

ionViewDidLoad() {
console.log("ionViewDidLoad EditCampaignsDetailsPage");
let currentuser = firebase.auth().currentUser;

firebase
.firestore()
.collection("Company")
.doc("COM#" + currentuser.uid)
.collection("Admin")
.doc(currentuser.uid)
.onSnapshot((doc) => {
  var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
  console.log(source, " data: ");
  this.productss = doc.data().Managers;
  console.log(this.productss);
});
firebase
.firestore()
.collection("Company")
.doc("COM#" + currentuser.uid + "/" + "Campaigns" + "/" + this.value.cid)
.onSnapshot((doc) => {
var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
console.log(source, " data: ");
this.products = doc.data().status;
this.sts=this.products;

console.log("sts",this.products);

});

firebase.firestore().collection("Company").
doc("COM#" + currentuser.uid + "/" + "Campaigns" + "/" + this.value.cid)
.onSnapshot((doc) => {
    var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    console.log(source, " data: ");
    this.prod = doc.data().SR_name;

    for(var c in this.prod){
      this.anArray.push(this.prod[c])

      this.anArray2.push(this.prod[c])
    }

   
    console.log("sr name",this.anArray);
    });

firebase
.firestore()
.collection("Company")
.doc("COM#" + currentuser.uid)
.collection("Admin")
.doc(currentuser.uid)
.onSnapshot((doc) => {
  var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
  console.log(source, " data: ");
  this.productsss = doc.data().Users;
  for(var i in this.productsss){
    let n = this.productsss[i].name+' '+this.productsss[i].last
    for(var x in this.anArray){
      if(n != this.anArray[x]){
        this.anArray2.push(n)

      }
    }
  }

  console.log("productssss",this.anArray2);

  //console.log("prod in productssss",this.prod);
  
  // for(let i=0;i<this.productsss.length;i++){
   
  //     this.prod.push(this.productsss[i].name+" "+this.productsss[i].last);
  
    
  // }

     // this.productsss.push(this.prod);
  
 

  //console.log("All sr name",this.productsss);

}); 


}

ionViewDidEnter() {
//lock manual swipe for main slider
this.slides.lockSwipeToNext(true);
this.slides.lockSwipeToPrev(true);
}
Add() {
  //this.sts.push({ status: "", action: "" });
  if(this.sts.length < 8)
  {
    this.sts.push({ status: "", action: "" });
  }
  else
  {
    alert("you reached to limit.. ")
  }
}

temp(){
  let campid=this.value.cid
  this.navCtrl.push(EditCsvFieldPage,
    {campid})
}

slideToSlide() {
if (this.slides.getActiveIndex() + 1 === this.slides.length()) {
this.slides.slideTo(0);
} else {
this.slides.lockSwipeToNext(false);
this.slides.slideTo(this.slides.getActiveIndex() + 1);
this.slides.lockSwipeToNext(true);
}
}

slideToPrev() {
if (this.slides.getActiveIndex() + 1 == this.slides.length()) {
this.slides.lockSwipeToPrev(false);
this.slides.slideTo(this.slides.getActiveIndex() - 1);
this.slides.lockSwipeToPrev(true);
}
}


update(data) {
  console.log("Sr selected",data)
let currentuser = firebase.auth().currentUser;

firebase.firestore().collection("Company").doc("COM#" + currentuser.uid + "/" + "Campaigns" + "/" + this.value.cid)
.onSnapshot((doc) => {
var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
console.log(source, " data: ");
this.pro = doc.data().status[0].status;
this.proo = doc.data().status[0].action;
console.log(this.products);
});

firebase
.firestore()
.collection("Company")
.doc("COM#" + currentuser.uid + "/" + "Campaigns" + "/" + this.value.cid).update(
Object.assign({
 name: this.value.name,
 goals: this.value.goals,
 manager: this.value.manager,
 SR_name: data,
 status:this.sts
})
)
.then(() => {
console.log("updated..");
let alert = this.alertCtrl.create({
title: "Sucess",
subTitle: "Campaign Updated Sucessfully ..Now you can update fields",
buttons: [
{
text: "OK",
handler: () => {
  let campid=this.value.cid
  this.navCtrl.push(EditCsvFieldPage,
    {campid})
},
},
],
});
alert.present();
})
.catch((err) => {
console.log(err);
let alert = this.alertCtrl.create({
title: "Error",
subTitle: err,
buttons: [
{
text: "OK",
handler: (data) => {
// this.navCtrl.setRoot(ProfilePage);
},
},
],
});
});
}
}