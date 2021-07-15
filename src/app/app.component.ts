import { Component, ViewChild } from "@angular/core";
import { Nav, Platform, MenuController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";
import { ReportPage } from "../pages/report/report";

import { CreateCampaignPage } from "../pages/create-campaign/create-campaign";
import { TrackCampaignPage } from "../pages/track-campaign/track-campaign";
import { AccountPage } from "../pages/account/account";
import { LoginPage } from "../pages/login/login";
import { UserDetailsPage } from "../pages/user-details/user-details";


import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase";
import { Storage } from "@ionic/storage";

import {} from "ionic-angular";
import { HomeManagerPage } from "../pages/home-manager/home-manager";
import { HomeUserPage } from "../pages/home-user/home-user";
import { ManagerReportPage } from "../pages/manager-report/manager-report";
import { ManagerCreateCampaignPage } from "../pages/manager-create-campaign/manager-create-campaign";
import { ManagerTrackCampaignPage } from "../pages/manager-track-campaign/manager-track-campaign";

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  public name: any;

  pages: Array<{ title: string; component: any; icon: string }>;

  constructor(
    private auth: AngularFireAuth,
    private storage: Storage,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private menuctrl: MenuController
  ) {
    this.initializeApp();

    let currentuser = firebase.auth().currentUser;

    this.storage.get("email").then((val) => {
      console.log("email", val);

      if (val != null) {
        console.log("Not Null");
        this.storage.get("tenant").then((tenantId) => {
          this.storage.get("userId").then((uid) => {
            firebase
              .firestore()
              .collection("Company")
              .doc(tenantId)
              .collection("Users")
              .doc(uid)
              .get()
              .then((doc) => {
                if (!doc.exists) {
                  this.pages = [
                    { title: "Home", component: HomePage, icon: "home" },
                    { title: "Reports", component: ReportPage, icon: "document" },
                    { title: "Users", component: UserDetailsPage, icon: "people" },
                    {
                      title: "Create Campaigns",
                      component: CreateCampaignPage,
                      icon: "person-add",
                    },
                    { title: "Track Campaigns", component: TrackCampaignPage, icon: "copy" },
                    { title: "Account", component: AccountPage, icon: "settings" },
                    // { title: 'Sign Out', component: LoginPage, icon:'log-out'},
                  ];

                } else {
                  let role = doc.data().role
                  switch (role) {
                    case "Manager":
                      this.pages = [
                        { title: "Home", component: HomeManagerPage, icon: "home" },
                        { title: "Reports", component: ManagerReportPage, icon: "document" },
                       
                        {
                          title: "Create Campaigns",
                          component: ManagerCreateCampaignPage,
                          icon: "person-add",
                        },
                        { title: "Track Campaigns", component: ManagerTrackCampaignPage, icon: "copy" },
                        { title: "Account", component: HomeManagerPage, icon: "settings" },
                        // { title: 'Sign Out', component: LoginPage, icon:'log-out'},
                      ];
                      break;
                    
                    case  "Sale Representative":
                      this.pages = [
                        { title: "Home", component: HomeUserPage, icon: "home" },
                        { title: "Reports", component: ManagerReportPage, icon: "document" },
                       
                        {
                          title: "Create Campaigns",
                          component: ManagerCreateCampaignPage,
                          icon: "person-add",
                        },
                        { title: "Track Campaigns", component: ManagerTrackCampaignPage, icon: "copy" },
                        { title: "Account", component: HomeManagerPage, icon: "settings" },
                        // { title: 'Sign Out', component: LoginPage, icon:'log-out'},
                      ];

                    break;


                  }
                  
                }
              });
          });
        });
      }
    });

    // used for an example of ngFor and navigation
   
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

  logout() {
    this.storage.remove("email").then((user) => {
      console.log(user);
    });
    this.storage.remove("name").then((user) => {
      console.log(user);
    });
    this.storage.remove("cuid").then((user) => {
      console.log(user);
    });
    this.storage.remove("role").then((user) => {
      console.log(user);
    });
    this.storage.remove("tenant").then((user) => {
      console.log(user);
    });
    this.storage.remove("password").then((user) => {
      console.log(user);
    });
    this.storage.remove("userId").then((user) => {
      console.log(user);
    });
    this.menuctrl.close();
    this.nav.setRoot(LoginPage);
  }
}
