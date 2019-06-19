import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular'; 
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-box-scan',
  templateUrl: './box-scan.page.html',
  styleUrls: ['./box-scan.page.scss'],
})
export class BoxScanPage implements OnInit {

  constructor(public barcodeScanner: BarcodeScanner, public navCtrl: NavController) { }
  dbUrl: String; 
  ngOnInit() {
    
    this.barcodeScanner.scan().then(barcodeData => {
      (barcodeData.text == null || barcodeData.text == "") ? this.dbUrl = barcodeData.text : this.navCtrl.navigateForward('/box');

     }).catch(err => {
         console.log('Error', err);
         this.navCtrl.navigateForward('/home');
     });
     
     
  }

}
