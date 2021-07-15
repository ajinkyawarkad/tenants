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
currentuser=firebase.auth().currentUser;

  constructor(public navCtrl: NavController, public navParams: NavParams,public afs: AngularFirestore,
    private alertCtrl:AlertController) {
    this.value = navParams.get('product');      
  }

  ionViewDidLoad() {
   
    firebase.firestore().collection("Company").doc(this.currentuser.photoURL).collection("Admin").doc(this.currentuser.uid).get().then(doc =>{
      this.manager = doc.data().Managers
      this.users = doc.data().Users
    })

       this.role = this.value.role
  }

  update(newRole){
   
    switch(this.role){               //removing existing
      case "Manager":
        for(var i in this.manager){
          if(this.manager[i].id == this.value.id){
            this.manager.splice(i, 1)

          }

        }
        firebase.firestore().collection("Company").doc(this.currentuser.photoURL).collection("Admin").doc(this.currentuser.uid).update({
          Managers:this.manager
        })
        
        break;
      case "Sale Representative":
        for(var i in this.users){
          if(this.users[i].id == this.value.id){
            this.users.splice(i, 1)

          }

        }
        firebase.firestore().collection("Company").doc(this.currentuser.photoURL).collection("Admin").doc(this.currentuser.uid).update({
          Users:this.users
        })


        break;
    }

    switch(newRole){               
      case "Manager":
        firebase.firestore().collection("Company").doc(this.currentuser.photoURL).collection("Admin").doc(this.currentuser.uid).update({
          Managers:firestore.FieldValue.arrayUnion({
            name: this.value.name,
              id:this.value.id,
              role:this.value.role

          })
        })
        
        break;
      case "Sale Representative":
        firebase.firestore().collection("Company").doc(this.currentuser.photoURL).collection("Admin").doc(this.currentuser.uid).update({
          Users:firestore.FieldValue.arrayUnion({
            name: this.value.name,
              id:this.value.id,
              role:this.value.role

          })
        })
        break;
    }

    firebase.firestore().collection('Company').doc(this.currentuser.photoURL+'/' +'Users' +'/'+this.value.id)
            .update(Object.assign({
              name: this.value.name,
              email:this.value.email,
              role:this.value.role
              } 
            )).then(() => {
             
              let alert = this.alertCtrl.create({
                title: 'Sucess',
                subTitle: 'Updated Sucessfully',
                buttons: [{text: 'OK',
                          handler: data => {
                        
                          } 
                        }]
                      });
              alert.present();
            }).catch((err) => {
            
              let alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: err,
                buttons: [{text: 'OK',
                          handler: data => {
                        
                          } 
                        }]
                      });
            });
    
  }

  update1(value){
   
    firebase.firestore().collection('Company').doc(this.currentuser.photoURL+'/' +'non-active' +'/'+this.value.id)
            .update(Object.assign({
              name: this.value.name,
              email:this.value.email,
              role:this.value.role
              } 
            )).then(() => {
             
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
