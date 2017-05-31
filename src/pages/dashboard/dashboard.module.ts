import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Dashboard } from './dashboard';

/*
TODO : To Dashboard Module.
Method : DashboardModule
*/
@NgModule({
  declarations: [
    Dashboard,
  ],
  imports: [
    IonicPageModule.forChild(Dashboard),
  ],
  exports: [
    Dashboard
  ]
})
export class DashboardModule {}
