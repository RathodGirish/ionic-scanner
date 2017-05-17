import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service';
 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage:any = 'LoginPage';
  public activePage:any;
  @ViewChild(Nav) nav: Nav;
  public info: any = {};
 
  public sidebarMenus: Array<{title: string, component: any, hasSubMenu: any, subMenus: any}>;
 
  constructor(private auth: AuthService, platform: Platform, splashScreen: SplashScreen, public menuController: MenuController) {
    platform.ready().then(() => {
      splashScreen.hide();
    });

    this.info = this.auth.getUserInfo();
    // this.menuController.enable(false);
    console.log(' auth ' + JSON.stringify(auth));
    this.sidebarMenus = [
      { title: 'Dashboard', component: 'Dashboard', hasSubMenu: false, subMenus: [] },
      { title: 'Update Price', component: 'PricebookPage', hasSubMenu: false, subMenus: [] },
      { title: 'Add Item', component: 'AddItemPage', hasSubMenu: false, subMenus: [] },
      // { title: 'Lottery/Lotto', component: 'ActivatePackPage', hasSubMenu: false },
      { title: 'Lottery/Lotto', component: 'ConfirmPackPage', hasSubMenu: true, subMenus: ["Confirm Pack", "Activate Pack"] },
      // { title: 'Add Game', component: 'AddGamePage' }
    ];
    this.activePage = this.sidebarMenus[0];
  }

  public ionViewDidEnter() {
    this.menuController.swipeEnable(false, 'sideMenu');
  }

  public openPage(page, flag) { 
    this.nav.setRoot(page);
    this.activePage = page;
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage');
    });
  }

  public checkActive(page: any){
    return page == this.activePage;
  }
}