import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { CommonService } from '../../providers/common-service';
import { AddGame } from './add-game';

/**
 * Generated class for the Lottery page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-lottery',
  templateUrl: 'confirm-pack.html',
})
export class confirmPack {
  info: any;
  public confirmPackObject = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController, public commonService: CommonService) {
    this.info = this.auth.getUserInfo();
    if (this.info == null) {
      this.commonService.showErrorAlert('Please login first');
      this.navCtrl.setRoot('LoginPage');
    }
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad Lottery');
  }

  public confirmPack(){
    this.navCtrl.push(AddGame, {
      id: "123",
      name: "Carl"
    });
  }


}
