import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCampaignsLeadPage } from './create-campaigns-lead';

@NgModule({
  declarations: [
    CreateCampaignsLeadPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCampaignsLeadPage),
  ],
})
export class CreateCampaignsLeadPageModule {}
