import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
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
  selector: 'page-userlist',
  templateUrl: 'userlist.html',
})
export class UserlistPage {
  employee = {} as Employee;
  constructor(public navCtrl: NavController,public afs: AngularFirestore,
    private storage: Storage, public navParams: NavParams,private auth:AngularFireAuth,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserlistPage');
  }
  insertUser(employee:Employee){
    if(employee.email && employee.role && employee.name && employee.last != null){
    
    this.storage.get('cuid').then((val) => {
    console.log('id is', val);
    let uid = uuid();
    console.log(uid);
    let currentUser = firebase.auth().currentUser
    
    firebase.firestore().collection('Company').doc(val).collection('Users').doc(uid)
    .set(Object.assign({
    id: uid,
    name:employee.name,
    last:employee.last,
    email: employee.email,
    role: employee.role
    }
    ))
    if(employee.role == 'Manager'){
    firebase.firestore().collection('Company').doc(val).collection('Admin').doc(currentUser.uid) 
    .update(
    {
    Managers : firebase.firestore.FieldValue.arrayUnion( {
      id: uid,
      name: this.employee.name,                           
      role: this.employee.role,
      last: this.employee.last,
      
      })  
    })
    
    }
    else{
    firebase.firestore().collection('Company').doc(val).collection('Admin').doc(currentUser.uid).update({
    Users : firebase.firestore.FieldValue.arrayUnion({
      id: uid,
      name: this.employee.name,
      role: this.employee.role,
      last: this.employee.last,
      })
    })
    }
    let alert = this.alertCtrl.create({
    title: 'Success',
    subTitle: 'Invitation sent to '+ employee.email,
    //scope: id,
    buttons: [{text: 'OK',
    handler: data => {
    this.navCtrl.pop();
    }
    }]
    });
    alert.present();
    
    });
    
    
    
    }else{
    
    let alert = this.alertCtrl.create({
    title: 'Warning',
    subTitle: 'Insert Data',
    //scope: id,
    buttons: [{text: 'OK',
    handler: data => {
    //this.navCtrl.push(LoginPage);
    }
    }]
    });
    alert.present();
    
    }
    
    }

}
