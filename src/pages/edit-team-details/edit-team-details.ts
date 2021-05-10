import { Component } from '@angular/core';
import firebase from 'firebase';
import { AlertController,  NavController, NavParams } from 'ionic-angular';
import { AngularFirestore} from '@angular/fire/firestore';


@Component({
  selector: 'page-edit-team-details',
  templateUrl: 'edit-team-details.html',
})
export class EditTeamDetailsPage {
value:any;
userInfo:any;
product:{id:'',name:'',last:'',email:'',role:''};

  constructor(public navCtrl: NavController, public navParams: NavParams,public afs: AngularFirestore,
    private alertCtrl:AlertController) {
    this.value = navParams.get('product');
    console.log(this.value.id);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditTeamDetailsPage');
  }

  update(){
    let currentuser=firebase.auth().currentUser;
    firebase.firestore().collection('Company').doc("COM#"+currentuser.uid+'/' +'Users' +'/'+this.value.id)
            .update(Object.assign({
              name: this.value.name,
              last: this.value.last,
              email:this.value.email,
              role:this.value.role
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

  update1(value){
    let currentuser=firebase.auth().currentUser;
    firebase.firestore().collection('Company').doc("COM#"+currentuser.uid+'/' +'non-active' +'/'+this.value.id)
            .update(Object.assign({
              name: this.value.name,
              last: this.value.last,
              email:this.value.email,
              role:this.value.role
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
