import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage, NavParams } from 'ionic-angular';
import { Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../providers/auth-service';
import { CommonService } from '../../providers/common-service';
import { APIService } from '../../providers/api-service';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-add-game',
  templateUrl: 'add-game.html'
})

export class AddGamePage {
  info: any;
  public addGameObj = { "state": "TX", "game_no": "", "game_name": "", "value": "", "tickets_pack": "", "start_ticket": "", "end_ticket": "", "corporation": '0', "store": "", "status": "Ready to sale", "company_id": "", "pack_value": "" };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    public commonService: CommonService,
    public API_SERVICE: APIService,
    private alertCtrl: AlertController) {

    this.info = this.auth.getUserInfo();
    if (this.info == null) {
      this.commonService.showErrorAlert('Please login first');
      this.navCtrl.setRoot('LoginPage');
    }
  }

  public addGame() {
    let THIS = this;
    THIS.commonService.showLoading();
    console.log('addGameObj ' + JSON.stringify(THIS.addGameObj));

    let body = new FormData();
    body.append('state', THIS.addGameObj.state);
    body.append('game_no', THIS.addGameObj.game_no);
    body.append('game_name', THIS.addGameObj.game_name);
    body.append('value', THIS.addGameObj.value);
    body.append('tickets_pack', THIS.addGameObj.tickets_pack);
    body.append('start_ticket', THIS.addGameObj.start_ticket);
    body.append('end_ticket', THIS.addGameObj.end_ticket);
    body.append('corporation', THIS.addGameObj.corporation);
    body.append('status', THIS.addGameObj.status);
    body.append('store', THIS.info.store_id);
    body.append('company_id', THIS.info.company_id);
    body.append('pack_value', THIS.addGameObj.pack_value);

    console.log('body ' + JSON.stringify(body));

    let headers = new Headers({});
    let options = new RequestOptions({ headers: headers });

    THIS.API_SERVICE.addGame(body, options, function (err, res) {
        if (err) {
          console.log("ERROR!: ", err);
          THIS.commonService.showErrorAlert('ERROR!: ' + err.message);
          THIS.navCtrl.setRoot('ConfirmPackPage');
        } else {
          if (THIS.commonService.isSuccess(res.status)) {
            THIS.commonService.showSucessAlert('Game Added Successfully');
            THIS.navCtrl.setRoot('ConfirmPackPage');
          } else {
            THIS.commonService.showErrorAlert('Fail to Add New Game');
            THIS.navCtrl.setRoot('ConfirmPackPage');
          }
        }
      });
  }

}