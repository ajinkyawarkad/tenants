import { Component } from '@angular/core';
import {  NavController, NavParams ,AlertController} from 'ionic-angular';
import firebase from 'firebase';
import { AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'page-edit-lead-details',
  templateUrl: 'edit-lead-details.html',
})
export class EditLeadDetailsPage {
 value:any;
 campid:any;
 productss:any;
 public hideMe: boolean = false;
 
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController) {
    this.value = navParams.get('product');
    console.log("edit page",this.value);
    console.log("edit page",this.value.leads);
    this.campid = navParams.get('campid');
    //console.log(this.campid);      
   
    //console.log(this.proStatus);                                                                                                         
  }
  hide() {
    this.hideMe = !this.hideMe;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditLeadDetailsPage');
    let currentuser=firebase.auth().currentUser;

    firebase
.firestore()
.collection("Company")
.doc("COM#" + currentuser.uid + "/" + "Campaigns" + "/" + this.campid)
.onSnapshot((doc) => {
var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
console.log(source, " data: ");
this.productss = doc.data().status;

console.log("sts",this.productss);

});
  }
  
  update()
  {
  console.log(this.value)
    let currentuser=firebase.auth().currentUser;

    firebase.firestore().collection('Company').doc("COM#"+currentuser.uid).collection('Campaigns').doc(this.campid)
    .collection('leads').doc(this.value.uid)

            .update(Object.assign({
              leads:this.value.leads,
              action:this.value.action,
              remark:this.value.remark,
              status:this.value.status,
              datetime:this.value.datetime1  
              } 
            )).then(() => {
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
    
  }

}