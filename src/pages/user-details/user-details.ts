import { Component } from "@angular/core";
import {NavController,NavParams,AlertController,LoadingController,} from "ionic-angular";
import { EditTeamDetailsPage } from "../edit-team-details/edit-team-details";

import { UserlistPage } from "../userlist/userlist";
import { AngularFireAuth } from "@angular/fire/auth";
import "firebase/firestore";
import { Employee, User } from "../../models/user";
import firebase, { firestore } from "firebase";
import { Storage } from "@ionic/storage";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";


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
  userIds = [];
  users: any = [];
  managers: any = [];
 currentuser = firebase.auth().currentUser;

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
    
    this.userInfo = this.afs
      .collection("Company")
      .doc(this.currentuser.photoURL)
      .collection("non-active");
    this.products = this.userInfo.valueChanges();

    firebase
      .firestore()
      .collection("Company")
      .doc(this.currentuser.photoURL)
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
      .doc(this.currentuser.photoURL)
      .collection("Admin")
      .doc(this.currentuser.uid)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
       
        this.managers = doc.data().Managers;
       
      });

    firebase
      .firestore()
      .collection("Company")
      .doc(this.currentuser.photoURL)
      .collection("Admin")
      .doc(this.currentuser.uid)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        this.users = doc.data().Users;
        
      });
  }


  add() {
    this.navCtrl.push(UserlistPage);
  }

  showPopup(value, role) {
    
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
           
            this.deleteItem1(value, role);
            this.deleteItem2(value);
          },
        },
      ],
    });
    alert.present();
  }
  
  deleteItem1(value, role) {
    
    this.afs
      .collection("Company")
      .doc(this.currentuser.photoURL + "/" + "Users" + "/" + value)
      .delete();
      
    switch (role) {
      case "Sale Representative":
     
        for (var i in this.users) {
          if (this.users[i].id == value) {
            this.users.splice(i, 1);
          }
        }
        firebase.firestore().collection("Company").doc(this.currentuser.photoURL).collection("Admin").doc(this.currentuser.uid).update({
          Users:this.users
        })
        break;
      case "Manager":
        for (var i in this.managers) {
          if (this.managers[i].id == value) {
            this.managers.splice(i, 1);
          }
        }
        firebase.firestore().collection("Company").doc(this.currentuser.photoURL).collection("Admin").doc(this.currentuser.uid).update({
          Managers:this.managers
        })
        
        break;
    }
  }

  deleteItem2(value1) {
    
    this.afs
      .collection("Company")
      .doc(this.currentuser.photoURL + "/" + "non-active" + "/" + value1)
      .delete();
  }

 

  edit(product) {
    this.navCtrl.push(EditTeamDetailsPage, {
      product: product,
    });
  }

  async showActive(user: User) {
   
    const events = await firebase
      .firestore()
      .collection("Company")
      .doc(this.currentuser.photoURL)
      .collection("Admin")
      .doc(this.currentuser.uid);
    const dat = await events.get();
    
  }

  dummy() {
    this.storage.get("cuid").then((val) => {
      
      firebase
        .firestore()
        .collection("Company")
        .doc(this.currentuser.photoURL)
        .collection("Admin")
        .doc(this.currentuser.uid)
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
