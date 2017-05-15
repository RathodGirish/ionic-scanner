import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { confirmPack } from './confirm-pack';
import { AddGame } from './add-game';

@NgModule({
  declarations: [
    confirmPack,
    AddGame
  ],
  imports: [
    IonicPageModule.forChild(confirmPack)
  ],
  exports: [
    confirmPack
  ],
  entryComponents: [
    AddGame
  ]
})
export class confirmPackModule {}
