import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController  } from '@ionic/angular'; 
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-box-clst',
  templateUrl: './box-clst.page.html',
  styleUrls: ['./box-clst.page.scss'],
})
export class BoxCLstPage implements OnInit {
  
  dbUrl = ''; 
  public boxes: Object; 
  public date = new Date();
  
  public chkBxBool: Array< {value: boolean} > = 
  [  { value: false}, { value: false}, { value: false}, { value: false}  ]; 
  public dbLabel: Array< {value: string} > =
  [ { value: ''}, { value: ''}, { value: ''}, { value: ''} ]


  constructor(public barcodeScanner: BarcodeScanner, public navCtrl: NavController, public http: HttpClient, public alertController: AlertController, public actionSheetController: ActionSheetController){
  }

  
  
  async sendBox(){
    var dateSp = this.date.toString().split('GMT');

    if (this.chkBxBool[0].value == true){ 
      await this.http.patch(this.dbUrl, {
      food: 'Last Completed by Aaron Ediger ' + dateSp[0]
      }).subscribe((data)=>{});
    }
    if (this.chkBxBool[1].value == true){ 
      await this.http.patch(this.dbUrl, {
      water: 'Last Completed by Aaron Ediger ' + dateSp[0]
      }).subscribe((data)=>{});
    } 
    if (this.chkBxBool[2].value == true){ 
      await this.http.patch(this.dbUrl, {
      temp: 'Last Completed by Aaron Ediger ' + dateSp[0]
      }).subscribe((data)=>{});
    } 
    if (this.chkBxBool[3].value == true){ 
      await this.http.patch(this.dbUrl, {
      egg: 'Last Completed by Aaron Ediger ' + dateSp[0]
      }).subscribe((data)=>{});
    }         
  } 
  
  getBox(url){     
    return this.http.get(url);
  }

  async buttonCon() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Submit Checklist?',
      buttons: [{
        text: 'Submit',
        icon: 'checkmark-circle-outline',
  
        handler: () => {
          let navTransition = actionSheet.dismiss();

          console.log('Submit clicked');
          this.sendBox().then(() => {
            navTransition.then(() =>{
              this.navCtrl.navigateForward('/home')
            });
          });   
          return false; 
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  
  ngOnInit() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.dbUrl = barcodeData.text; 
      this.getBox(barcodeData.text).subscribe(data => { this.boxes = data; });   
      }).catch(err => {
          alert(err); 
          console.log('Error', err); 
      });
  }

}

