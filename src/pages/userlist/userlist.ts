import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController} from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/firestore';
import { Employee, User } from '../../models/user';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// import { merge } from 'jquery';
import { uuid } from 'uuidv4';
import { HomePage } from '../home/home';

interface Users {
  first_name: string,
  last_name:string;
  email:string;
  role:string;
  }


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


  insertUser(employee: Employee) {
    if (
      employee.email &&
      employee.role &&
      employee.name &&
      employee.last != null
    ) {
      this.storage.get("cuid").then((val) => {
        console.log("id is", val);
        let uid = uuid();
        console.log(uid);
        let currentUser = firebase.auth().currentUser;

        uid= uuid()

        // firebase
        //   .firestore()
        //   .collection("Company")
        //   .doc(val)
        //   .collection("Users")
        //   .doc(uid)
        //   .set(
        //     Object.assign({
        //       id: uid,
        //       name: employee.name,
        //       last: employee.last,
        //       email: employee.email,
        //       role: employee.role,
        //     })
        //   );
        if (employee.role == "Manager") {
          firebase
            .firestore()
            .collection("Company")
            .doc(val)
            .collection("non-active")
            .doc(uid)
            .set(
              {
                ref:'M#COM#'+currentUser.uid,
                 name: this.employee.name,
                 email:employee.email,
                 last: this.employee.last,
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
               ref:'S#COM#'+currentUser.uid,
               name: this.employee.name,
               last: this.employee.last,
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
               // this.navCtrl.push(HomePage);
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