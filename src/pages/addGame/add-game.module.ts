import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddGamePage } from './add-game';
import { HttpModule } from '@angular/http';

/*
TODO : To Add New Game Module.
Method : AddGameModule
*/
@NgModule({
  declarations: [
    AddGamePage,
  ],
  imports: [
    IonicPageModule.forChild(AddGamePage),
    HttpModule
  ],
  exports: [
    AddGamePage
  ]
})
export class AddGameModule {}
