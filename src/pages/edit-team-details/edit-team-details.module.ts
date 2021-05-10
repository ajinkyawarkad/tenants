import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditTeamDetailsPage } from './edit-team-details';

@NgModule({
  declarations: [
    EditTeamDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(EditTeamDetailsPage),
  ],
})
export class EditTeamDetailsPageModule {}
