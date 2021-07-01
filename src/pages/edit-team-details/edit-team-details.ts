import { Component } from '@angular/core';
import firebase, { firestore } from 'firebase';
import { AlertController,  NavController, NavParams } from 'ionic-angular';
import { AngularFirestore} from '@angular/fire/firestore';


@Component({
  selector: 'page-edit-team-details',
  templateUrl: 'edit-team-details.html',
})
export class EditTeamDetailsPage {
value:any;
userInfo:any;
product:{id:'',name:'',email:'',role:''};
role;
manager;
users;


  constructor(public navCtrl: NavController, public navParams: NavParams,public afs: AngularFirestore,
    private alertCtrl:AlertController) {
    this.value = navParams.get('product');
    console.log("id",this.value.id);
    
  }

  ionViewDidLoad() {
    let currentuser=firebase.auth().currentUser;
    firebase.firestore().collection("Company").doc(currentuser.photoURL).collection("Admin").doc(currentuser.uid).get().then(doc =>{
      this.manager = doc.data().Managers
      this.users = doc.data().Users
    })

    console.log("else",this.value.role)
    this.role = this.value.role

    console.log('ionViewDidLoad EditTeamDetailsPage');
  }

  update(newRole){
    let currentuser=firebase.auth().currentUser;
    
    console.log("elseyu",this.role)
    
    switch(this.role){               //removing existing
      case "Manager":
        for(var i in this.manager){
          if(this.manager[i].id == this.value.id){
            this.manager.splice(i, 1)

          }else{
            console.log("else")
          }

        }
        firebase.firestore().collection("Company").doc(currentuser.photoURL).collection("Admin").doc(currentuser.uid).update({
          Managers:this.manager
        })
        
        break;
      case "Sale Representative":
        for(var i in this.users){
          if(this.users[i].id == this.value.id){
            this.users.splice(i, 1)

          }else{
            console.log("else")
          }

        }
        firebase.firestore().collection("Company").doc(currentuser.photoURL).collection("Admin").doc(currentuser.uid).update({
          Users:this.users
        })


        break;
    }

    switch(newRole){               
      case "Manager":
        firebase.firestore().collection("Company").doc(currentuser.photoURL).collection("Admin").doc(currentuser.uid).update({
          Managers:firestore.FieldValue.arrayUnion({
            name: this.value.name,
              id:this.value.id,
              role:this.value.role

          })
        })
        
        break;
      case "Sale Representative":
        firebase.firestore().collection("Company").doc(currentuser.photoURL).collection("Admin").doc(currentuser.uid).update({
          Users:firestore.FieldValue.arrayUnion({
            name: this.value.name,
              id:this.value.id,
              role:this.value.role

          })
        })


        break;
    }


    firebase.firestore().collection('Company').doc(currentuser.photoURL+'/' +'Users' +'/'+this.value.id)
            .update(Object.assign({
              name: this.value.name,
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
    firebase.firestore().collection('Company').doc(currentuser.photoURL+'/' +'non-active' +'/'+this.value.id)
            .update(Object.assign({
              name: this.value.name,
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
