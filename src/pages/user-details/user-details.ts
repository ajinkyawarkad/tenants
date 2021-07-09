import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  LoadingController,
} from "ionic-angular";
import { EditTeamDetailsPage } from "../edit-team-details/edit-team-details";
import { UserLicensesPage } from "../user-licenses/user-licenses";

import { UserlistPage } from "../userlist/userlist";
import { AngularFireAuth } from "@angular/fire/auth";
import "firebase/firestore";
import { Employee, User } from "../../models/user";
import firebase, { firestore } from "firebase";
import { Storage } from "@ionic/storage";

import { AngularFirestore } from "@angular/fire/firestore";

import { Observable } from "rxjs";
// import { merge } from 'jquery';
import { uuid } from "uuidv4";
import { identifierModuleUrl } from "@angular/compiler";

interface Users {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

@Component({
  selector: "page-user-details",
  templateUrl: "user-details.html",
})
export class UserDetailsPage {
  employee = {} as Employee;

  userInfo: any;
  products: Observable<Users[]>;
  productss: any = [];
  Segments: string;
  // isAdmin = true
  userIds = [];
  users: any = [];
  managers: any = [];

  constructor(
    public navCtrl: NavController,
    public afs: AngularFirestore,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public navParams: NavParams,
    private auth: AngularFireAuth,
    public alertCtrl: AlertController
  ) {
    this.Segments = "1";
  }

  ionViewWillLoad() {
    let currentuser = firebase.auth().currentUser;
    this.userInfo = this.afs
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("non-active");
    this.products = this.userInfo.valueChanges();

    // this.userInfo = this.afs
    //   .collection("Company")
    //   .doc(currentuser.photoURL)
    //   .collection("Users");
    // this.productss = this.userInfo.valueChanges();
    // console.log(this.productss)
    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Users")
      .onSnapshot((snap) => {
        this.productss = [];
        snap.docs.forEach((dat) => {
          this.productss.push(dat.data());
          this.userIds.push(dat.data().id);
        });
      });

    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Admin")
      .doc(currentuser.uid)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ");
        this.managers = doc.data().Managers;
        console.log("Usersfrom Firebase", this.managers);
      });

    firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Admin")
      .doc(currentuser.uid)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: ");
        this.users = doc.data().Users;
        console.log("Usersfrom Firebase", this.users);
      });
  }

  // makeAdmin(id){
  //   let currentuser = firebase.auth().currentUser;
  //   let a = this.userIds.indexOf(id);
  //   console.log("data",a, this.productss[a].isAdmin )
  //   let f = this.productss[a].isAdmin

  //   if(f){
  //     firebase
  //     .firestore()
  //     .collection("Company")
  //     .doc(currentuser.photoURL)
  //     .collection("Users").doc(id).update({
  //       isAdmin:false

  //     })
  //   }else{
  //     firebase
  //     .firestore()
  //     .collection("Company")
  //     .doc(currentuser.photoURL)
  //     .collection("Users").doc(id).update({
  //       isAdmin:true

  //     })

  //   }

  //   console.log("For Admin",id)
  //   firebase
  //   .firestore()
  //   .collection("Company")
  //   .doc(currentuser.photoURL)
  //   .collection("secAdmins").doc("userIds").update({
  //     ids:firestore.FieldValue.arrayUnion(
  //       id
  //     )
  //   })

  // }

  add() {
    this.navCtrl.push(UserlistPage);
  }

  showPopup(value, role) {
    console.log("value", value, role);
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
            console.log(value);
            this.deleteItem1(value, role);
            this.deleteItem2(value);
          },
        },
      ],
    });
    alert.present();
  }
  
  deleteItem1(value, role) {
    let currentuser = firebase.auth().currentUser;
    this.afs
      .collection("Company")
      .doc(currentuser.photoURL + "/" + "Users" + "/" + value)
      .delete();
    switch (role) {
      case "Sale Representative":
     
        for (var i in this.users) {
          if (this.users[i].id == value) {
            this.users.splice(i, 1);
          }
        }
        firebase.firestore().collection("Company").doc(currentuser.photoURL).collection("Admin").doc(currentuser.uid).update({
          Users:this.users
        })
        break;
      case "Manager":
        for (var i in this.managers) {
          if (this.managers[i].id == value) {
            this.managers.splice(i, 1);
          }
        }
        firebase.firestore().collection("Company").doc(currentuser.photoURL).collection("Admin").doc(currentuser.uid).update({
          Managers:this.managers
        })
        
        break;
    }
  }

  deleteItem2(value1) {
    console.log("id", value1);
    let currentuser = firebase.auth().currentUser;
    this.afs
      .collection("Company")
      .doc(currentuser.photoURL + "/" + "non-active" + "/" + value1)
      .delete();
  }

  userlicense() {
    this.navCtrl.push(UserLicensesPage);
  }

  edit(product) {
    this.navCtrl.push(EditTeamDetailsPage, {
      product: product,
    });
  }

  async showActive(user: User) {
    let currentuser = firebase.auth().currentUser;
    const events = await firebase
      .firestore()
      .collection("Company")
      .doc(currentuser.photoURL)
      .collection("Admin")
      .doc(currentuser.uid);
    const dat = await events.get();
    if (!dat.exists) {
      console.log("No such document!");
    } else {
      console.log("Document data:", dat.data());
    }
  }

  dummy() {
    this.storage.get("cuid").then((val) => {
      //console.log('id is', val);
      let currentUser = firebase.auth().currentUser;
      firebase
        .firestore()
        .collection("Company")
        .doc(currentUser.photoURL)
        .collection("Admin")
        .doc(currentUser.uid)
        .update({
          users: {
            [this.employee.name]: {
              name: this.employee.name,
              role: this.employee.role,
            },
          },
        });
    });
  }
}
