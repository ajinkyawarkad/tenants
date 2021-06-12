import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-manager-create-lead-profile',
  templateUrl: 'manager-create-lead-profile.html',
})
export class ManagerCreateLeadProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagerCreateLeadProfilePage');
  }

}
