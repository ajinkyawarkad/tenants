import { Component } from '@angular/core';
import { AlertController,  NavController, NavParams } from 'ionic-angular';
import { CreateCampaignsLeadPage } from '../create-campaigns-lead/create-campaigns-lead';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Http } from '@angular/http';

import * as $ from "jquery";
import * as papa from 'papaparse';
import { HomePage } from '../home/home';
import { CreateNewCampleadPage } from '../create-new-camplead/create-new-camplead';
import firebase from 'firebase';
import { Camp } from '../../models/user';
import { v4 as uuid } from 'uuid';
import { TrackCampaignPage } from '../track-campaign/track-campaign';


@Component({
  selector: 'page-create-lead-profile',
  templateUrl: 'create-lead-profile.html',
})
export class CreateLeadProfilePage {

  public form: FormGroup;
 
   public headerRow: any;
   csvContent: any;
   csvData: any;
   value :any;
   public anArray:any=[];
   data:any;
   index:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private _FB   : FormBuilder, private http: Http
  ,private alertCtrl:AlertController,public navParam:NavParams) {
    this.value = this.navParams.get('item');  
    console.log(this.value);
  }
 

    Add(){
    this.anArray.push({'value':''}); 
    }

    remove(idx)
    {
      this.anArray.splice(idx, 1);
    }
  

  ionViewDidLoad() {
    $('table#mytable tr').each(function() {
    if ($(this).children('td').length < 0) {
        $(this).hide();
    }
      else
    {
      $(this).show();
    }
});
    console.log('ionViewDidLoad CreateLeadProfilePage');
  }

  onFileSelect(input: HTMLInputElement) {
    const files = input.files;
    var content = this.csvContent;
    
   if (files && files.length) {
        const fileToRead = files[0];
        const fileReader = new FileReader();
        //fileReader.onload = this.onFileLoad;

        fileReader.onload = () => {
          fileReader.result; // This is valid
          //console.log(fileReader.result)
          this.extractData(fileReader.result);
       };
        fileReader.readAsText(fileToRead, "UTF-8");
   }
  }

  extractData(res) {
    let csvData = res;
    let parsedData = papa.parse(csvData).data;
    this.headerRow = parsedData[0];
   // console.log( this.headerRow);
    var match =this.headerRow.toString().split(',');
    console.log(match)
   
    for (var a in match)
    {
        var variable = match[a]
       // console.log(variable)
       this.anArray.push({"value":variable})
    }
    console.log(this.anArray);    
  }


  savefield()
  {
     let Mainheader =this.anArray;
    console.log(Mainheader); 
   
    let currentUser = firebase.auth().currentUser;
    firebase.firestore().collection('Company').doc(currentUser.photoURL).collection('Campaigns').doc(this.value)
    .update({
      CSVfield:Mainheader
    })
    let alert = this.alertCtrl.create({
      title: 'Sucess',
      subTitle: ' Field Added Successfully .. Now you can add lead ',
      buttons: [
        {text: 'OK',
                handler: data => {
                  this.navCtrl.push(CreateNewCampleadPage, 
                    {
                    item:this.value
                    });
                } 
              },
              {
                text: "Cancel",
                role: "cancel",
                handler: () => {
                  console.log("Cancel clicked");
                  this.navCtrl.push(HomePage);
                },
              },
            ]
            });
    alert.present();
    
  }

  upload(isChecked: boolean){
    
    let Mainheader =this.anArray;
    console.log(Mainheader); 
   
    let currentUser = firebase.auth().currentUser;
    firebase.firestore().collection('Company').doc(currentUser.photoURL).collection('Campaigns').doc(this.value)
    .update({
      CSVfield:Mainheader
    }
    )
    
    
     var adminId= firebase.auth().currentUser.uid;
     var file_data = $('#myfile').prop('files')[0];
 
   firebase.storage().ref("users").child(adminId +"/"+ this.value + "/file.csv").put(file_data);
  
   let alert = this.alertCtrl.create({
    title: 'Sucess',
    subTitle: ' File Uploaded Successfully',
    buttons: [{text: 'OK',
              handler: data => {
              // this.navCtrl.setRoot(HomePage);
              } 
            }]
          });
  alert.present();
  } 

  save1(){
   // this.navCtrl.push(CreateCampaignsLeadPage);
   this.navCtrl.push(CreateNewCampleadPage, 
    {
    item:this.value
    });

   
  }
 
  
}