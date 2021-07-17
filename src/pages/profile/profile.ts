import { Component } from "@angular/core";
import { AlertController, NavController, NavParams } from "ionic-angular";

import { Storage } from "@ionic/storage";

import { User } from "../../models/user";
import { LoginPage } from "../login/login";
import { Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase";

@Component({
  selector: "page-profile",
  templateUrl: "profile.html",
})
export class ProfilePage {
  public name: any;
  public email: any;
  public phoneno: any;
  company_name: any;
  cuid: any;
  currentuser=firebase.auth().currentUser;

  //public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  user = {} as User;
  userInfo: any;
  products: any;

  constructor(
    public auth: AngularFireAuth,
    public navCtrl: NavController,
    private storage: Storage,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
    this.storage.get("name").then((name) => {
     
      this.name = name;
    });
    this.storage.get("email").then((email) => {
     
      this.email = email;
    });
    this.storage.get("cuid").then((cuid) => {
     
      this.cuid = cuid;
    });
  }

  ionViewDidEnter() {
   
    firebase.firestore().collection("Company").doc(this.currentuser.photoURL).collection("Admin")
    .doc(this.currentuser.uid).get().then(doc =>{   
     this.phoneno= doc.data().phoneno
    })

  }

  updateprofile(user: User) {
    firebase.auth().onAuthStateChanged((data) => {
      let currentuser = firebase.auth().currentUser;

      currentuser
        .updateProfile({
          displayName: this.name,
          //photoURL: currentuser.photoURL,
        })
        .then(() => {
          
          let alert = this.alertCtrl.create({
            title: "Sucess",
            subTitle: "Updated Sucessfully",
            buttons: [
              {
                text: "OK",
                handler: (data) => {
                  // this.navCtrl.setRoot(ProfilePage);
                },
              },
            ],
          });
          alert.present();
        })
        .catch((err) => {
         
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
      currentuser.updateEmail(this.email);

      firebase
        .firestore()
        .collection("Company")
        .doc(currentuser.photoURL)
        .collection("Admin")
        .doc(currentuser.uid)
        .update(
          Object.assign({
            name: this.name,
            email: this.email,
           // uid: currentuser.uid,
           // company_id: currentuser.photoURL,
            phoneno: this.phoneno,
            //company_name: this.company_name,
           // role: "Admin",
          })
        );
    });
  }


  ResetPassword() {
    let alert = this.alertCtrl.create({
      title: "Reset Password",
      inputs: [{ name: "email", placeholder: "Email" }],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
         
        },
        {
          text: "Reset Password",
          handler: (data) => {
            if (data.email) {
             
              const result = this.auth.auth.sendPasswordResetEmail(data.email);
              if (result) {
                
                let alert = this.alertCtrl.create({
                  title: "Success",
                  subTitle:
                    "Check Your Email For Reset Link to Change Password",
                  buttons: [
                    {
                      text: "OK",
                      handler: (data) => {
                        this.navCtrl.setRoot(ProfilePage);
                      },
                    },
                  ],
                });
                alert.present();
              } else {
               
                let alert = this.alertCtrl.create({
                  title: "Error",
                  subTitle:
                    "Failed to send reset Link ,please check your Email",
                  buttons: [
                    {
                      text: "OK",
                      handler: (data) => {
                        this.navCtrl.setRoot(ProfilePage);
                      },
                    },
                  ],
                });
                alert.present();
              }
            } else {
              return false;
            }
          },
        },
      ],
    });
    alert.present();
  }
}
