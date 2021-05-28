import { Component, ViewChild } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Leadd, Leadref } from '../../models/user';

import firebase, { database } from 'firebase/app';
import { Storage } from '@ionic/storage';

import { AngularFirestore} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { uuid } from 'uuidv4';
import { Observable } from 'rxjs';
import * as $ from "jquery";

interface Lead {
  status:string; 
  action:string;
}

@Component({
  selector: 'page-task-details',
  templateUrl: 'task-details.html',
})
export class TaskDetailsPage {
  public hideMe: boolean = false;
  public hideMe1: boolean = false;
  myDate;
  value:any;
  id:any;
  data:any;
  data1:any;
  arr:any=[]
  act;
  select;
 //refid:any;
  leadref = {} as Leadref;
  leadd = {} as Leadd;
  public products: Observable<Lead[]>;
 
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public afs: AngularFirestore,private storage: Storage, private auth:AngularFireAuth,
    public alertCtrl: AlertController,) {

      this.value = navParams.get('cid');
      console.log(this.value);
      

      // this.id = navParams.get('id');
      // console.log("lead id",this.id);

      this.data = navParams.get('data');
      console.log("Data",this.data);

      // this.data1 = navParams.get('data1');
      // console.log("Data1",this.data1);


      let currentuser=firebase.auth().currentUser;
      firebase.firestore().collection('Company').doc("COM#"+currentuser.uid+'/' +'Campaigns' +'/'+this.value.cid)
      .onSnapshot((doc) => {
        var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
        console.log(source, " data: "); 
        this.products =  doc.data().status ;
        this.arr=this.products;
         console.log(this.products) ;
 
    });
    
  }

  ionViewDidLoad() {
    
  
  }

  Getselected(selected_value) {
    let temp=[];
    
    console.log("SELECT",selected_value)
    this.select=selected_value
    let action;
      for (var s in this.arr){
        if (this.arr[s].status == selected_value){
          temp.push(this.arr[s])
          action=this.arr[s].action
          
        }
      }
      this.act=action
      console.log("TEMO",this.act)
      if(this.act === "Remove client from profile"){
        alert('this will remove this lead profile permently');
      }
  }


  Task(){
    console.log("SR name",this.data.SR_name)
    if(this.data.action && this.data.remark  != null){
    
    this.storage.get('cuid').then((val) => {
    console.log('id is', val);
    let uid = uuid();
    console.log(uid);
    let currentuser = firebase.auth().currentUser
    
    firebase.firestore().collection('Company').doc("COM#"+currentuser.uid+'/' +'Campaigns' +'/'+this.value.cid+'/'+'leads'+'/'+this.data.uid)
    .update(Object.assign({
    //id: uid,
    action:this.data.action,
    datetime:this.data.datetime,
    status: this.data.status,
    remark: this.data.remark
    },{merge:true}
    ))
    console.log("ACT IS ",this.act)
    console.log('SELECT',this.select)
  
    switch (this.act){
      case "Inform Manager":
        firebase.firestore().collection('Company').doc("COM#"+currentuser.uid+'/' +'Campaigns' +
        '/'+this.value.cid+'/'+'leads messages'+'/'+this.data.uid)
        .set(Object.assign({
              id: this.data.uid,
              message:"status upated to "+this.select+" "+"by" +" "+currentuser.displayName
        }
        ))
        break;
      case "Remove client from profile":
        firebase.firestore().collection('Company').doc("COM#"+currentuser.uid+'/' +'Campaigns' +'/'+this.value.cid+'/'+'leads'+'/'+this.data.uid).delete();
        console.log("DELETED", this.data.uid)
        break;

    }
   
    firebase.firestore().collection('Company').doc(currentuser.photoURL).collection('Campaigns').doc(this.value.cid).collection('leads')
    .doc(this.data.uid).collection('History')
    .doc('Activity1')
    .set({
     data:firebase.firestore.FieldValue.arrayUnion({

      Time: new Date(),
      Action:this.data.action,
      FollowUp:this.data.datetime,
      Remark:this.data.remark,
      name:this.data.uid,
      link:"https://google.com",
    
      Handler:this.data.SR_name,
      

     }) 
    },{merge:true}
    )
    var b = new Date().getMonth()+1;

    var c = new Date().getFullYear();
    var a = new Date().getDate();

    let date = a+'-'+b+'-'+c;
    let dat='';
    dat=date;
    console.log("Dateee",date)
    
    firebase.firestore().collection('Company').doc(currentuser.photoURL).collection('Admin').doc(currentuser.uid).collection('Report').
    doc(dat).set({
        data:firebase.firestore.FieldValue.arrayUnion({
        Time: new Date(),
        Action:this.data.action,
        FollowUp:this.data.datetime,
        Remark:this.data.remark,
        name:this.data.uid,
        link:"https://google.com"
      })
       
      },{merge:true}
    )
    
    
   
    let alert = this.alertCtrl.create({ 
    title: 'Success',
    subTitle: 'Saved Successfully',
    //scope: id,
    buttons: [{text: 'OK',
    handler: data => {
    this.navCtrl.pop();
    }
    }]
    });
    alert.present();
    
    });
    
    
    
    }else{
    
    let alert = this.alertCtrl.create({
    title: 'Warning',
    subTitle: 'Please Insert Data',
    //scope: id,
    buttons: [{text: 'OK',
    handler: data => {
    //this.navCtrl.push(LoginPage);
    }
    }]
    });
    alert.present();
    
    }
    
    }
  
  Save(leadref:Leadref){
    if(leadref.email && leadref.first_name && leadref.last_name && leadref.phone != null){
    
    this.storage.get('cuid').then((val) => {
    console.log('id is', val);
    let uid = uuid();
    console.log(uid);
    let currentuser = firebase.auth().currentUser
    
    firebase.firestore().collection('Company').doc("COM#"+currentuser.uid+'/' +'Campaigns' +'/'+this.value.cid+'/'+'Lead references'+'/'+uid)
    .set(Object.assign({
    id: uid,
    first_name:leadref.first_name,
    last_name:leadref.last_name,
    email: leadref.email,
    phone: leadref.phone,
    refId:this.data.uid
    }
    ))
    
   
    let alert = this.alertCtrl.create({ 
    title: 'Success',
    subTitle: 'Saved Successfully',
    //scope: id,
    buttons: [{text: 'OK',
    handler: data => {
    //this.navCtrl.push(UserDetailsPage);
    }
    }]
    });
    alert.present();
    
    });
    
    
    
    }else{
    
    let alert = this.alertCtrl.create({
    title: 'Warning',
    subTitle: 'Please Insert Data',
    //scope: id,
    buttons: [{text: 'OK',
    handler: data => {
    //this.navCtrl.push(LoginPage);
    }
    }]
    });
    alert.present();
    
    }
    
    }

  hide() {
    this.hideMe = true;
  }
  hide1() {
    this.hideMe1 = !this.hideMe1;
  }
  StartTask()
  {
    this.navCtrl.pop();
  }
  change(datePicker){
    console.log("date",this.myDate);
    console.log("datePicker",datePicker);
    datePicker.open();
  }
  ab()
  {
    console.log("date");
  }
  
 
}