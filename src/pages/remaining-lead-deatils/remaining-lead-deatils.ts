import { Component } from "@angular/core";
import firebase from "firebase";
import { AlertController, HideWhen } from "ionic-angular";
import { NavController, NavParams } from "ionic-angular";
import {  Observable } from "rxjs";
import { HomePage } from "../home/home";
import { TaskDetailsPage } from "../task-details/task-details";

@Component({
  selector: 'page-remaining-lead-deatils',
  templateUrl: 'remaining-lead-deatils.html',
})
export class RemainingLeadDeatilsPage {
  product:any;
  Segments: string;
  p: number = 1;
  field = [];
  val = [];
  uid: any;
  t=[];
  campid: any;
  data;
  arr:any=[];
  public hideMe1: boolean = false;
  public date:any;
  productss: Observable<any[]>;
  products:any;
  comments:any;
  prod:any
  pend:any=[]
  complete:any=[]
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController) {
   
    this.data = navParams.get("data");
    console.log("Data", this.data);

    this.campid = navParams.get("cid");
    console.log("camp id", this.campid);
    this.Segments = "1";
    
  }
  Add(){
   
    if (this.arr.length < 5) {
      this.arr.push({ value: "", indicator: "" });
    } else {
      alert("you reached to limit.. ");
    }
    this.Hide()
    }

    remove(idx) {
      this.arr.splice(idx, 1);
      }

    Hide(){
      
    this.hideMe1 = !this.hideMe1;
    }


    savefield()
  {
     
    let currentUser = firebase.auth().currentUser;
    firebase.firestore().collection('Company').doc(currentUser.photoURL).collection('Campaigns').doc(this.campid)
    .collection('leads').get().then(dat =>{
      dat.docs.forEach(snap => 
        {
          for(var z in this.arr){
            firebase.firestore().collection('Company').doc(currentUser.photoURL).collection('Campaigns').doc(this.campid)
            .collection('leads').doc(snap.data().uid).update({
              leads:firebase.firestore.FieldValue.arrayUnion(
                this.arr[z]
              )
            })

          }
  
        })
    })

  for(var x in this.arr){
    firebase.firestore().collection('Company').doc(currentUser.photoURL).collection('Campaigns').doc(this.campid)
    .update({
      CSVfield:firebase.firestore.FieldValue.arrayUnion(
        this.arr[x]
      )
    })

  }

 
    let alert = this.alertCtrl.create({
      title: 'Sucess',
      subTitle: ' Field Updated Successfully .. ',
      buttons: [
        {text: 'OK',
                handler: data => {
                 // this.navCtrl.push(HomePage)
                }   
              },
             
            ]
            });
    alert.present();
    
  }

  activity()
  {
    let cid=this.campid;
    let data=this.data;
    
    this.navCtrl.push(TaskDetailsPage,{
      cid,
      data,
    })
  }

  comment()
  {
    let alert = this.alertCtrl.create({
      title: 'Leave Comment',
      inputs: [{name: 'comment', placeholder: 'Comment'} ],
      buttons: [{text: 'Cancel',role: 'cancel',
             handler: data => {
             console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            if (data.comment) {
              console.log(data.comment);
              let currentuser=firebase.auth().currentUser;
              const result = firebase.firestore().collection('Company').doc(currentuser.photoURL).collection('Campaigns').doc(this.campid).collection('leads')
              .doc(this.data.uid).collection('History')
              .doc('Activity1')
              .set({
               comment:firebase.firestore.FieldValue.arrayUnion({
          
                Time: new Date(),
                Comment:data.comment
          
               }) 
              },{merge:true}
              )
              if(result)
              {
                
                let alert = this.alertCtrl.create({
                  title: 'Success',
                  subTitle: 'Comment Added',
                  buttons: [{text: 'OK',
                            handler: data => {
                             //this.navCtrl.setRoot(HomePage);
                            }
                          }]
                        });
                alert.present();
              }
             
            } else {
              
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemainingLeadDeatilsPage');

    let k = Object.keys(this.data);
    let v = Object.values(this.data);
    // console.log("TEMO", k);
    // console.log("TEMO", v);

    for (var i in k) {
     
      let r = k[i];
      let rr = v[i];
      if (r !== "SR_id" && r !== "SR_name"  && r !== "complete" && r !== "uid" && r !== "leads" && r !== "merge") {
      if (r !== "action" && r !== "datetime" && r !== "status" && r !== "remark" && r!== "createdAt") {
        this.field.push({"action":r, "val":rr});
      }
      } 
      // console.log("field", this.field);
    }
    let as = this.data
    let s;
    // for(s=0;s<1;s++){
    //   this.t.push({"action":"Created At","val":as.createdAt.toDate()})
    // }
   
   
    let cu = firebase.auth().currentUser.uid;

    firebase
      .firestore()
      .collection("Company")
      .doc("COM#" + cu)
      .collection("Campaigns")
      .doc(this.campid)
      .collection("leads")
      .doc(this.data.uid)
      .collection("History")
      .doc("Activity1")
      //.where("Completed","==","true")
      .get()
      .then((doc) => {
        if (doc.data()) {
          firebase
            .firestore()
            .collection("Company")
            .doc("COM#" + cu)
            .collection("Campaigns")
            .doc(this.campid)
            .collection("leads")
            .doc(this.data.uid)
            .collection("History")
            .doc("Activity1")
            .onSnapshot((doc) => {
              var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
              console.log(source, " data: ");
              this.prod = doc.data().data;
              console.log("pendings",this.prod)
              for(var i in this.prod){
                if(this.prod[i].Completed == false)
                {
                  this.pend.push(this.prod[i])
                  
                }
                else{
                  this.complete.push(this.prod[i])
                }
                
              }
              console.log("pendings",this.pend)
            });
        }else{
          console.log('DATA EMPTY')
        }
      });
    
      
     
     
      

      firebase
      .firestore()
      .collection("Company")
      .doc("COM#" + cu)
      .collection("Campaigns")
      .doc(this.campid)
      .collection("leads")
      .doc(this.data.uid)
      .collection("History")
      .doc("Activity1")
      .get()
      .then((doc) => {
        if (doc.data()) {
          firebase
            .firestore()
            .collection("Company")
            .doc("COM#" + cu)
            .collection("Campaigns")
            .doc(this.campid)
            .collection("leads")
            .doc(this.data.uid)
            .collection("History")
            .doc("Activity1")
            .onSnapshot((doc) => {
              var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
              console.log(source, " data: ");
              this.comments = doc.data().comment;
            });
        }else{
          console.log('DATA EMPTY')
        }
      });
   }
  }
  


