import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnterPackPage } from './enter-pack';

/*
TODO : To Enter Pack Module.
Method : EnterPackModule
*/
@NgModule({
  declarations: [
    EnterPackPage
  ],
  imports: [
    IonicPageModule.forChild(EnterPackPage)
  ],
  exports: [
    EnterPackPage
  ]
})
export class EnterPackModule {}
