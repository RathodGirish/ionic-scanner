import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivatePackPage } from './activate-pack';

/*
TODO : To Activate Pack Module.
Method : ActivatePackModule
*/
@NgModule({
  declarations: [
    ActivatePackPage
  ],
  imports: [
    IonicPageModule.forChild(ActivatePackPage)
  ],
  exports: [
    ActivatePackPage
  ]
})
export class ActivatePackModule {}
