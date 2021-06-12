import { Component } from '@angular/core';
 import { AlertController, LoadingController, MenuController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EditCampaignsDetailsPage } from '../edit-campaigns-details/edit-campaigns-details';
import { LeadsDetailsPage } from '../leads-details/leads-details';


import { LoginPage } from '../login/login';
import { AngularFirestore} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import firebase from 'firebase';
import { Counts } from '../../models/user';
import { ToastController } from 'ionic-angular';
import { PendingLeadsPage } from '../pending-leads/pending-leads';
import { ManagerLeadDetailsPage } from '../manager-lead-details/manager-lead-details';
import { ManagerEditCampaignPage } from '../manager-edit-campaign/manager-edit-campaign';

@Component({
  selector: 'page-manager-track-campaign',
  templateUrl: 'manager-track-campaign.html',
})
export class ManagerTrackCampaignPage {
  counts = {} as Counts;
  descending: boolean = false;
order: number;
column: string = 'name';

  public anArray: any = [];
  public arr = [];
  public a;
  AllPendings:any =[];
  Segments: string;
  userInfo: any;
  products: any;
  pc = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afs: AngularFirestore,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toast: ToastController,
  ) {
    this.Segments = "1";
    //this.menuCtrl.enable(true, 'menu');
  }


  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }


  //=======================================Count===================
  ionViewDidLoad() {
    let currentuser = firebase.auth().currentUser;
    let cu = currentuser.uid;
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
    .doc("COM#" + cu)
    .collection("Admin")
    .doc(cu)
    .get()
    .then((doc) => {
      this.a = doc.data().function;   //==============Getting FLAG================
    })


    firebase
      .firestore()
      .collection("Company")
      .doc("COM#" + cu)
      .collection("Admin")
      .doc(cu)
      .get()
      .then((doc) => {
        this.a = doc.data().function;
        firebase
          .firestore()
          .collection("Company")
          .doc("COM#" + currentuser.uid)
          .collection("Campaigns")
          .get()
          .then((doc) => {
            doc.docs.forEach((snap) => {
              let call = [];
              let meet =[];
              this.arr.push(snap.data().cid);  //All Campaigns IDs

              firebase
                .firestore()
                .collection("Company")
                .doc("COM#" + currentuser.uid)
                .collection("Campaigns")
                .doc(snap.data().cid)
                .collection("leads")
                .get()
                .then((data) => {     
                  if(this.a){   
                    firebase
                    .firestore()
                    .collection("Company")
                    .doc("COM#" + currentuser.uid)
                    .collection("Campaigns")
                    .doc(snap.data().cid)
                    .collection("leads")
                    .get()
                     .then((docu) => {
                      console.log(docu.docs.length); // ==========ALL LEAD COUNT IN CAMP
                      data.docs.forEach(snap2 =>{
                         let action = snap2.data().action;
                         let t = Date.parse(snap2.data().datetime);
                         switch (action){                                 //Switching Action For Specific counts
                           case "Callback":
                             if(t<d1){
                               call.push(t);
                               this.AllPendings.push(snap2.data())
                            }else{break;}
                             break;
                           case "Schedule Meet"  :
                            if(t<d1){
                              meet.push(t);
                              this.AllPendings.push(snap2.data())
                           }else{break;}
                            break;
                         }
                      })
                     
                      firebase                      //===============Writing Counts back to DB================
                      .firestore()
                      .collection("Company")
                      .doc("COM#" + currentuser.uid)
                      .collection("Campaigns")
                      .doc(snap.data().cid)  //===================MAin CampId return from docsForEach on camps collection
                      .update({
                        pendingCalls: call.length,
                        pendingMeets: meet.length,
                        pendings: call.length + meet.length
                      });
                      
                    })
                  }
                  // console.log("Inserted",snap.data().cid,meet,call);
                 
                 // console.log("Toal lead counts", snap.data().cid, data.size);
                  firebase
                    .firestore()
                    .collection("Company")
                    .doc("COM#" + currentuser.uid)
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
      spinner: 'bubbles',
      content: 'Loading...',
    });
    loading.present();
    this.userInfo = this.afs.collection("Company").doc("COM#" + currentuser.uid).collection("Campaigns");
    this.products = this.userInfo.valueChanges();
    this.pc = this.products

   
    for (var z in this.pc){
      console.log("PC",this.pc[z])
    }
    loading.dismiss();
   
    console.log("ionViewDidLoad TrackCampaignPage");
  }


  //==================

  pendigDetails(AllPendings){
    this.navCtrl.push(PendingLeadsPage, {
      AllPendings : this.AllPendings 

    })
  }


  gotoActive(product) {
    this.navCtrl.push(ManagerEditCampaignPage, {
      product: product,
    });
  }

  showPopup(value) {
    let alert = this.alertCtrl.create({
      title: "Confirm Delete",
      subTitle: "Do you really want to delete?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "OK",

          handler: (data) => {
            console.log(value);
            this.deleteItem1(value);
          },
        },
      ],
    });
    alert.present();
  }

  archive(value)
  {
    console.log(value)
    let currentuser = firebase.auth().currentUser;
    this.afs
      .collection("Company")
      .doc("COM#" + currentuser.uid + "/" + "Campaigns" + "/" + value.cid)
      .update(Object.assign({
        active:false
        } 
      )).then(() => {

        this.toast.create({
          message : value.name + ' ' + 'is Archived',
          duration:1000,
          position:'top'
        }).present();
  
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

  active(value)
  {
    console.log(value)
    let currentuser = firebase.auth().currentUser;
    this.afs
      .collection("Company")
      .doc("COM#" + currentuser.uid + "/" + "Campaigns" + "/" + value.cid)
      .update(Object.assign({
        active:true
        } 
      )).then(() => {

        this.toast.create({
          message : value.name + ' ' + 'is Active now',
          duration:1000,
          position:'top'
        }).present();
        
        // let alert = this.alertCtrl.create({
        //   title: 'Sucess',
        //   subTitle: value.name + ' ' + 'is back to Active now',
        //   buttons: [{text: 'OK',
        //             handler: data => {
        //            // this.navCtrl.setRoot(ProfilePage);
        //             } 
        //           }]
        //         });
        // alert.present();
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

  deleteItem1(value) {
    let currentuser = firebase.auth().currentUser;
    this.afs
      .collection("Company")
      .doc("COM#" + currentuser.uid + "/" + "Campaigns" + "/" + value)
      .delete();
  }

 
  leads(product) {
    this.navCtrl.push(ManagerLeadDetailsPage, {
      product: product,
    });
  }
  


}
