import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController, NavParams } from 'ionic-angular';
// import { Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../providers/auth-service';
import { CommonService } from '../../providers/common-service';
import { APIService } from '../../providers/api-service';

@IonicPage()
@Component({
  selector: 'page-scatch-off-report',
  templateUrl: 'scatch-off-report.html',
})

export class ScatchOffReportPage {
  info: any;
  isDataFound;
  public Object = { "startDate": "", "endDate": "" };
  public records = [];
  public sumOfTicketSoldAmount = 0;
  public sumOfTicketSoldCount = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    private alertCtrl: AlertController,
    public commonService: CommonService,
    public API_SERVICE: APIService) {
  
    this.info = this.auth.getUserInfo();
    console.log(' this.info ' + JSON.stringify(this.info));

    if (this.info == null) {
      this.commonService.showErrorAlert('Please login first');
      this.navCtrl.setRoot('LoginPage');
    }
    this.Object.startDate = this.commonService.getFormattedDateYMD(Date.now() - 86400000);
    this.Object.endDate = this.commonService.getFormattedDateYMD(Date.now());
    let THIS = this;
    THIS.API_SERVICE.getScatchReport(this.Object.startDate,this.Object.endDate,this.info.store_id , function (err, res) {
      if (err) {
        console.log("ERROR!: ", err.message);
        THIS.isDataFound = false;
      } else {

        THIS.records = JSON.parse(JSON.stringify(res.message)); 
        console.log("JSON.stringify(res.message) :"+JSON.stringify(res.message));
        for (let i = 0; i < THIS.records.length; i++) {
          THIS.sumOfTicketSoldAmount += parseInt(THIS.records[i].today_sold_value);
          THIS.sumOfTicketSoldCount += parseInt(THIS.records[i].today_sold);
        }
        THIS.isDataFound = true;

      }
    });

  }



}
