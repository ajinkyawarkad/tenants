import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateLeadProfilePage } from './create-lead-profile';

@NgModule({
  declarations: [
    CreateLeadProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateLeadProfilePage),
  ],
})
export class CreateLeadProfilePageModule {}
