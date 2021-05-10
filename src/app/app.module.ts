import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {NgxPaginationModule} from 'ngx-pagination'; 

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ReportPage } from '../pages/report/report';
import { CreateCampaignPage } from '../pages/create-campaign/create-campaign';
import { TrackCampaignPage } from '../pages/track-campaign/track-campaign';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SettingsPage } from '../pages/settings/settings';
import { UserLicensesPage } from '../pages/user-licenses/user-licenses';
import { CreateLeadProfilePage } from '../pages/create-lead-profile/create-lead-profile';

import { EditCampaignsDetailsPage } from '../pages/edit-campaigns-details/edit-campaigns-details';

import { LeadsDetailsPage } from '../pages/leads-details/leads-details';
import { TaskDetailsPage } from '../pages/task-details/task-details';
import { CreateCampaignsLeadPage } from '../pages/create-campaigns-lead/create-campaigns-lead';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { UserlistPage } from '../pages/userlist/userlist';
import { CreateNewCampleadPage } from '../pages/create-new-camplead/create-new-camplead';
import { EditLeadDetailsPage } from '../pages/edit-lead-details/edit-lead-details';
import { EditTeamDetailsPage } from '../pages/edit-team-details/edit-team-details';

import { AngularFireModule } from '@angular/fire';
 import { AngularFireAuth } from '@angular/fire/auth';
 import { firebaseConfig } from '../config';

 import { Observable } from 'rxjs';
 
 import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';

import { AuthserviceProvider } from '../providers/authservice/authservice';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { ProfilePage } from '../pages/profile/profile';
import { HttpModule } from '@angular/http';
import { CallDetailsPage } from '../pages/call-details/call-details';
import { LeadInTrackCampPage } from '../pages/lead-in-track-camp/lead-in-track-camp';
import { SearchPipe } from '../pipes/search/search';
import { SortPipe } from '../pipes/sort/sort';
import { SearchPipe1 } from '../pipes/search/search1';
import { SearchPipe2 } from '../pipes/search/search2';
import { EditCsvFieldPage } from '../pages/edit-csv-field/edit-csv-field';



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage, 
    ReportPage,
    CreateCampaignPage,
    TrackCampaignPage,
    AccountPage,
    SettingsPage,
    UserLicensesPage,
    CreateLeadProfilePage,
 
    EditCampaignsDetailsPage,
    LeadsDetailsPage,
    TaskDetailsPage,
    CreateCampaignsLeadPage,
    UserDetailsPage,
    UserlistPage,
    CreateNewCampleadPage,
    EditLeadDetailsPage,
    EditTeamDetailsPage,
    ProfilePage,
    CallDetailsPage,
    LeadInTrackCampPage,
    EditCsvFieldPage,
    SearchPipe,
    SearchPipe1,
    SearchPipe2,
    SortPipe
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,
      {
        scrollAssist: false,
        scrollPadding: false
      }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFirestoreModule,
    
  
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage,
    ReportPage,
    CreateCampaignPage,
    TrackCampaignPage,
    AccountPage,
    SettingsPage,
    UserLicensesPage,
    CreateLeadProfilePage,  
  
    EditCampaignsDetailsPage,
    LeadsDetailsPage,
    TaskDetailsPage,
    CreateCampaignsLeadPage,
    UserDetailsPage,
    UserlistPage,
    CreateNewCampleadPage,
    EditLeadDetailsPage,
    EditTeamDetailsPage,
    ProfilePage,
    CallDetailsPage,
    LeadInTrackCampPage,
    EditCsvFieldPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthserviceProvider,
     AngularFireModule ,
    //FileChooserOriginal,FileOpenerOriginal,FilePathOriginal
   
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
