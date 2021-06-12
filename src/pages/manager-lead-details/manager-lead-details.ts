import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-manager-lead-details',
  templateUrl: 'manager-lead-details.html',
})
export class ManagerLeadDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagerLeadDetailsPage');
  }

}
