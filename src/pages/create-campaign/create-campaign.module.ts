import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCampaignPage } from './create-campaign';

@NgModule({
  declarations: [
    CreateCampaignPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCampaignPage),
  ],
})
export class CreateCampaignPageModule {}
