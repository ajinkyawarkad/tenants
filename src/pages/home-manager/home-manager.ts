import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ManagerCreateCampaignPage } from '../manager-create-campaign/manager-create-campaign';
import { ManagerTrackCampaignPage } from '../manager-track-campaign/manager-track-campaign';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home-manager',
  templateUrl: 'home-manager.html',
})
export class HomeManagerPage {

  constructor(public navCtrl: NavController, private storage: Storage,public navParams: NavParams) {
  }

  ionViewDidLoad() {
    let name 
    let email 
    let cuid 
    let role
    let tenant 
    let pass 

    this.storage.get("name").then(val => {
      name = val
    })

    this.storage.get("email").then(val => {
     email = val
    })


    this.storage.get("cuid").then(val => {
      cuid = val
    })


    this.storage.get("role").then(val => {
      role =  val
    })


    this.storage.get("tenant").then(val => {
      tenant = val
    })

    this.storage.get("password").then(val => {
      pass = val
    })
    

    console.log('ionViewDidLoad HomeManagerPage');
  }
  createCampaigns()
  {
    this.navCtrl.push(ManagerCreateCampaignPage)
  }

  trackCampaigns(){
    this.navCtrl.push(ManagerTrackCampaignPage)
  }
}
