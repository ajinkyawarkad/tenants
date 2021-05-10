import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserLicensesPage } from './user-licenses';

@NgModule({
  declarations: [
    UserLicensesPage,
  ],
  imports: [
    IonicPageModule.forChild(UserLicensesPage),
  ],
})
export class UserLicensesPageModule {}
