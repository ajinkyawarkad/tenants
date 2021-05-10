import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController, LoadingController} from 'ionic-angular';
import { EditTeamDetailsPage } from '../edit-team-details/edit-team-details';
import { UserLicensesPage } from '../user-licenses/user-licenses';

import { UserlistPage } from '../userlist/userlist';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/firestore';
import { Employee, User } from '../../models/user';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';

import { AngularFirestore} from '@angular/fire/firestore';


import { Observable } from 'rxjs';
// import { merge } from 'jquery';
import { uuid } from 'uuidv4';

interface Users {
first_name: string,
last_name:string;
email:string;
role:string;
}

@IonicPage()
@Component({
selector: 'page-user-details',
templateUrl: 'user-details.html',
})
export class UserDetailsPage {
employee = {} as Employee;

userInfo:any;
products: Observable<Users[]>;
productss: Observable<Users[]>;
Segments:string;


constructor(public navCtrl: NavController,public afs: AngularFirestore, public loadingCtrl: LoadingController ,                                               
private storage: Storage, public navParams: NavParams,private auth:AngularFireAuth,public alertCtrl: AlertController,) {
this.Segments="1";

}

ionViewWillLoad()
{
let currentuser=firebase.auth().currentUser;
this.userInfo = this.afs.collection('Company').doc("COM#"+currentuser.uid).collection('non-active');
this.products = this.userInfo.valueChanges();

this.userInfo = this.afs.collection('Company').doc("COM#"+currentuser.uid).collection('Users');
this.productss = this.userInfo.valueChanges();

}
add()
{
 this.navCtrl.push(UserlistPage);
}

showPopup(value) {
    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      subTitle: 'Do you really want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'OK',
          
          handler: data => {
            console.log(value);
            this.deleteItem1(value);
            this.deleteItem2(value);
          }
        }
      ]
    });
    alert.present();
  }
deleteItem1(value)
{
let currentuser=firebase.auth().currentUser;
this.afs.collection('Company').doc("COM#"+currentuser.uid+'/' +'Users' +'/'+value).delete(); 
}

deleteItem2(value)
{

let currentuser=firebase.auth().currentUser;
this.afs.collection('Company').doc("COM#"+currentuser.uid+'/' +'non-active' +'/'+value).delete();
  
}


userlicense()
{
this.navCtrl.push(UserLicensesPage);
}

edit(product)
{
this.navCtrl.push(EditTeamDetailsPage, {
product:product
});

}





async showActive(user:User){
let currentUser = firebase.auth().currentUser;
const events = await firebase.firestore().collection('Company').doc("COM#"+currentUser.uid).collection('Admin').doc(currentUser.uid)
const dat = await events.get();
if(!dat.exists){
console.log('No such document!');

}else{
console.log('Document data:', dat.data());

}


}

dummy(){
this.storage.get('cuid').then((val) => {
//console.log('id is', val);
let currentUser = firebase.auth().currentUser;
firebase.firestore().collection('Company').doc(currentUser.photoURL).collection('Admin').doc(currentUser.uid)
.update({
users :{

[this.employee.name]:{

name:this.employee.name,
role:this.employee.role,
last:this.employee.last,
},
}
}
)
})
}



}
