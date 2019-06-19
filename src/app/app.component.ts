import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { promise } from 'protractor';

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
export class AppComponent implements OnInit {
  async ngOnInit() {

  }
  public userStatus; 
  public userID; 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private af: AngularFireAuth
  ) {
    this.initializeApp();
  }
  //userId: string; 
  initializeApp() {
    
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.chkAuth();
    });
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

}

