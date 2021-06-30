import { Component } from "@angular/core";
import firebase, { firestore } from "firebase";
import { AlertController, NavController, NavParams } from "ionic-angular";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "page-edit-team-details",
  templateUrl: "edit-team-details.html",
})
export class EditTeamDetailsPage {
  value: any;
  userInfo: any;
  product: { id: ""; name: ""; last: ""; email: ""; role: "" };

  recieved:any=[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afs: AngularFirestore,
    private alertCtrl: AlertController
  ) {
    this.value = navParams.get("product");
    console.log(this.value.id);
    for(var i in this.value){
      this.recieved.push(this.value[i])
    }
    
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad EditTeamDetailsPage");
  }

  update() {
    let data = {
      name: this.value.name,
                last: this.value.last,
                role: this.value.role,
                id: this.value.id,
    }
    console.log("recieved", this.recieved)
    console.log("changed", data)
    let currentuser = firebase.auth().currentUser;

    firebase
          .firestore()
          .collection("Company")
          .doc("COM#" + currentuser.uid)
          .collection("Admin")
          .doc(currentuser.uid)
          .update({

            Managers: firestore.FieldValue.arrayRemove({
              name: this.recieved.name,
              last: this.recieved.last,
              role: this.recieved.role,
              id: this.recieved.id,
            }),
            Users: firestore.FieldValue.arrayRemove({
              name: this.recieved.name,
              last: this.recieved.last,
              role: this.recieved.role,
              id: this.recieved.id,
            })
          })




    switch (this.value.role) {
      case "Manager":
 
            firebase
              .firestore()
              .collection("Company")
              .doc("COM#" + currentuser.uid)
              .collection("Admin")
              .doc(currentuser.uid)
              .update({
                Managers: firestore.FieldValue.arrayUnion({
                  name: this.value.name,
                  last: this.value.last,
                  role: this.value.role,
                  id: this.value.id,
                }),
              });
      
          break;
        
        case "Sale Representative":
         
            firebase
              .firestore()
              .collection("Company")
              .doc("COM#" + currentuser.uid)
              .collection("Admin")
              .doc(currentuser.uid)
              .update({
                Users: firestore.FieldValue.arrayUnion({
                  name: this.value.name,
                  last: this.value.last,
                  role: this.value.role,
                  id: this.value.id,
                }),
              });
         
          break;

    }

    firebase
      .firestore()
      .collection("Company")
      .doc("COM#" + currentuser.uid + "/" + "Users" + "/" + this.value.id)
      .update(
        Object.assign({
          name: this.value.name,
          last: this.value.last,
          email: this.value.email,
          role: this.value.role,
        })
      )
      .then(() => {
        console.log("updated..");
        let alert = this.alertCtrl.create({
          title: "Sucess",
          subTitle: "Updated Sucessfully",
          buttons: [
            {
              text: "OK",
              handler: (data) => {
                // this.navCtrl.setRoot(ProfilePage);
              },
            },
          ],
        });
        alert.present();
      })
      .catch((err) => {
        console.log(err);
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: err,
          buttons: [
            {
              text: "OK",
              handler: (data) => {
                // this.navCtrl.setRoot(ProfilePage);
              },
            },
          ],
        });
      });
  }

  update1(value) {
    let currentuser = firebase.auth().currentUser;
    firebase
      .firestore()
      .collection("Company")
      .doc("COM#" + currentuser.uid + "/" + "non-active" + "/" + this.value.id)
      .update(
        Object.assign({
          name: this.value.name,
          last: this.value.last,
          email: this.value.email,
          role: this.value.role,
        })
      )
      .then(() => {
        console.log("updated..");
        let alert = this.alertCtrl.create({
          title: "Sucess",
          subTitle: "Updated Sucessfully",
          buttons: [
            {
              text: "OK",
              handler: (data) => {
                // this.navCtrl.setRoot(ProfilePage);
              },
            },
          ],
        });
        alert.present();
      })
      .catch((err) => {
        console.log(err);
        let alert = this.alertCtrl.create({
          title: "Error",
          subTitle: err,
          buttons: [
            {
              text: "OK",
              handler: (data) => {
                // this.navCtrl.setRoot(ProfilePage);
              },
            },
          ],
        });
      });
  }
}
