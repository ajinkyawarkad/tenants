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
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

import { CreateLeadProfilePage } from '../pages/create-lead-profile/create-lead-profile';
import { EditCampaignsDetailsPage } from '../pages/edit-campaigns-details/edit-campaigns-details';
import { LeadsDetailsPage } from '../pages/leads-details/leads-details';
import { TaskDetailsPage } from '../pages/task-details/task-details';

import { UserDetailsPage } from '../pages/user-details/user-details';
import { UserlistPage } from '../pages/userlist/userlist';
import { CreateNewCampleadPage } from '../pages/create-new-camplead/create-new-camplead';
import { EditLeadDetailsPage } from '../pages/edit-lead-details/edit-lead-details';
import { EditTeamDetailsPage } from '../pages/edit-team-details/edit-team-details';
import { PendingLeadsPage } from '../pages/pending-leads/pending-leads';
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
import { LeadInTrackCampPage } from '../pages/lead-in-track-camp/lead-in-track-camp';
import { SearchPipe } from '../pipes/search/search';
import { SortPipe } from '../pipes/sort/sort';
import { SearchPipe1 } from '../pipes/search/search1';
import { SearchPipe2 } from '../pipes/search/search2';
import { EditCsvFieldPage } from '../pages/edit-csv-field/edit-csv-field';
import { RemainingLeadDeatilsPage } from '../pages/remaining-lead-deatils/remaining-lead-deatils';
import { ExportPage } from '../pages/export/export';
import { HomeManagerPage } from '../pages/home-manager/home-manager';
import { HomeUserPage } from '../pages/home-user/home-user';
import { ManagerCreateCampaignPage } from '../pages/manager-create-campaign/manager-create-campaign';
import { ManagerEditCampaignPage } from '../pages/manager-edit-campaign/manager-edit-campaign';
import { ManagerCreateLeadProfilePage } from '../pages/manager-create-lead-profile/manager-create-lead-profile';
import { ManagerLeadDetailsPage } from '../pages/manager-lead-details/manager-lead-details';
import { ManagerTaskDetailsPage } from '../pages/manager-task-details/manager-task-details';
import { ManagerTrackCampaignPage } from '../pages/manager-track-campaign/manager-track-campaign';
import { UserregPage } from '../pages/userreg/userreg';
import { ManagerReportPage } from '../pages/manager-report/manager-report';
import { ManagerRemainingLeadDeatilsPage } from '../pages/manager-remaining-lead-deatils/manager-remaining-lead-deatils';
import { ManagerEditLeadPage } from '../pages/manager-edit-lead/manager-edit-lead';
import { ManagerLeadInTrackCampPage } from '../pages/manager-lead-in-track-camp/manager-lead-in-track-camp';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    HomePage, 
    HomeManagerPage,
    HomeUserPage,
    ManagerRemainingLeadDeatilsPage,
    ManagerEditLeadPage,
    ManagerLeadInTrackCampPage,
    ReportPage,
    CreateCampaignPage,
    ManagerCreateCampaignPage,
    ManagerEditCampaignPage,
    ManagerCreateLeadProfilePage,
    ManagerLeadDetailsPage,
    UserregPage,
    ManagerTaskDetailsPage,
    ManagerTrackCampaignPage,
    TrackCampaignPage,

   
    CreateLeadProfilePage,
    PendingLeadsPage, 
    ExportPage,
    EditCampaignsDetailsPage,
    LeadsDetailsPage,
    TaskDetailsPage,

    UserDetailsPage,
    UserlistPage,
    CreateNewCampleadPage,
    EditLeadDetailsPage,
    EditTeamDetailsPage,
    ProfilePage,
 
    LeadInTrackCampPage,
    EditCsvFieldPage,
    RemainingLeadDeatilsPage,
    ManagerReportPage,
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
    HomeManagerPage,
    ManagerRemainingLeadDeatilsPage,
    ManagerEditLeadPage,
    ManagerLeadInTrackCampPage,
    HomeUserPage,
    ManagerReportPage,
    ReportPage,
    CreateCampaignPage,
    ManagerCreateCampaignPage,
    ManagerEditCampaignPage,
    ManagerCreateLeadProfilePage,
    ManagerLeadDetailsPage,
    ManagerTaskDetailsPage,
    ManagerTrackCampaignPage,
    TrackCampaignPage,
    UserregPage,
    
    CreateLeadProfilePage,  
    RemainingLeadDeatilsPage,
    EditCampaignsDetailsPage,
    LeadsDetailsPage,
    TaskDetailsPage,
  
    UserDetailsPage,
    UserlistPage,
    PendingLeadsPage,
    CreateNewCampleadPage,
    EditLeadDetailsPage,
    EditTeamDetailsPage,
    ProfilePage,
    LeadInTrackCampPage,
    EditCsvFieldPage,
    ExportPage
    
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
