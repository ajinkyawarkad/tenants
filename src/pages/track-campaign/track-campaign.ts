import { Component } from "@angular/core";
import {AlertController,LoadingController,MenuController,} from "ionic-angular";
import { NavController, NavParams } from "ionic-angular";

import { EditCampaignsDetailsPage } from "../edit-campaigns-details/edit-campaigns-details";
import { LeadsDetailsPage } from "../leads-details/leads-details";
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from "firebase";
import { Counts } from "../../models/user";
import { ToastController } from "ionic-angular";
import { PendingLeadsPage } from "../pending-leads/pending-leads";

@Component({
  selector: "page-track-campaign",
  templateUrl: "track-campaign.html",
})
export class TrackCampaignPage {
  counts = {} as Counts;
  descending: boolean = false;
  order: number;
  column: string = "name";

  public anArray: any = [];
  public arr = [];
  public a;
  AllPendings: any = [];
  Segments: string;
  userInfo: any;
  products: any;
  pc = [];
 currentuser = firebase.auth().currentUser;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afs: AngularFirestore,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toast: ToastController
  ) {
    this.Segments = "1";
    //this.menuCtrl.enable(true, 'menu');
  }

  sort() {
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

  //=======================================Count===================
  ionViewDidLoad() {
    
    let cu = this.currentuser.uid;
    let b = [];
    let d = new Date().getDate();
    let m = new Date().getMonth() + 1;
    let y = new Date().getFullYear();
    let fd = y + "-" + m + "-" + d;
    // let a = new Date(fd);
    var d1 = Date.parse(fd);

    //==================Total Leads Vs ADMIN=================================
    firebase
      .firestore()
      .collection("Company")
      .doc(this.currentuser.photoURL)
      .collection("Admin")
      .doc(cu)
      .get()
      .then((doc) => {
        this.a = doc.data().function; //==============Getting FLAG================
      });

    firebase
      .firestore()
      .collection("Company")
      .doc(this.currentuser.photoURL)
      .collection("Admin")
      .doc(cu)
      .get()
      .then((doc) => {
        this.a = doc.data().function;
        firebase
          .firestore()
          .collection("Company")
          .doc(this.currentuser.photoURL)
          .collection("Campaigns")
          .get()
          .then((doc) => {
            doc.docs.forEach((snap) => {
              let call = [];
              let meet = [];
              this.arr.push(snap.data().cid); //All Campaigns IDs

              firebase
                .firestore()
                .collection("Company")
                .doc(this.currentuser.photoURL)
                .collection("Campaigns")
                .doc(snap.data().cid)
                .collection("leads")
                .get()
                .then((data) => {
                  if (this.a) {
                    firebase
                      .firestore()
                      .collection("Company")
                      .doc(this.currentuser.photoURL)
                      .collection("Campaigns")
                      .doc(snap.data().cid)
                      .collection("leads")
                      .get()
                      .then((docu) => {
                      
                        data.docs.forEach((snap2) => {
                          let action = snap2.data().action;
                          let t = Date.parse(snap2.data().datetime);
                          switch (
                            action //Switching Action For Specific counts
                          ) {
                            case "Callback":
                              if (t <=d1) {
                                call.push(t);
                               
                                firebase
                                .firestore()
                                .collection("Company")
                                .doc(this.currentuser.photoURL)
                                .collection("Campaigns")
                                .doc(snap.data().cid)
                                .collection("leads").doc(snap2.data().uid).set({
                                  pending:true
                                },{merge:true})
                                // this.AllPendings.push(snap2.data());
                              } else {
                                break;
                              }
                              break;
                            case "Schedule Meet":
                              if (t <= d1) {
                                meet.push(t);
                                
                                firebase
                                .firestore()
                                .collection("Company")
                                .doc(this.currentuser.photoURL)
                                .collection("Campaigns")
                                .doc(snap.data().cid)
                                .collection("leads").doc(snap2.data().uid).set({
                                  pending:true
                                },{merge:true})
                                // this.AllPendings.push(snap2.data());
                              } else {
                                break;
                              }
                              break;

                              case "Send Mail":
                              if (t <= d1) {
                                meet.push(t);
                                
                                firebase
                                .firestore()
                                .collection("Company")
                                .doc(this.currentuser.photoURL)
                                .collection("Campaigns")
                                .doc(snap.data().cid)
                                .collection("leads").doc(snap2.data().uid).set({
                                  pending:true
                                },{merge:true})
                                // this.AllPendings.push(snap2.data());
                              } else {
                                break;
                              }
                              break;
                          }
                        });

                        firebase //===============Writing Counts back to DB================
                          .firestore()
                          .collection("Company")
                          .doc(this.currentuser.photoURL)
                          .collection("Campaigns")
                          .doc(snap.data().cid) //===================MAin CampId return from docsForEach on camps collection
                          .update({
                            // pendingCalls: call.length,
                            // pendingMeets: meet.length,
                            pendings: call.length + meet.length,
                          });
                      });
                  }
                  
                  firebase
                    .firestore()
                    .collection("Company")
                    .doc(this.currentuser.photoURL)
                    .collection("Campaigns")
                    .doc(snap.data().cid)
                    .update({
                      totalLeads: data.size,
                    });
                });
            });
          });
      });

    //================================================================
    // let i;
    // let n = this.arr.length;
    // for(i=0;i<n;i++){

    // }
    let loading = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Loading...",
    });
    loading.present();
    this.userInfo = this.afs
      .collection("Company")
      .doc(this.currentuser.photoURL)
      .collection("Campaigns");
    this.products = this.userInfo.valueChanges();
    this.pc = this.products;
   
    loading.dismiss();

  }

  //==================

  pendigDetails(id) {
    this.navCtrl.push(PendingLeadsPage, {
      cid: id,
    });
  }

  gotoActive(product) {
    this.navCtrl.push(EditCampaignsDetailsPage, {
      product: product,
    });
  }

  showPopup(value, Sr_id,manager) {
    let alert = this.alertCtrl.create({
      title: "Confirm Delete",
      subTitle: "Do you really want to delete?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          
        },
        {
          text: "OK",

          handler: (data) => {
           
            this.deleteItem1(value, Sr_id,manager);
          },
        },
      ],
    });
    alert.present();
  }

  archive(value) {
  
    this.afs
      .collection("Company")
      .doc(this.currentuser.photoURL + "/" + "Campaigns" + "/" + value.cid)
      .update(
        Object.assign({
          active: false,
        })
      )
      .then(() => {
        this.toast
          .create({
            message: value.name + " " + "is Archived",
            duration: 1000,
            position: "top",
          })
          .present();
      })
      .catch((err) => {
       
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

  active(value) {
  
    
    this.afs
      .collection("Company")
      .doc(this.currentuser.photoURL + "/" + "Campaigns" + "/" + value.cid)
      .update(
        Object.assign({
          active: true,
        })
      )
      .then(() => {
        this.toast
          .create({
            message: value.name + " " + "is Active now",
            duration: 1000,
            position: "top",
          })
          .present();
      })
      .catch((err) => {
       
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

  deleteItem1(value, Sr_id,manager) {
    
    this.afs
      .collection("Company")
      .doc(this.currentuser.photoURL + "/" + "Campaigns" + "/" + value)
      .delete();

    for (var i in Sr_id) {
      firebase
        .firestore()
        .collection("Company")
        .doc(this.currentuser.photoURL)
        .collection("Users")
        .doc(Sr_id[i])
        .collection("CampsAsso")
        .doc(value)
        .delete();
    }

    firebase
    .firestore()
    .collection("Company")
    .doc(this.currentuser.photoURL)
    .collection("Users")
    .doc(manager)
    .collection("CampsAsso")
    .doc(value)
    .delete();

  }

  leads(product) {
    this.navCtrl.push(LeadsDetailsPage, {
      product: product,
    });
  }
}
