import { Component } from '@angular/core';
import { IonicModule, NavController, AlertController, ActionSheetController } from '@ionic/angular'; 
import {BoxCLstPage} from '../box-clst/box-clst.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Network } from '@ionic-native/network/ngx'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
     
  constructor(public navCtrl: NavController, public barcodeScanner: BarcodeScanner, public alertController: AlertController, public actionSheetController: ActionSheetController, public network: Network){
    
  }
   disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    alert("check network"); 
  });

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
  

  

    

