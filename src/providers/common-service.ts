import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import 'rxjs/add/operator/map';

declare function unescape(s: string): string;
declare function escape(s: string): string;

@Injectable()
export class CommonService {
    loading: Loading;
    constructor(private loadingCtrl: LoadingController, private alertCtrl: AlertController) {

    }

    /*
    TODO : To Check response is success or not
    Method : isSuccess
    */
    public isSuccess(value: any) {
        return (value == '1' || value == 'success');
    }

    /*
    TODO : To Check response is fail or not
    Method : isFail
    */
    public isFail(value: any) {
        return (value == '0' || value == 'fail');
    }

    /*
    TODO : To Display Common Error Alert
    Method : showErrorAlert
    */
    public showErrorAlert(text) {
        let alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

    /*
    TODO : To Display Common Success Alert
    Method : showSucessAlert
    */
    public showSucessAlert(text) {
        let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

    /*
    TODO : To Display Common Simple Alert
    Method : showAlert
    */
    public showAlert(text) {
        let alert = this.alertCtrl.create({
            title: '',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    }

    /*
    TODO : To Display Common Confirm Dialog
    Method : showAlert
    */
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

    /*
    TODO : To Display Please Wait Loading
    Method : showLoading
    */
    public showLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    /*
    TODO : To Display Simple Loading
    Method : showSimpleLoading
    */
    public showSimpleLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Loading...',
            dismissOnPageChange: false
        });
        this.loading.present();
    }

    /*
    TODO : To Hide Simple Loading
    Method : hideSimpleLoading
    */
    public hideSimpleLoading() {
        this.loading.dismiss();
    }

    /*
    TODO : To Hide Simple Loading
    Method : hideLoading
    */
    public hideLoading() {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...',
            dismissOnPageChange: true
        });
        this.loading.present();
    }

    /*
    TODO : To Get Formatted Date (YYYY-MM-DD)
    Method : getFormattedDateYMD
    */
    public getFormattedDateYMD(date) {
        // let year = 
        var d = new Date(date);
        // console.log('getFormattedDateYMD ' + date + ' 1 ' +d);
        var RD = d.getFullYear() + "-" + ((d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1)) + "-" + (d.getDate() > 9 ? (d.getDate()) : "0" + d.getDate());
        return RD;
    }

    /*
    TODO : To Get Game No And Pack No from ticket code
    Method : getGameNoAndPackNo
    */
    public getGameNoAndPackNo(ticketCode: any, callback) {
        console.log(' ticketCode ' + ticketCode);
        console.log(' var one = String(number).charAt(0); ' + String(ticketCode).charAt(0));
        if (ticketCode) {
            let firstDigit = String(ticketCode).charAt(0);
            let game_no = (parseInt(firstDigit) == 0) ? ticketCode.substring(0, 5) : ticketCode.substring(0, 4);

            let pack_no = (parseInt(firstDigit) == 0) ? ticketCode.substring(5, 11) : ticketCode.substring(4, 11);

            callback(null, game_no, pack_no);
        } else {
            callback('Invalid ticketCode');
        }

    }

    /*
    TODO : To Get Game No And Pack No and TodayReading from ticket code
    Method : getGameNoAndPackNoAndTodayReading
    */
    public getGameNoAndPackNoAndTodayReading(ticketCode: any, callback) {
        console.log(' ticketCode ' + ticketCode);
        console.log(' var one = String(number).charAt(0); ' + String(ticketCode).charAt(0));
        if (ticketCode) {
            let firstDigit = String(ticketCode).charAt(0);
            let game_no = (parseInt(firstDigit) == 0) ? ticketCode.substring(0, 5) : ticketCode.substring(0, 4);

            let pack_no = (parseInt(firstDigit) == 0) ? ticketCode.substring(5, 11) : ticketCode.substring(4, 11);
            let today_reading = ticketCode.substring(11, 14);

            callback(null, game_no, pack_no, today_reading);
        } else {
            callback('Invalid ticketCode');
        }

    }

    /*
    TODO : To Check pass value is number or not
    Method : isNumeric
    */
    public isNumeric(x) {
        let numbers = ".0123456789";
        // is x a String or a character? 
        if (x.length > 1) {
            let number;
            // remove negative sign 
            x = Math.abs(x) + "";
            for (let j = 0; j < x.length; j++) {
                // call isNumeric recursively for each character 
                number = this.isNumeric(x.substring(j, j + 1));
                if (!number) return number;
            }
            return number;
        } else {
            // if x is number return true 
            if (numbers.indexOf(x) >= 0) return true;
            return false;
        }
    }

    /*
    TODO : To Convert Barcode to UPC-12
    Method : ConvertBarcode
    */
    public ConvertBarcode(UPCE, userInfo, callback) {
        let UPCEString = "";
        let ManufacturerNumber = "";
        let ItemNumber = "";
        let Msg = "";

        if (!this.isNumeric(UPCE)) {
            alert("UPCs must contain numeric data only!");
            callback("UPCs must contain numeric data only!", null);

        } else if ((userInfo.pos_type == 'ruby2' && userInfo.pos_subtype == 'ncc')) {
            callback(null, UPCE);
        } else if (UPCE.length == 12) {
            if (userInfo.pos_type == 'ruby2' && userInfo.pos_subtype == 'gilbarco') {
                UPCE = UPCE.substr(0, 11);
                callback(null, UPCE);
            } else if (userInfo.pos_type == 'ruby2' && (userInfo.pos_subtype == null || userInfo.pos_subtype == '')) {
                UPCE = '00' + UPCE;
                callback(null, UPCE);
            } else {
                callback(null, UPCE);
            }
        } else {
            switch (UPCE.length) {
                case 6:
                    UPCEString = UPCE;
                    break;

                case 7:
                    UPCEString = UPCE.substring(1, 6);
                    break;

                case 8:
                    UPCEString = UPCE.substring(1, 7);
                    break;

                default:
                    alert("Wrong size UPCE message!");

            } //End Select

            console.log(' UPCEString ' + UPCEString);
            // break up the string into its 6 individual digits
            var Digit1 = UPCEString.substr(0, 1);
            var Digit2 = UPCEString.substr(1, 1);
            var Digit3 = UPCEString.substr(2, 1);
            var Digit4 = UPCEString.substr(3, 1);
            var Digit5 = UPCEString.substr(4, 1);
            var Digit6 = UPCEString.substr(5, 1);

            switch (Digit6) {
                case "0":
                    ManufacturerNumber = ManufacturerNumber.concat(Digit1, Digit2, Digit6, "00");
                    ItemNumber = ItemNumber.concat("00", Digit3, Digit4, Digit5);
                    break;

                case "1":
                    ManufacturerNumber = ManufacturerNumber.concat(Digit1, Digit2, Digit6, "00");
                    ItemNumber = "00" + Digit3 + Digit4 + Digit5;
                    break;

                case "2":
                    ManufacturerNumber = Digit1 + Digit2 + Digit6 + "00";
                    ItemNumber = "00" + Digit3 + Digit4 + Digit5;
                    break;

                case "3":
                    ManufacturerNumber = Digit1 + Digit2 + Digit3 + "00";
                    ItemNumber = "000" + Digit4 + Digit5;
                    break;

                case "4":
                    ManufacturerNumber = Digit1 + Digit2 + Digit3 + Digit4 + "0";
                    ItemNumber = "0000" + Digit5;
                    break;

                default:
                    ManufacturerNumber = ManufacturerNumber.concat(Digit1, Digit2, Digit3, Digit4, Digit5);
                    ItemNumber = ItemNumber.concat("0000", Digit6);
                    break;

            } //End Select

            // put the number system digit "0" together with the manufacturer code and Item number
            Msg = Msg.concat("0", ManufacturerNumber, ItemNumber);
            let CheckChar = this.CalcCheckDigit(Msg);
            let barcode = Msg.concat(CheckChar);
            if (userInfo.pos_type == 'ruby2' && userInfo.pos_subtype == 'gilbarco') {
                barcode = barcode.substr(0, 11);
            } else if (userInfo.pos_type == 'ruby2' && (userInfo.pos_subtype == null || userInfo.pos_subtype == '')) {
                barcode = '00' + barcode;
            }
            console.log('barcode ' + barcode + ' \n UPCE ' + UPCE);
            console.log('CheckChar ' + CheckChar);
            callback(null, barcode);
        }
    }

    /*
    TODO : To Calculate last check digit
    Method : CalcCheckDigit
    */
    public CalcCheckDigit(strMsg) {
        // calculate the check digit - note UPCE and UPCA check digits are the same
        var Check = 0;            // initialize the check digit value
        for (var X = 1; X <= 11; X++) {
            var Test = strMsg.substr(X - 1, 1);
            if (this.isOdd(X) == true) {
                Check = Check + parseInt(Test) * 7;       // odd position digits multiplied by 7
            }
            else {
                Check = Check + parseInt(Test) * 9;       // even position digits multiplied by 9
            }
        }
        Check = (Check % 10) + 48;  	// convert value to ASCII character value;
        return this.charFromCharCode(Check);    // check character
    }

    /*
    TODO : To Get character from CharCode
    Method : charFromCharCode
    */
    public charFromCharCode(charCode) {
        return unescape('%' + charCode.toString(16));
    }

    /*
    TODO : To Check value is even not
    Method : isEven
    */
    public isEven(y) {
        return (y % 2) ? false : true;
    }

    /*
    TODO : To Check value is odd not
    Method : isOdd
    */
    public isOdd(y) {
        return !this.isEven(y);
    }
}


