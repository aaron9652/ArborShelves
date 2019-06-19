import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IonicModule, NavController, AlertController, ActionSheetController } from '@ionic/angular';
import { BoxCLstPage } from '../box-clst/box-clst.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AppComponent } from '../app.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseAuth } from '@angular/fire';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public href = "";
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  public loggedIn = false;
  
  //https://stackoverflow.com/questions/53670047/angular-firebase-auth-how-to-check-if-user-is-logged-in-to-hide-login-link-from

  constructor(public navCtrl: NavController, public barcodeScanner: BarcodeScanner, public alertController: AlertController, public actionSheetController: ActionSheetController, public network: Network, public appC: AppComponent, public el: ElementRef, @Inject(DOCUMENT) document, public af: AngularFireAuth) {
    this.user = af.authState;
    this.loggedIn = !!sessionStorage.getItem('user');

    this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
            this.loggedIn = true; 
            this.chkAuth(); 

            console.log(this.userDetails);
          } else {
            this.userDetails = null;
            this.chkAuth(); 
          }
        }
      );
  }
  disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    alert("check network");
  });

  ngOnInit() {

    //await this.chkAuth();
    
  }
  
   chkAuth() {
    if (this.loggedIn == true) {
      document.getElementById('lInButton').hidden = true;
      document.getElementById('lOutButton').hidden = false;
      this.href = "/box";
      // this.af.authState.subscribe(user => {
      //   document.getElementById('lOutButton').innerHTML = user.displayName;
      // })
      document.getElementById('lOutButton').innerHTML = this.userDetails.displayName; 
    }
    else {
      this.href = "/log-in";
      document.getElementById('lInButton').hidden = false;
      document.getElementById('lOutButton').hidden = true;
      document.getElementById('chkLstButton').onclick = function () { alert("Please Log In First"); }
    }
  }




  // async buttonCon(){
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'Create New Box?',
  //     buttons: [{
  //       text: 'Submit',
  //       icon: 'checkmark-circle-outline',

  //       handler: () => {
  //         let navTransition = actionSheet.dismiss();

  //         console.log('Submit clicked');
  //         this.sendBox().then(() => {
  //           navTransition.then(() =>{
  //             this.navCtrl.navigateForward('/home')
  //           });
  //         });   
  //         return false; 
  //       }
  //     }, {
  //       text: 'Cancel',
  //       icon: 'close',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   await actionSheet.present();
  // }

}






