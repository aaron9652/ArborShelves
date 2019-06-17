import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IonicModule, NavController, AlertController, ActionSheetController } from '@ionic/angular'; 
import {BoxCLstPage} from '../box-clst/box-clst.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AppComponent } from '../app.component'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
     
  constructor(public navCtrl: NavController, public barcodeScanner: BarcodeScanner, public alertController: AlertController, public actionSheetController: ActionSheetController, public network: Network, public appC: AppComponent, public el: ElementRef, @Inject(DOCUMENT) document){
    
  }
   disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    alert("check network"); 
  });



  ngOnInit() {
    if (this.appC.chkAuth() == true) {
      document.getElementById('lInButton').hidden = true;
    } 
    else{ 
      document.getElementById('lInButton').hidden = true;
      document.getElementById('lOutButton').hidden = false; 
    }
    //document.getElementById('lInButton').innerHTML = "asdf"; 
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
  

  

    

