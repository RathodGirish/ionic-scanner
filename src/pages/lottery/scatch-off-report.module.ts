import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScatchOffReportPage } from './scatch-off-report';


/*
TODO : To Scatch Off ReportModule Pack Module.
Method : ScatchOffReportModule
*/
@NgModule({
  declarations: [
    ScatchOffReportPage
  ],
  imports: [
    IonicPageModule.forChild(ScatchOffReportPage)
  ],
  exports: [
    ScatchOffReportPage
  ]
})
export class ScatchOffReportModule {}
