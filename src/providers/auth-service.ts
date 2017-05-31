import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

export class User {
  id: string;
  role_id: string;
  store_id: string;
  company_id: string;
  username: string;
  email: string;
  constructor() {
  }
}

@Injectable()
export class AuthService {
  currentUser: User;
  constructor( @Inject(Http) private http: Http) { }

  /*
  TODO : To Login User
  Method : login
  */
  public login(credentials: any, callback) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      let headers = new Headers({});
      let options = new RequestOptions({ headers: headers });
      this.http
        .post('http://192.169.176.227/backofficeweb/', credentials, options)
        .map(res => res.json())
        .subscribe(
        data => {
          console.log("hello data called");
          if (data.status == 'Success') {
            callback(null, data);
          } else {
            console.log("hello null data called");
            callback(null, data);
          }
        },
        err => {
          console.log("ERROR!: ", err);
        }
        );
    }
  }

  /*
  TODO : To Registert User
  Method : register
  */
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  /*
  TODO : To Get User Information from localstorage
  Method : getUserInfo
  */
  public getUserInfo(): User {
    // return this.currentUser;
    return JSON.parse(localStorage.getItem('currentUser'))
  }

  /*
  TODO : To Set User Information to localstorage
  Method : setCurrentUser
  */
  public setCurrentUser(user: any, email: string) {
    this.currentUser = user;
    this.currentUser.email = email;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

  /*
  TODO : To logout user and expire session.
  Method : logout
  */
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      localStorage.removeItem('currentUser');
      observer.next(true);
      observer.complete();
    });
  }

}