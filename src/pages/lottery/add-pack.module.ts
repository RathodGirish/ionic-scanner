import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { addPack } from './add-pack';

@NgModule({
  declarations: [
    addPack,
  ],
  imports: [
    IonicPageModule.forChild(addPack),
  ],
  exports: [
    addPack
  ]
})
export class addPackModule {}
