import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddGame } from './add-game';

@NgModule({
  declarations: [
    AddGame,
  ],
  imports: [
    IonicPageModule.forChild(AddGame),
  ],
  exports: [
    AddGame
  ]
})
export class AddGameModule {}
