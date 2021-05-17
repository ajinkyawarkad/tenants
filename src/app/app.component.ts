import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, Platform,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ReportPage } from '../pages/report/report';

import { CreateCampaignPage } from '../pages/create-campaign/create-campaign';
import { TrackCampaignPage } from '../pages/track-campaign/track-campaign';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { TaskDetailsPage } from '../pages/task-details/task-details';


import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../pages/profile/profile';
import {  } from 'ionic-angular';
import { CreateCampaignsLeadPage } from '../pages/create-campaigns-lead/create-campaigns-lead';
import { CreateLeadProfilePage } from '../pages/create-lead-profile/create-lead-profile';
import { CreateNewCampleadPage } from '../pages/create-new-camplead/create-new-camplead';
import { UserlistPage } from '../pages/userlist/userlist';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 @ViewChild(Nav) nav: Nav;

  rootPage: any =  HomePage;

  public name: any;

 
  pages: Array<{title: string, component: any, icon: string}>;
 
  constructor(private auth:AngularFireAuth,private storage: Storage,
    public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private menuctrl:MenuController) {
     
    this.initializeApp();
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home',  component: HomePage , icon:'home'},
      { title: 'Reports', component: ReportPage, icon:'document' },
      { title: 'Users', component: UserDetailsPage, icon:'people' },
      { title: 'Create Campaigns', component: CreateCampaignPage, icon:'person-add' },
      { title: 'Track Campaigns', component: TrackCampaignPage , icon:'copy'},
      { title: 'Account', component: AccountPage, icon:'settings' },
     // { title: 'Sign Out', component: LoginPage, icon:'log-out'},   
    ];


    }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);   
  }

  logout(){ 
    this.storage.remove('email').then((user) =>{
      console.log(user);
    })
    this.storage.remove('name').then((user) =>{
      console.log(user);
    })
    this.menuctrl.close();
    this.nav.setRoot(LoginPage);
  }

  
}
