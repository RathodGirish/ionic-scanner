import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {

    constructor(private alertCtrl: AlertController) {

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
}


