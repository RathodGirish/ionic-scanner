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

    public isNumeric(x) { 
        let numbers=".0123456789";
        // is x a String or a character? 
        if(x.length>1) { 
            let number;
            // remove negative sign 
            x=Math.abs(x)+""; 
            for(let j=0;j<x.length;j++) { 
                // call isNumeric recursively for each character 
                number=this.isNumeric(x.substring(j,j+1)); 
                if(!number) return number; 
            } 
            return number; 
        } else { 
            // if x is number return true 
            if(numbers.indexOf(x)>=0) return true; 
            return false; 
        } 
    } 

    public ConvertUPCE2A(){

        let UPCE = "02835727";
        // var UPCA = new String(document.forms["UPC"].txtUPCA.value);
        let UPCEString = "";
        let ManufacturerNumber = "";
        let ItemNumber = "";
        let Msg = "";

            if(this.isNumeric(UPCE)){
                switch (UPCE.length){
                    case 6:
                    UPCEString = UPCE;	
                    break;
                
                    case 7:
                    UPCEString = UPCE.substring(1, 6);	
                    break;
                    
                    case 8:
                    UPCEString = UPCE.substring(0, 8);
                    break;
                    
                    default :
                    alert("Wrong size UPCE message!");
                    // document.forms["UPC"].txtUPCE.value = "";
                    // document.forms["UPC"].txtUPCE.focus();
                    //return false;
                    
                } //End Select
                
                // break up the string into its 6 individual digits
                var Digit1 = UPCEString.substr(0, 1);
                var Digit2 = UPCEString.substr(1, 1);
                var Digit3 = UPCEString.substr(2, 1);
                var Digit4 = UPCEString.substr(3, 1);
                var Digit5 = UPCEString.substr(4, 1);
                var Digit6 = UPCEString.substr(5, 1);

                switch (Digit6){
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
                //return(Msg + CheckChar);	// put the pieces together and return
                //if (!isNaN(CheckChar)){
                    // document.forms["UPC"].txtUPCA.value = Msg.concat(CheckChar);
                    // document.forms["UPC"].txtChk.value = CheckChar;
                //} //End If isNaN

                console.log('Msg.concat(CheckChar) ' + Msg.concat(CheckChar) + ' \n UPCE ' + UPCE);
                console.log('CheckChar ' + CheckChar);
            } //End If is numeric
            else {
                alert("UPCs must contain numeric data only!");
                // document.forms["UPC"].txtUPCE.value = "";
                // document.forms["UPC"].txtUPCE.focus();
            }
        }

    public CalcCheckDigit(strMsg){
        // calculate the check digit - note UPCE and UPCA check digits are the same
        var Check = 0;            // initialize the check digit value
        for(var X = 1; X <= 11; X++){
            var Test = strMsg.substr(X-1, 1);
            if (this.isOdd(X)==true){
                    Check = Check + parseInt(Test) * 7;       // odd position digits multiplied by 7
            }
            else{ 
                    Check = Check + parseInt(Test)  * 9;       // even position digits multiplied by 9
            }
        }
        Check = (Check % 10) + 48;  	// convert value to ASCII character value;
        return this.charFromCharCode(Check);    // check character
    }

    public charFromCharCode(charCode) { 
        return '%' + charCode.toString(16); 
    } 

    public isEven(y) { 
        return (y%2)?false:true; 
    } 

    public isOdd(y) { 
        return !this.isEven(y); 
    } 

}


