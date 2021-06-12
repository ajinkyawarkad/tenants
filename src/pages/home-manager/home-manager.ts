import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ManagerCreateCampaignPage } from '../manager-create-campaign/manager-create-campaign';
import { ManagerTrackCampaignPage } from '../manager-track-campaign/manager-track-campaign';


@Component({
  selector: 'page-home-manager',
  templateUrl: 'home-manager.html',
})
export class HomeManagerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
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
