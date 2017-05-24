import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {
    loading: Loading;   
    constructor(private loadingCtrl: LoadingController, private alertCtrl: AlertController) {

    }

    public isSuccess(value: any){
        return (value == '1' || value == 'success');
    }

    public isFail(value: any){
        return (value == '0' || value == 'fail');
    }

    public showErrorAlert(text) {
        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

    public showSucessAlert(text) {
        let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

    public showAlert(text) {
        let alert = this.alertCtrl.create({
            title: '',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

     public showConfirmDialog(title, message, callback) {
        let alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
            {
                text: 'No',
                role: 'cancel',
                handler: () => {
                    console.log('No clicked');
                    callback(false);
                }
            },
            {
                text: 'Yes',
                handler: () => {
                    console.log('Yes clicked');
                    callback(true);
                }
            }
            ]
        });
        alert.present();
    }

    public showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    public showSimpleLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Loading...',
            dismissOnPageChange: false
        });
        this.loading.present();
    }

     public hideSimpleLoading() {
        this.loading.dismiss();
    }

    public hideLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    public getFormattedDateYMD(date) {
        // let year = 
        var d = new Date(date); 
        // console.log('getFormattedDateYMD ' + date + ' 1 ' +d);
        var RD = d.getFullYear() + "-" + ((d.getMonth() + 1)>9?(d.getMonth() + 1):"0"+(d.getMonth() + 1)) + "-" + (d.getDate()>9?(d.getDate()):"0"+d.getDate()); 
        return RD;
    }

    public getGameNoAndPackNo(ticketCode: any, callback){
        console.log(' ticketCode ' + ticketCode);
        console.log(' var one = String(number).charAt(0); ' + String(ticketCode).charAt(0));
        if(ticketCode){
            let firstDigit = String(ticketCode).charAt(0);
            let game_no = (parseInt(firstDigit) == 0)? ticketCode.substring(0,5) : ticketCode.substring(0,4);

            let pack_no = (parseInt(firstDigit) == 0)? ticketCode.substring(5,11) : ticketCode.substring(4,11);

            callback(null, game_no, pack_no);
        } else {
            callback('Invalid ticketCode');
        }
        
    }

    public getGameNoAndPackNoAndTodayReading(ticketCode: any, callback){
        console.log(' ticketCode ' + ticketCode);
        console.log(' var one = String(number).charAt(0); ' + String(ticketCode).charAt(0));
        if(ticketCode){
            let firstDigit = String(ticketCode).charAt(0);
            let game_no = (parseInt(firstDigit) == 0)? ticketCode.substring(0,5) : ticketCode.substring(0,4);

            let pack_no = (parseInt(firstDigit) == 0)? ticketCode.substring(5,11) : ticketCode.substring(4,11);
            let today_reading = ticketCode.substring(11,14);

            callback(null, game_no, pack_no, today_reading);
        } else {
            callback('Invalid ticketCode');
        }
        
    }

}


