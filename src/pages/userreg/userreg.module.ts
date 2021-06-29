import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserregPage } from './userreg';

@NgModule({
  declarations: [
    UserregPage,
  ],
  imports: [
    IonicPageModule.forChild(UserregPage),
  ],
})
export class UserregPageModule {}
