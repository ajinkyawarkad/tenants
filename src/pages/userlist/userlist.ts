import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/firestore';
import { Employee } from '../../models/user';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { AngularFirestore} from '@angular/fire/firestore';

import { uuid } from 'uuidv4';




@Component({
  selector: 'page-userlist',
  templateUrl: 'userlist.html',
})
export class UserlistPage {
  employee = {} as Employee;
  currentUser = firebase.auth().currentUser;

  constructor(public navCtrl: NavController,public afs: AngularFirestore,
    private storage: Storage, public navParams: NavParams,private auth:AngularFireAuth,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    
  }


  insertUser(employee: Employee) {
    if (
      employee.email &&
      employee.role &&
      employee.name != null
    ) {
      this.storage.get("cuid").then((val) => {
       
        let uid = uuid();

        if (employee.role == "Manager") {
          firebase
            .firestore()
            .collection("Company")
            .doc(val)
            .collection("non-active")
            .doc(uid)
            .set(
              {
                ref:'M#'+this.currentUser.photoURL,
                 name: this.employee.name,
                 email:employee.email,
                // last: this.employee.last,
                role: this.employee.role,
                id:uid
                
              },
              { merge: true }
            );
        } else {
          firebase
          .firestore()
          .collection("Company")
          .doc(val)
          .collection("non-active")
          .doc(uid)
          .set(
            {
               ref:'U#'+this.currentUser.photoURL,
               name: this.employee.name,
              // last: this.employee.last,
               email:employee.email,
               role: this.employee.role,
               id:uid
              
            },
            { merge: true }
          );
        }
        let alert = this.alertCtrl.create({
          title: "Success",
          subTitle: "Invitation sent to " + employee.email,
          //scope: id,
          buttons: [
            {
              text: "OK",
              handler: (data) => {
           //    this.navCtrl.push(HomePage);
              },
            },
          ],
        });
        alert.present();
      });
    } else {
      let alert = this.alertCtrl.create({
        title: "Warning",
        subTitle: "Insert Data",
        //scope: id,
        buttons: [
          {
            text: "OK",
            handler: (data) => {
              //this.navCtrl.push(LoginPage);
            },
          },
        ],
      });
      alert.present();
    }
  }

}