import { Component } from "@angular/core";
import {
  AlertController,
  LoadingController,
  MenuController,
} from "ionic-angular";
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

   

    //==================Total Leads Vs ADMIN================================

    firebase
      .firestore()
      .collection("Company")
      .doc(this.currentuser.photoURL)
      .collection("Admin")
      .doc(cu)
      .get()
      .then((doc) => {
        this.a = doc.data().function;
        if (this.a) {
         
          firebase
            .firestore()
            .collection("Company")
            .doc(this.currentuser.photoURL)
            .collection("Campaigns")
            .get()
            .then((camps) => {

              camps.docs.forEach((campDoc) => {             //Camp Ids
              
               
                campDoc.ref
                  .collection("leads")
                  .get()
                  .then((leads) => {
                    campDoc.ref.update({
                      totalLeads:leads.size
                    })
                    leads.docs.forEach((leadDoc) => {
                      leadDoc.ref.get().then((inlead) => {
                        let pendings = [];
                        let onlyIds=[];
                        let call = [];
                        let meet = [];
                        let allTask = [];
                        let tru = [];
                        let f = [];
                        let flag =  inlead.data().pending
                        if(flag == true){
                          call.push(inlead.data().action)

                        }
                        let action = inlead.data().action;
                        let t = Date.parse(inlead.data().datetime);
                        leadDoc.ref
                          .collection("History")
                          .doc("Activity1")
                          .get()
                          .then((taskDoc) => {
                            if (taskDoc.exists) {
                              allTask = taskDoc.data().data;
                              for (var i in allTask) {
                                if (allTask[i].Completed == true) {
                                  if(allTask[i].Action !== "None"){
                                    tru.push(allTask[i].id);
                                  }else{
                                    console.log("None")
                                  }
                                 
                                } else {
                                  f.push(allTask[i]);
                                }
                              }
                                let xp =[]
                                let xnp =[]
                                for (var i in f) {
                                  let is = tru.includes(f[i].id);
                                  console.log("is",is)
                                 
                                  switch (is) {
                                    case true:
                                      break;
                                    case false:
                                      onlyIds.push(f[i].id)
                                      pendings.push({"id":f[i].id,"date":f[i].FollowUp});
                                      let da = Date.parse(f[i].FollowUp);
                                      if(da <= d1){
                                        xp.push(f[i])
                                        
                                      }else{
                                       xnp.push(f[i])
                                      }
                                      break;
                                  }
                                }
                                console.log("Xp",xp)
                                console.log("Xnp",xnp)
                                
                                if(xp.length){
                                  let b = xp.length-1
                                  leadDoc.ref.set({
                                    action:xp[b].Action,
                                    remark:xp[b].Remark,
                                    datetime:xp[b].FollowUp,
                                    status:xp[b].Status,
                                    taskId:xp[b].id,
                                    pending:true
                                  },{merge:true})

                                }else{
                                  if(xnp.length){
                                    let l = xnp.length-1
                                    leadDoc.ref.set({
                                      action:xnp[l].Action,
                                      remark:xnp[l].Remark,
                                      datetime:xnp[l].FollowUp,
                                      status:xnp[l].Status,
                                      taskId:xnp[l].id,
                                      pending:false
                                    },{merge:true})

                                  }else{
                                    leadDoc.ref.set({
                                      action:"",
                                      remark:"",
                                      datetime:"",
                                      status:"",
                                      taskId:"",
                                      pending:false
                                    },{merge:true})


                                  }
                                 
                                 
                                
                                }

                              
                              inlead.ref.set({
                                allTasks:onlyIds.length,
                                taskIds:onlyIds
                              },{merge:true})
                              campDoc.ref.update({
                                pendings:call.length
                              })
                            }else{
                             console.log("doc activity not exists")
                            }
                          });
                         
                          
                      });
                    });
                  });
                 
                  


              });
            });

        } else {
          this.ionViewDidLoad()
          firebase
          .firestore()
          .collection("Company")
          .doc(this.currentuser.photoURL)
          .collection("Campaigns")
          .get().then((camps) => {
            camps.docs.forEach((campDoc) => {  
              campDoc.ref.collection("leads").get().then(leads =>{
                campDoc.ref.update({
                  totalLeads:leads.size
                })
              })
             })
          })
          
         
        }
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

  showPopup(value, Sr_id, manager) {
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
            this.deleteItem1(value, Sr_id, manager);
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

  deleteItem1(value, Sr_id, manager) {
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
