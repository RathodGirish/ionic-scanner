import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { APIService } from '../../providers/api-service';
import { Http } from '@angular/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-add-game',
  templateUrl: 'add-game.html'
})

export class AddGamePage {
  info: any;
  public addGameObj = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController) {
    this.info = this.auth.getUserInfo();
    if (this.info == null) {
      this.showError('Please login first');
      this.navCtrl.setRoot('LoginPage');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Lottery');
  }

  public showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}