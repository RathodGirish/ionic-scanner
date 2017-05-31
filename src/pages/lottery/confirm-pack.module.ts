import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmPackPage } from './confirm-pack';
// import { AddGameModule } from './add-game.module';

/*
TODO : To Confirm Pack Module.
Method : ConfirmPackModule
*/
@NgModule({
  declarations: [
    ConfirmPackPage
  ],
  imports: [
    IonicPageModule.forChild(ConfirmPackPage)
  ],
  exports: [
    ConfirmPackPage
  ]
})
export class ConfirmPackModule {}
