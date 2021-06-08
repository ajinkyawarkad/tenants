import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingLeadsPage } from './pending-leads';

@NgModule({
  declarations: [
    PendingLeadsPage,
  ],
  imports: [
    IonicPageModule.forChild(PendingLeadsPage),
  ],
})
export class PendingLeadsPageModule {}
