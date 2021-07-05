import { Component } from "@angular/core";
import {
  MenuController,
  NavController,
  NavParams,
  AlertController,
} from "ionic-angular";
import { User } from "../../models/user";

import { HomePage } from "../home/home";
import { HomeManagerPage } from "../home-manager/home-manager";
import { RegisterPage } from "../register/register";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase";

import { Storage } from "@ionic/storage";
import { HomeUserPage } from "../home-user/home-user";

@Component({
  selector: "page-login",
  templateUrl: "login.html",
})
export class LoginPage {
  public showPassword: boolean = false;

  user = {} as User;
  phone: string;
  coms = [];
  tenantId;
 

  name 
  email 
  cuid 
  role
  tenant 
   pass 

  constructor(
    public auth: AngularFireAuth,
    public navCtrl: NavController,
    public storage: Storage,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private alertCtrl: AlertController
  ) {
    this.menuCtrl.enable(false, "menu");
  }

  ionViewDidLoad() {
    this.storage.get("email").then(val => {
      console.log("email",val)

      if(val != null){

        console.log("Not Null")
        this.storage.get("tenant").then(tenantId =>{
          this.storage.get("userId").then(uid => {
            firebase.firestore().collection("Company").doc(tenantId).collection("Users").doc(uid).get().then(doc =>{
              if(!doc.exists){
                this.role = "Admin"
                console.log("role","Admin")
                this.storage.get("tenant").then(ten => {
                  this.storage.get("email").then(ema => {
                    this.storage.get("password").then(pass =>{
                      firebase.auth().tenantId = ten
      
                      firebase.auth()
                      .signInWithEmailAndPassword(ema,pass)
                      .then((user) => {
                        let currentuser = firebase.auth().currentUser;
                        firebase.auth().onAuthStateChanged((data) => {
                          if (
                            currentuser.photoURL &&
                            currentuser &&
                            data.emailVerified === true
                          ) {
                            this.navCtrl.setRoot(HomePage)
                          } else { //=============================
                            console.log("Email is not verified ");
                            // this.navCtrl.setRoot(LoginPage);
                            let alert = this.alertCtrl.create({
                              title: "Error",
                              subTitle: "Email not verified please check your inbox",
                              buttons: [
                                {
                                  text: "OK",
                                  handler: (data) => {
                                    this.navCtrl.setRoot(LoginPage);
                                  },
                                },
                              ],
                            });
                            alert.present();
                          }
                        });
                      })
                      .catch((err) => {
                        console.log(err);
                        let alert = this.alertCtrl.create({
                          //title: 'Error',
                          subTitle: err,
                          buttons: [{ text: "OK", handler: (data) => {} }],
                        });
                        alert.present();
                      });
                    })
                  })
                })

              }else{
                this.role = doc.data().role
                console.log("role",this.role)
                switch (this.role){
                  case "Manager":
                    this.storage.get("tenant").then(ten => {
                      this.storage.get("email").then(ema => {
                        this.storage.get("password").then(pass =>{
                          firebase.auth().tenantId = ten
          
                          firebase.auth()
                          .signInWithEmailAndPassword(ema,pass)
                          .then((user) => {
                            let currentuser = firebase.auth().currentUser;
                            firebase.auth().onAuthStateChanged((data) => {
                              if (
                                currentuser.photoURL &&
                                currentuser &&
                                data.emailVerified === true
                              ) {
                                this.navCtrl.setRoot(HomeManagerPage)
                              } else { //=============================
                                console.log("Email is not verified ");
                                // this.navCtrl.setRoot(LoginPage);
                                let alert = this.alertCtrl.create({
                                  title: "Error",
                                  subTitle: "Email not verified please check your inbox",
                                  buttons: [
                                    {
                                      text: "OK",
                                      handler: (data) => {
                                        this.navCtrl.setRoot(LoginPage);
                                      },
                                    },
                                  ],
                                });
                                alert.present();
                              }
                            });
                          })
                          .catch((err) => {
                            console.log(err);
                            let alert = this.alertCtrl.create({
                              //title: 'Error',
                              subTitle: err,
                              buttons: [{ text: "OK", handler: (data) => {} }],
                            });
                            alert.present();
                          });
                        })
                      })
                    })
                    
                    break;
          
                  case "User":
                    this.storage.get("tenant").then(ten => {
                      this.storage.get("email").then(ema => {
                        this.storage.get("password").then(pass =>{
                          firebase.auth().tenantId = ten
          
                          firebase.auth()
                          .signInWithEmailAndPassword(ema,pass)
                          .then((user) => {
                            let currentuser = firebase.auth().currentUser;
                            firebase.auth().onAuthStateChanged((data) => {
                              if (
                                currentuser.photoURL &&
                                currentuser &&
                                data.emailVerified === true
                              ) {
                                this.navCtrl.setRoot(HomeUserPage)
                              } else { //=============================
                                console.log("Email is not verified ");
                                // this.navCtrl.setRoot(LoginPage);
                                let alert = this.alertCtrl.create({
                                  title: "Error",
                                  subTitle: "Email not verified please check your inbox",
                                  buttons: [
                                    {
                                      text: "OK",
                                      handler: (data) => {
                                        this.navCtrl.setRoot(LoginPage);
                                      },
                                    },
                                  ],
                                });
                                alert.present();
                              }
                            });
                          })
                          .catch((err) => {
                            console.log(err);
                            let alert = this.alertCtrl.create({
                              //title: 'Error',
                              subTitle: err,
                              buttons: [{ text: "OK", handler: (data) => {} }],
                            });
                            alert.present();
                          });
                        })
                      })
                    })
                    
                    break;
          
                }
              }
            })
          })
        })
        
      switch (this.role){
        case "Admin":
          
          break;

        case "Manager":

          this.storage.get("tenant").then(ten => {
            this.storage.get("email").then(ema => {
              this.storage.get("password").then(pass =>{
                firebase.auth().tenantId = ten

                firebase.auth()
                .signInWithEmailAndPassword(ema,pass)
                .then((user) => {
                  let currentuser = firebase.auth().currentUser;
                  firebase.auth().onAuthStateChanged((data) => {
                    if (
                      currentuser.photoURL &&
                      currentuser &&
                      data.emailVerified === true
                    ) {
                      this.navCtrl.setRoot(HomeManagerPage)
                    } else { //=============================
                      console.log("Email is not verified ");
                      // this.navCtrl.setRoot(LoginPage);
                      let alert = this.alertCtrl.create({
                        title: "Error",
                        subTitle: "Email not verified please check your inbox",
                        buttons: [
                          {
                            text: "OK",
                            handler: (data) => {
                              this.navCtrl.setRoot(LoginPage);
                            },
                          },
                        ],
                      });
                      alert.present();
                    }
                  });
                })
                .catch((err) => {
                  console.log(err);
                  let alert = this.alertCtrl.create({
                    //title: 'Error',
                    subTitle: err,
                    buttons: [{ text: "OK", handler: (data) => {} }],
                  });
                  alert.present();
                });
              })
            })
          })
          
          break;

        case "User":
          this.storage.get("tenant").then(ten => {
            this.storage.get("email").then(ema => {
              this.storage.get("password").then(pass =>{
                firebase.auth().tenantId = ten

                firebase.auth()
                .signInWithEmailAndPassword(ema,pass)
                .then((user) => {
                  let currentuser = firebase.auth().currentUser;
                  firebase.auth().onAuthStateChanged((data) => {
                    if (
                      currentuser.photoURL &&
                      currentuser &&
                      data.emailVerified === true
                    ) {
                      this.navCtrl.setRoot(HomeUserPage)
                    } else { //=============================
                      console.log("Email is not verified ");
                      // this.navCtrl.setRoot(LoginPage);
                      let alert = this.alertCtrl.create({
                        title: "Error",
                        subTitle: "Email not verified please check your inbox",
                        buttons: [
                          {
                            text: "OK",
                            handler: (data) => {
                              this.navCtrl.setRoot(LoginPage);
                            },
                          },
                        ],
                      });
                      alert.present();
                    }
                  });
                })
                .catch((err) => {
                  console.log(err);
                  let alert = this.alertCtrl.create({
                    //title: 'Error',
                    subTitle: err,
                    buttons: [{ text: "OK", handler: (data) => {} }],
                  });
                  alert.present();
                });
              })
            })
          })
          
          break;

      }

      }else{
        console.log("null")

      }

      
    })
    console.log("ionViewDidLoad LoginPage");
  }

  login(user: User) {
    if (user.email && user.password != null) {
      firebase.auth().tenantId = this.tenantId;

      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((user) => {
          let currentuser = firebase.auth().currentUser;
          firebase.auth().onAuthStateChanged((data) => {
            if (
              currentuser.photoURL &&
              currentuser &&
              data.emailVerified === true
            ) {
              firebase
                .firestore()
                .collection("Company")
                .doc(currentuser.photoURL)
                .collection("Users")
                .doc(currentuser.uid)
                .get()
                .then((doc) => {
                  if (!doc.exists) {
                    console.log("Admin");
                    this.storage.set("name", currentuser.displayName);
                    this.storage.set("email", currentuser.email);
                    this.storage.set("cuid", currentuser.photoURL);
                    this.storage.set("userId", currentuser.uid);
                    this.storage.set("role","Admin")
                    this.storage.set("tenant",currentuser.photoURL)
                    this.storage.set("password",this.user.password)
                    console.log("Email is verified");

                    this.navCtrl.setRoot(HomePage);


                    
                  } else {
                    let role = doc.data().role;
                    switch (role) {
                      case "Manager":
                        console.log("Manager ");
                        this.storage.set("name", currentuser.displayName);
                        this.storage.set("email", currentuser.email);
                        this.storage.set("userId", currentuser.uid);
                        this.storage.set("cuid", currentuser.photoURL);
                        this.storage.set("role","Manager")
                        this.storage.set("tenant",currentuser.photoURL)
                        this.storage.set("password",this.user.password)

                        this.navCtrl.setRoot(HomeManagerPage);
                        break;

                      case "Sale Representative":
                        console.log("USER ");

                        this.storage.set("name", currentuser.displayName);
                        this.storage.set("email", currentuser.email);
                        this.storage.set("cuid", currentuser.photoURL);
                        this.storage.set("userId", currentuser.uid);
                        this.storage.set("role","User")
                        this.storage.set("tenant",currentuser.photoURL)
                        this.storage.set("password",this.user.password)

                        this.navCtrl.setRoot(HomeUserPage);
                        break;
                    }
                    
                  }
                });

             
            } else {
              console.log("Email is not verified ");
              // this.navCtrl.setRoot(LoginPage);
              let alert = this.alertCtrl.create({
                title: "Error",
                subTitle: "Email not verified please check your inbox",
                buttons: [
                  {
                    text: "OK",
                    handler: (data) => {
                      this.navCtrl.setRoot(LoginPage);
                    },
                  },
                ],
              });
              alert.present();
            }
          });
        })
        .catch((err) => {
          console.log(err);
          let alert = this.alertCtrl.create({
            //title: 'Error',
            subTitle: err,
            buttons: [{ text: "OK", handler: (data) => {} }],
          });
          alert.present();
        });
    } else {
      let alert = this.alertCtrl.create({
        title: "Warning",
        subTitle: "Enter your Details",
        //scope: id,
        buttons: [
          {
            text: "OK",
            handler: (data) => {
              this.navCtrl.push(LoginPage);
            },
          },
        ],
      });
      alert.present();
    }
  } //signin ends

  ResetPassword() {
    let alert = this.alertCtrl.create({
      title: "Reset Password",
      inputs: [{ name: "email", placeholder: "Email" }],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: (data) => {
            console.log("Cancel clicked");
          },
        },
        {
          text: "Reset Password",
          handler: (data) => {
            if (data.email) {
              console.log(data.email);
              const result = this.auth.auth.sendPasswordResetEmail(data.email);
              if (result) {
                console.log("Check Your Email For Reset Link");
                let alert = this.alertCtrl.create({
                  title: "Success",
                  subTitle:
                    "Check Your Email For Reset Link to Change Password",
                  buttons: [
                    {
                      text: "OK",
                      handler: (data) => {
                        this.navCtrl.setRoot(LoginPage);
                      },
                    },
                  ],
                });
                alert.present();
              } else {
                console.log("Error  in Sending Reset Link");
                let alert = this.alertCtrl.create({
                  title: "Error",
                  subTitle:
                    "Failed to send reset Link ,please check your Email",
                  buttons: [
                    {
                      text: "OK",
                      handler: (data) => {
                        this.navCtrl.setRoot(LoginPage);
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

  register() {
    this.navCtrl.push(RegisterPage);
  }

  setTenant(id) {
    this.tenantId = id;
    console.log("Tenant Selected", this.tenantId);
  }

  getCom() {
    firebase
      .firestore()
      .collection("Tenants")
      .doc(this.user.email)
      .get()
      .then((snap) => {
        if (snap.exists) {
          this.coms = snap.data().details;
          console.log("Comanies are", this.coms);
        } else {
          alert("Create Account");
        }
      });
  }

  public onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }
}
