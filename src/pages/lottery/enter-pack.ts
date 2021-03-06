import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../providers/auth-service';
import { CommonService } from '../../providers/common-service';
import { APIService } from '../../providers/api-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/*
TODO : EnterPack Component Page
Method : EnterPackPage
*/
@IonicPage()
@Component({
  selector: 'page-enter-pack',
  templateUrl: 'enter-pack.html',
})

export class EnterPackPage {
  public info: any;
  public enterPackObject = { "ticketCode": "", "status": "Counting", "enterDate": "" };
  public isDailyReadingsFound;
  public allDailyReadings = [];
  public sumOfAllDailyReadings = 0;
  public allDailyReadingsCount = 0;
  public allTodaySold = 0;

  constructor(public barcode: BarcodeScanner,
    public navCtrl: NavController,
    public auth: AuthService,
    public commonService: CommonService,
    public API_SERVICE: APIService) {

    let THIS = this;
    THIS.info = THIS.auth.getUserInfo();
    console.log(' this.info ' + JSON.stringify(THIS.info));

    // let THIS = this;
    if (THIS.info == null) {
      THIS.commonService.showErrorAlert('Please login first');
      THIS.navCtrl.setRoot('LoginPage');
    }
    let currentDate = THIS.commonService.getFormattedDateYMD(Date.now());
    THIS.enterPackObject.enterDate = currentDate;
    THIS.getLatestDailyReadings(currentDate);

  }

  /*
  TODO : To Enter Pack Function
  Method : enterPack
  */
  public enterPack() {
    let THIS = this;
    THIS.commonService.showLoading();
    THIS.commonService.getGameNoAndPackNoAndTodayReading(THIS.enterPackObject.ticketCode, function (err, game_no, pack_no, today_reading) {
      console.log('game_no ' + JSON.stringify(game_no) + ' | pack_no  ' + pack_no + ' | today_reading ' + today_reading);
      if (!game_no || !pack_no || !today_reading) {
        THIS.commonService.showAlert('Please enter proper Ticket Code');
        THIS.navCtrl.setRoot('EnterPackPage');
      } else {
        let body = new FormData();
        body.append('game_no', game_no);
        body.append('pack_no', pack_no);
        body.append('today_reading', today_reading);
        body.append('reading_date', THIS.enterPackObject.enterDate);
        body.append('store_id', THIS.info.store_id);
        body.append('status', THIS.enterPackObject.status);
        body.append('company_id', THIS.info.company_id);

        let headers = new Headers({});
        let options = new RequestOptions({ headers: headers });

        THIS.API_SERVICE.dailyReadingOrSoldout(body, options, 'dailyreading', function (err, res) {
          if (err && err.message == 'notfound') {
            THIS.commonService.showAlert('No Record Found');
            THIS.navCtrl.setRoot('EnterPackPage');
          } else if (err) {
            THIS.commonService.showErrorAlert('ERROR!: ' + err.message);
            THIS.navCtrl.setRoot('EnterPackPage');
          } else {
            if (THIS.commonService.isSuccess(res.status)) {
              THIS.commonService.showSucessAlert(res.message);
              THIS.navCtrl.setRoot('EnterPackPage');
            } else {
              THIS.commonService.showErrorAlert('Fail to Confirm Pack');
              THIS.navCtrl.setRoot('EnterPackPage');
            }
          }
        });
      }

    });
  }

  /*
  TODO : To Get Latest Daily Readings
  Method : getLatestDailyReadings
  */
  public getLatestDailyReadings(currentDate: any) {
    let THIS = this;
    THIS.API_SERVICE.getDailyReadingsByDate(THIS.info.store_id, this.info.company_id, currentDate, function (err, res) {
      if (err) {
        console.log("ERROR!: ", err.message);
        THIS.isDailyReadingsFound = false;
      } else {
        THIS.allDailyReadings = JSON.parse(JSON.stringify(res.message));
        THIS.allDailyReadingsCount = (THIS.allDailyReadings).length;
        for (let i = 0; i < THIS.allDailyReadings.length; i++) {
          THIS.sumOfAllDailyReadings += parseInt(THIS.allDailyReadings[i].today_sold_value);
          THIS.allTodaySold += parseInt(THIS.allDailyReadings[i].today_sold);
        }
        THIS.isDailyReadingsFound = true;
      }
    });
  }

  /*
  TODO : Scan Barcode Images
  Method : scanBarcode
  */
  async scanBarcode() {
    const results = await this.barcode.scan();
    if (results.text) {
      this.enterPackObject.ticketCode = results.text;
    }
    alert(results.text);
  }

  /*
  TODO : Go to FinishDailyReadingsPage
  Method : finishDailyReading
  */
  public finishDailyReading() {
    this.navCtrl.setRoot('FinishDailyReadingsPage');
  }

  /*
  TODO : Call on date change event
  Method : dateChanged
  */
  public dateChanged(value: any) {
    // console.log(); 
    //this.getLatestDailyReadings(this.enterPackObject.enterDate);
  }
}