import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-manager-task-details',
  templateUrl: 'manager-task-details.html',
})
export class ManagerTaskDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagerTaskDetailsPage');
  }

}
