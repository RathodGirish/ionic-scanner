import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { confirmPack } from './confirm-pack';

@NgModule({
  declarations: [
    confirmPack,
  ],
  imports: [
    IonicPageModule.forChild(confirmPack),
  ],
  exports: [
    confirmPack
  ]
})
export class confirmPackModule {}
