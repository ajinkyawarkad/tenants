import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { User } from '../../models/user';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public name:any;
  public email:any;
  public phoneno:any;
  company_name :any;
  cuid:any;

  //public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
   user = {} as User;

  constructor(public auth: AngularFireAuth,public navCtrl: NavController, private storage: Storage,public navParams: NavParams,
    private alertCtrl:AlertController) {

      this.storage.get('name').then((name) => {
        console.log('name', name);
        this.name=name;
     });
     this.storage.get('email').then((email) => {
      console.log('email', email);
      this.email=email;
   });
   this.storage.get('cuid').then((cuid) => {
    console.log('cuid', cuid);
    this.cuid=cuid;
 });
  }

  
  ionViewDidEnter() {
    
    console.log('ionViewDidLoad LoginPage');
   // this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

  updateprofile(user:User)
  {
    firebase.auth().onAuthStateChanged((data)=>{
    let currentuser=firebase.auth().currentUser;
    
    currentuser.updateProfile({
      displayName: this.name,
      photoURL: 'COM#'+currentuser.uid 
    }).then(() => {
      console.log("updated..");
      let alert = this.alertCtrl.create({
        title: 'Sucess',
        subTitle: 'Updated Sucessfully',
        buttons: [{text: 'OK',
                  handler: data => {
                 // this.navCtrl.setRoot(ProfilePage);
                  } 
                }]
              });
      alert.present();
    }).catch((err) => {
      console.log(err);
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: err,
        buttons: [{text: 'OK',
                  handler: data => {
                  // this.navCtrl.setRoot(ProfilePage);
                  } 
                }]
              });
    });
    currentuser.updateEmail(this.email);

     firebase.firestore().collection('Company').doc("COM#"+currentuser.uid).collection('Admin').doc(currentuser.uid)
            .update(Object.assign({
              name: this.name,
              email: this.email,
              uid: currentuser.uid,
              company_id: "COM#"+currentuser.uid,
              phoneno:this.phoneno,
              company_name:this.company_name,
              role:'Admin'
              } 
            ))
  }); 
  }

  // updatephone(phoneNumber:number)
  // {
  //   let currentuser=firebase.auth().currentUser;
  //   const appVerifier = this.recaptchaVerifier;
  //   const phoneNumberString = "+" + phoneNumber;
  //   const provider = new firebase.auth.PhoneAuthProvider();
  //   provider.verifyPhoneNumber(phoneNumberString, appVerifier)
  //   .then( confirmationResult => {
     
  //     let prompt = this.alertCtrl.create({
  //     title: 'Enter the Confirmation code',
  //     inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
  //     buttons: [
  //       { text: 'Cancel',
  //         handler: data => { console.log('Cancel clicked'); }
  //       },
  //       { text: 'Send',
  //         handler: data => {
  //           currentuser.updatePhoneNumber(this.phoneNumber)
  //           console.log(phoneNumber);
  //         //  confirmationResult.confirm(data.confirmationCode)
  //         //   .then((result) => {
  //         //     console.log(result);
  //         //   //  return this.currentuser.updatePhoneNumber(this.phone);
  //         //   })
  //         //   .catch((e) => {
  //         //     console.log(e);
  //         //   });
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // })
  // .catch(function (error) {
  //   console.error("SMS not sent", error);
  // });

  // }

  logout()
  {
    this.storage.remove('name').then((name) =>{
      this.name = null;
     this.navCtrl.setRoot(LoginPage);
    })
   }
   ResetPassword()
   {
     let alert = this.alertCtrl.create({
       title: 'Reset Password',
       inputs: [{name: 'email', placeholder: 'Email'} ],
       buttons: [{text: 'Cancel',role: 'cancel',
              handler: data => {
              console.log('Cancel clicked');
           }
         },
         {
           text: 'Reset Password',
           handler: data => {
             if (data.email) {
               console.log(data.email);
               const result =this.auth.auth.sendPasswordResetEmail(data.email);
               if(result)
               {
                 console.log("Check Your Email For Reset Link");
                 let alert = this.alertCtrl.create({
                   title: 'Success',
                   subTitle: 'Check Your Email For Reset Link to Change Password',
                   buttons: [{text: 'OK',
                             handler: data => {
                              this.navCtrl.setRoot(ProfilePage);
                             } 
                           }]
                         });
                 alert.present();
               }
               else{
                 console.log("Error  in Sending Reset Link");
                 let alert = this.alertCtrl.create({
                   title: 'Error',
                   subTitle: 'Failed to send reset Link ,please check your Email',
                   buttons: [{text: 'OK',
                             handler: data => {
                              this.navCtrl.setRoot(ProfilePage);
                             } 
                           }]
                         });
                 alert.present();
               }
             } else {
               
               return false;
             }
           }
         }
       ]
     });
     alert.present();
   }


}
