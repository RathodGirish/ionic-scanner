import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { CommonService } from '../../providers/common-service';

@IonicPage()
@Component({
  selector: 'page-activate',
  templateUrl: 'enter-pack.html',
})

export class EnterPackPage {
  info: any;
  constructor(public navCtrl: NavController, private auth: AuthService,public commonService: CommonService) {
    this.info = this.auth.getUserInfo();
    console.log(' this.info ' + JSON.stringify(this.info));
    // let THIS = this;
    if (this.info == null) {
      this.commonService.showErrorAlert('Please login first');
      this.navCtrl.setRoot('LoginPage');
    }
  }

}

