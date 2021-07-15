import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { SettingsPage } from '../settings/settings';
import { UserLicensesPage } from '../user-licenses/user-licenses';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }
  profile(){
    this.navCtrl.push(ProfilePage);
  }
  settings()
  {
    this.navCtrl.push(SettingsPage);
  }
  userlicenses()
  {
    this.navCtrl.push(UserLicensesPage);
  }

}
