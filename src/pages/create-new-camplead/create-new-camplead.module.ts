import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateNewCampleadPage } from './create-new-camplead';

@NgModule({
  declarations: [
    CreateNewCampleadPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateNewCampleadPage),
  ],
})
export class CreateNewCampleadPageModule {}
