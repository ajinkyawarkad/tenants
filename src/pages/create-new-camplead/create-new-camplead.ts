import { Component } from '@angular/core';
import { AlertController,  NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import firebase from 'firebase';
import { Observable } from 'rxjs';
import { Lead } from '../../models/user';
import { Storage } from '@ionic/storage';
import { v4 as uuid } from 'uuid';
import { data } from 'jquery';
import { LeadsDetailsPage } from '../leads-details/leads-details';
import { HomePage } from '../home/home';
import { getAllJSDocTagsOfKind, isSpreadAssignment } from 'typescript';


interface Camps {
   name:string;
     
 }


@Component({
  selector: 'page-create-new-camplead',
  templateUrl: 'create-new-camplead.html',
})
export class CreateNewCampleadPage {
  hideMe=false;
  public form: FormGroup;
  products: Observable<Camps[]>;
  productss: Observable<Camps[]>;
 
  lead = {} as Lead;
  
  public anArray:any=[]; 
  public det:any=[];
  public hed:any=[];
  cust=[]
  data2=[]
    value:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController,
   private storage: Storage) {


   this.value = this.navParams.get('item');  
   console.log("camp id",this.value);
  }
n
  ionViewDidLoad() {
   let currentuser=firebase.auth().currentUser;
   firebase.firestore().collection('Company').doc('COM#'+currentuser.uid).collection('Campaigns').doc(this.value).onSnapshot((doc) => {
     var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
     console.log(source, " data: ");
     this.products =  doc.data().CSVfield ;
     console.log(this.products) ;
     this.anArray=this.products
 });

 firebase.firestore().collection('Company').doc('COM#'+currentuser.uid).collection('Admin').doc(currentuser.uid)
 .onSnapshot((doc) => {
 var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
 console.log(source, " data: ");
 this.productss = doc.data().Users ;
 console.log(this.productss) ;
 });
    console.log('ionViewDidLoad CreateNewCampleadPage');
  }
  hide() {
    this.hideMe = true;
  }

  
  insertLead(data){

    data:{



    }
   




   
    this.storage.get('cuid').then((val) => {
      console.log('id is', val);
      let uuid1 = uuid()
      console.log("uuid",uuid);
      console.log("camp id",this.value.cid);
      console.log("data",data)

     
     
    for(var a in this.anArray){
      if(this.anArray[a].indicator == "None"){
        this.cust.push(this.anArray[a])
      }else{
        // this.data2.push({[x]:y})
      firebase.firestore().collection('Company').doc(val).collection('Campaigns').doc(this.value)
      .collection('leads').doc(uuid1)
      .set( {
          [this.anArray[a].indicator]: this.anArray[a].action
        },{merge:true})
      }
    }
    console.log("Main",this.data2)
    console.log("Custome",this.cust)
    
  
     firebase.firestore().collection('Company').doc(val).collection('Campaigns').doc(this.value)
     .collection('leads').doc(uuid1)
     .set(Object.assign({
      leads:this.cust,
      SR_id:data.id,
      SR_name:data.name+" "+data.last,
      uid:uuid1 
      }  
    ),{merge:true}) 
    .then(()=>{
     let alert = this.alertCtrl.create({
       title: 'Success',
       subTitle: 'Lead added Successfully',
       //scope: id,
       buttons: [{text: 'OK',
                 handler: data => {
                 this.navCtrl.push(HomePage);
                  } 
               }
              
              ]
             });
     alert.present();
    })
   
 
    }).catch((err) => {
      console.log(err); 
      let alert = this.alertCtrl.create({
        //title: 'Error',
        subTitle:  'Problem in adding Lead' ,
        buttons: [{text: 'OK',
                  handler: data => {
                  } 
                }]
              });
      alert.present();
    });
  }

}