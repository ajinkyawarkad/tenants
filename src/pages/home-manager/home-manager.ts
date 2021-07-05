import { Component } from '@angular/core';
import { MenuController,ToastController } from 'ionic-angular';
import {  NavController, NavParams } from 'ionic-angular';
import { ManagerCreateCampaignPage } from '../manager-create-campaign/manager-create-campaign';
import { ManagerTrackCampaignPage } from '../manager-track-campaign/manager-track-campaign';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { ManagerReportPage } from '../manager-report/manager-report';

@Component({
  selector: 'page-home-manager',
  templateUrl: 'home-manager.html',
})
export class HomeManagerPage {
  isLoggedIn: Boolean;
  public name:string;
  public email:any;

  constructor(private toast: ToastController,private auth:AngularFireAuth,public menuCtrl:MenuController,private storage: Storage,public navCtrl: NavController, public navParams: NavParams) {
    this.menuCtrl.enable(true, 'menu');
    this.storage.get('name').then((name) => {
      console.log('name', name);
      this.name=name;
      //this.isLoggedIn = true;
   });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeManagerPage');
    this.auth.authState.subscribe(data => {
      if(data.email && data.uid){
        console.log(data.email);
          this.toast.create({
        message : "Welcome"+ " " + data.email,
        duration:3000,
        position:'top'
      }).present();
      
    }
    else{
      this.toast.create({
        message : 'Could not Found User',
        duration:3000
      }).present();
    }
    });
  }
  createCampaigns()
  {
    this.navCtrl.push(ManagerCreateCampaignPage)
  }

  trackCampaigns(){
    this.navCtrl.push(ManagerTrackCampaignPage)
  }
  report()
  {
      this.navCtrl.push(ManagerReportPage)
  }
  
}
