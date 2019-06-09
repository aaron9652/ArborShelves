import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCzMO52eo3eI3JwxoTS_gD1hn6y6hoHAfM",
  authDomain: "arborshelvestest.firebaseapp.com",
  databaseURL: "https://arborshelvestest.firebaseio.com",
  projectId: "arborshelvestest",
  storageBucket: "arborshelvestest.appspot.com",
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
