import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { GmunklApi } from '../shared/shared';
import { Location } from '../shared/shared';
//import * as MyGlobals from '../pages/global';
import { TabsPage } from '../pages/tabs/tabs';
import { LandingPage } from '../pages/landing/landing';
import { Geolocation } from '@ionic-native/geolocation';
import { StartProvider } from '../providers/start/start';

@Component({
  templateUrl: 'app.html',
  providers: [
    GmunklApi,
    HttpModule,
    Geolocation,
    Location
  ]
})
export class MyApp {
  rootPage:any;

  constructor(public start: StartProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    if(this.start.isLoggedIn()){
      console.log('isLoggedIn')
      this.rootPage = TabsPage;
    }else{
      console.log('isNOTLoggedIn')
      this.rootPage = LandingPage;
    }
  }
}
