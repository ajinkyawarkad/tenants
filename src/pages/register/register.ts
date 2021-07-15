import { Component } from '@angular/core';
import {  NavController, NavParams ,AlertController} from 'ionic-angular';
import { User } from '../../models/user';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase, { firestore } from 'firebase';
import { AuthserviceProvider } from '../../providers/authservice/authservice';
import 'firebase/firestore';
import { Storage } from '@ionic/storage';
import axios from 'axios';
import { addSyntheticLeadingComment, textSpanEnd } from 'typescript';
import { UserregPage } from '../userreg/userreg';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public showPassword: boolean = false;
  
  user = {} as User;
  coms=[]
  
  constructor(private auth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams, 
    public alertCtrl: AlertController, public AuthProvider:AuthserviceProvider,private storage: Storage) {
  }

  ionViewDidLoad() {
    
  }
   
signup(user:User){
  let tenantId;

  
  if(user.email && user.password && user.name && user.company_name != null){
    let compName ;
    let a = []
    a=user.company_name.split(" ")
    compName = a[0]


    let url  = "https://us-central1-adminnew-d710c.cloudfunctions.net/createTen?name="+compName
    
    
    axios.post(url,).then(res => {
     
      tenantId = res.data
      firebase.auth().tenantId = tenantId

    }).then(dat =>{
     
    firebase.auth().createUserWithEmailAndPassword(user.email,user.password).then((data) => {
      let currentuser=firebase.auth().currentUser;
     
     
       if(currentuser && data.user.emailVerified === false)
       {
         currentuser.sendEmailVerification().then
           {
             currentuser.updateProfile({
               displayName: user.name,
               photoURL: tenantId,  // Using As CompoanyId Com#id
             })
             
 
          //   this.storage.set('name', currentuser.displayName);
             
             firebase.firestore().collection('Company').doc(tenantId)
             .set(Object.assign({
              // company_name:user.company_name,
               company_id: tenantId ,
               compName:user.company_name,
               adminId:currentuser.uid
            
               
               })
             )
 
             firebase.firestore().collection('Company').doc(tenantId).collection('Admin').doc(currentuser.uid)
             .set(Object.assign({
                name: user.name,
                company_id: tenantId ,
                function:true,
                 Managers:[],
                 Users:[]
               } 
             ))
           

             firebase.firestore().collection("Tenants").doc(user.email).set({
               details:firestore.FieldValue.arrayUnion({
                 tenantId:tenantId,
                 compName:user.company_name
               })
             },{merge:true})
 
            window.localStorage.setItem('emailForSignIn', currentuser.email);
            let alert = this.alertCtrl.create({
             title: 'Success',
             subTitle: 'Verification link sent to you, Please check your Inbox',
             //scope: id,
             buttons: [{text: 'OK',
                       handler: data => {
                        this.navCtrl.push(LoginPage);
                       } 
                     }]
                   });
           alert.present();
           }    
       } 
       
       
     }).catch((err) => {
     
       let alert = this.alertCtrl.create({
         title: 'Error',
         subTitle: 'Error in Creating Account ' + err ,
         //scope: id,
         buttons: [{text: 'OK',
                   handler: data => {
                    this.navCtrl.push(RegisterPage);
                   } 
                 }]
               });
       alert.present();
     });


    })

    


  }else{
    let alert = this.alertCtrl.create({
      title: 'Warning',
      subTitle: 'Enter your Details',
      //scope: id,
      buttons: [{text: 'OK',
                handler: data => {
                 this.navCtrl.push(RegisterPage);
                } 
              }]
            });
    alert.present();
  }
  
 }

public onPasswordToggle(): void {
      this.showPassword = !this.showPassword;
 }

 toUser(){
   this.navCtrl.push(UserregPage)
 }


login()
{
  this.navCtrl.push(LoginPage);
}
}
