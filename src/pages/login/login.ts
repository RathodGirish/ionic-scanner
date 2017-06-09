import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage, MenuController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../providers/auth-service';
import { CommonService } from '../../providers/common-service';
import { API_URL } from '../../providers/api-url';

/*
TODO : To Login Component Page.
Method : LoginPage
*/
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loading: Loading;
  // public loginCredentials = { email: 'texonoil@gmail.com', password: 'tex@123', type: 'store' };
  // public loginCredentials = { email: 'gettyrmg@gmail.com', password: 'test123', type: 'store' };
  // public loginCredentials = { email: 'stateroad@gmail.com', password: 'test123', type: 'store' };
  // public loginCredentials = { email: 'ncc@gmail.com', password: 'test123', type: 'store' };

  public loginCredentials = { email: '', password: '', type: 'store' };
  public typeList: any[] = [{ value: 1, text: 'option 1', checked: false }, { value: 2, text: 'option 2', checked: false }];

  constructor(
    public nav: NavController,
    public auth: AuthService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public http: Http,
    public commonService: CommonService,
    public menuController: MenuController) {
    this.menuController.swipeEnable(false, 'sideMenu');
  }

  /*
  TODO : To Login User Function.
  Method : login
  */
  public login() {
    let THIS = this;
    THIS.commonService.showLoading();
    let body = new FormData();
    body.append('email', this.loginCredentials.email);
    body.append('password', this.loginCredentials.password);
    body.append('type', this.loginCredentials.type);
    let headers = new Headers({});
    let options = new RequestOptions({ headers: headers });
    THIS.http
      .post(API_URL.BASE_API_URL + API_URL.LOGIN, body, options)
      .map(res => res.json())
      .subscribe(
      data => {
        console.log("data :" + JSON.stringify(data));
        console.log('login data  ' + data);
        if (data.status == 'Success') {
          THIS.auth.setCurrentUser(data.Data, THIS.loginCredentials.email);
          THIS.nav.setRoot('Dashboard');
        } else {
          THIS.commonService.showErrorAlert(data.message);
        }
      },
      err => {
        console.log("ERROR!: ", err);
      }
      );
  }
}