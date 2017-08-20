import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { OrganisationenPage } from '../pages/pages';
import { FavoritenPage } from '../pages/pages';
import { WuenschePage } from '../pages/pages';
import { WunschDetailPage } from '../pages/pages';
import { LandingPage } from '../pages/pages';
import { OrganisationenDetailPage } from '../pages/pages';
import { HttpModule } from '@angular/http';
import { KeysPipe } from '../pipes/keys/keys';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StartProvider } from '../providers/start/start';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WuenschePage,
    WunschDetailPage,
    OrganisationenPage,
    FavoritenPage,
    LandingPage,
    OrganisationenDetailPage,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WuenschePage,
    WunschDetailPage,
    OrganisationenPage,
    FavoritenPage,
    LandingPage,
    OrganisationenDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StartProvider
  ]
})
export class AppModule {}
