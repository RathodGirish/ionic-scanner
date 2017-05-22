import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FinishDailyReadingsPage } from './finish-daily-readings';

@NgModule({
  declarations: [
    FinishDailyReadingsPage
  ],
  imports: [
    IonicPageModule.forChild(FinishDailyReadingsPage)
  ],
  exports: [
    FinishDailyReadingsPage
  ]
})
export class FinishDailyReadingsModule {}
