import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
import { Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../providers/auth-service';
import { CommonService } from '../../providers/common-service';
import { APIService } from '../../providers/api-service';

@IonicPage()
@Component({
  selector: 'page-finish-daily-readings',
  templateUrl: 'finish-daily-readings.html',
})

export class FinishDailyReadingsPage {
  info: any;
  public soldoutObject = { "created": "" };
  public isFinishDailyReadingsFound;
  public allFinishDailyReadings = [];
  public allFinishDailyReadingsCount = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    private alertCtrl: AlertController,
    public commonService: CommonService,
    public API_SERVICE: APIService) {

    let THIS = this;
    THIS.info = THIS.auth.getUserInfo();
    console.log(' THIS.info ' + JSON.stringify(THIS.info));

    if (this.info == null) {
      THIS.commonService.showErrorAlert('Please login first');
      THIS.navCtrl.setRoot('LoginPage');
    }

    let currentDate =THIS.commonService.getFormattedDateYMD(Date.now());
    THIS.soldoutObject.created = currentDate;

    THIS.API_SERVICE.getFinishDailyReadingsByDate(THIS.info.store_id,this.info.company_id, function (err, res) {
      if (err) {
        console.log("ERROR!: ", err.message);
        THIS.isFinishDailyReadingsFound = false;
      } else {
        THIS.allFinishDailyReadings = JSON.parse(JSON.stringify(res.message)); 
        THIS.allFinishDailyReadingsCount = (THIS.allFinishDailyReadings).length;
        
        THIS.isFinishDailyReadingsFound = true;
      }
    });
  }

  public soldOut(reading: any){
    let THIS = this;
    THIS.commonService.showLoading();
    let body = new FormData();
    body.append('store_id', THIS.info.store_id);
    body.append('company_id', THIS.info.company_id);
    body.append('game_no', reading.game_no);
    body.append('pack_no', reading.pack_no);
    body.append('status', 'Sold Out');
    body.append('today_reading', '0');
    body.append('created', THIS.soldoutObject.created);

    console.log('body ' + JSON.stringify(body));

    let headers = new Headers({});
    let options = new RequestOptions({ headers: headers });

    THIS.API_SERVICE.dailyReadingOrSoldout(body, options, 'soldout',function (err, res) {
        if (err) {
          THIS.commonService.showErrorAlert('ERROR!: ' + err.message);
          THIS.navCtrl.setRoot('FinishDailyReadingsPage');
        } else {
          if (THIS.commonService.isSuccess(res.status)) {
            THIS.commonService.showSucessAlert(res.message);
            THIS.navCtrl.setRoot('FinishDailyReadingsPage');
          } else {
            THIS.commonService.showErrorAlert('Fail to Sold Out');
            THIS.navCtrl.setRoot('FinishDailyReadingsPage');
          }
        }
      });
  }
}
