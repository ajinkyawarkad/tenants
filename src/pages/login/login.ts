import { Component } from '@angular/core';
import {   MenuController, NavController, NavParams,AlertController  } from 'ionic-angular';
import { User } from '../../models/user';

import { HomePage } from '../home/home';
import { HomeManagerPage } from '../home-manager/home-manager';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

import { Storage } from '@ionic/storage';
import { HomeUserPage } from '../home-user/home-user';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public showPassword: boolean = false;

  user = {} as User;
  phone: string;
  coms =[]
  tenantId;
  
  constructor(public auth: AngularFireAuth,
    public navCtrl: NavController,   
    private storage: Storage,
    public navParams: NavParams , 
    public menuCtrl : MenuController,
    private alertCtrl: AlertController) {
    this.menuCtrl.enable(false, 'menu');
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad LoginPage');
   
  }

    login(user:User){
      if(user.email && user.password != null){
        firebase.auth().tenantId = this.tenantId


        
      firebase.auth().signInWithEmailAndPassword(user.email,user.password)
      .then((user) => {
        let currentuser=firebase.auth().currentUser;
        firebase.auth().onAuthStateChanged((data)=>{   
          if (currentuser.photoURL && currentuser && data.emailVerified === true) {
            console.log(currentuser.displayName);
            console.log(currentuser.photoURL);
            let a = []
            a= currentuser.photoURL.split('#')

            switch ( a[0]){
              case "COM":
                this.storage.set('name', currentuser.displayName) ; 
                this.storage.set('email', currentuser.email) ;
                this.storage.set('cuid',currentuser.photoURL)
                console.log('Email is verified');
                console.log(a[0]);
                 this.navCtrl.setRoot(HomePage);
                 break;
              case "M":
                this.storage.set('name', currentuser.displayName) ; 
                this.storage.set('email', currentuser.email) ;
                this.storage.set('cuid',a[1]+'#'+a[2])
                console.log('Email is verified');
                console.log(data);
                console.log(a[0]);
                 this.navCtrl.setRoot(HomeManagerPage);
                 break;
              case "U":
                console.log("USER ")  
                console.log(a[0]);  
                this.storage.set('name', currentuser.displayName) ; 
                this.storage.set('email', currentuser.email) ;
                this.navCtrl.setRoot(HomeUserPage);

            }
          
          }
          else {
            console.log('Email is not verified ');
           // this.navCtrl.setRoot(LoginPage);
           let alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: 'Email not verified please check your inbox',
            buttons: [{text: 'OK',
                      handler: data => {
                       this.navCtrl.setRoot(LoginPage);
                      } 
                    }]
                  });
          alert.present();
          } 
        });
        }).catch((err) => {
          console.log(err); 
          let alert = this.alertCtrl.create({
            //title: 'Error',
            subTitle:  err ,
            buttons: [{text: 'OK',
                      handler: data => {
                      } 
                    }]
                  });
          alert.present();
        });
      }else{
        let alert = this.alertCtrl.create({
          title: 'Warning',
          subTitle: 'Enter your Details',
          //scope: id,
          buttons: [{text: 'OK',
                    handler: data => {
                     this.navCtrl.push(LoginPage);
                    } 
                  }]
                });
        alert.present();
      }
    }//signin ends

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
                               this.navCtrl.setRoot(LoginPage);
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
                               this.navCtrl.setRoot(LoginPage);
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

    register(){
      this.navCtrl.push(RegisterPage);
      }

      setTenant(id){
        this.tenantId=id
        console.log("Tenant Selected", this.tenantId)


      }
      

      
 getCom(){
  firebase.firestore().collection("Tenants").doc(this.user.email).get().then(snap =>{
    if(snap.exists){
      this.coms = snap.data().details
    console.log("Comanies are", this.coms)

    }else{
      alert("Create Account")

    }
    
    
   

  })
}

      public onPasswordToggle(): void {
        this.showPassword = !this.showPassword;
      }
     
}
