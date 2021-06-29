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
    console.log('ionViewDidLoad RegisterPage');
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
      console.log("cvcs",res.data)
      tenantId = res.data
      firebase.auth().tenantId = tenantId

    }).then(dat =>{
     
    firebase.auth().createUserWithEmailAndPassword(user.email,user.password).then((data) => {
      let currentuser=firebase.auth().currentUser;
     // console.log(data);
     
       if(currentuser && data.user.emailVerified === false)
       {
         currentuser.sendEmailVerification().then
           {
             currentuser.updateProfile({
               displayName: user.name,
               photoURL: 'COM#'+currentuser.uid ,  // Using As CompoanyId Com#id
             })
             
 
          //   this.storage.set('name', currentuser.displayName);
             
             firebase.firestore().collection('Company').doc("COM#"+currentuser.uid )
             .set(Object.assign({
              // company_name:user.company_name,
               company_id: "COM#"+currentuser.uid ,
               tenantId:tenantId
               
               })
             )
 
             firebase.firestore().collection('Company').doc("COM#"+currentuser.uid ).collection('Admin').doc(currentuser.uid)
             .set(Object.assign({
                name: user.name,
                company_id: "COM#"+currentuser.uid ,
                function:true,
                 Managers:[],
                 Users:[]
               } 
             ))
             // this.storage.set('data', data );
             //   console.log("dmcj",data);

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
       console.log(err); 
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
