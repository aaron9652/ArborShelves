import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AppComponent } from '../app.component';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-box-clst',
  templateUrl: './box-clst.page.html',
  styleUrls: ['./box-clst.page.scss'],
})
export class BoxCLstPage implements OnInit {

  dbUrl = '';
  public boxes: Object;
  public date = new Date();

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  public chkBxBool: Array<{ value: boolean }> =
    [{ value: false }, { value: false }, { value: false }, { value: false }];
  public dbLabel: Array<{ value: string }> =
    [{ value: '' }, { value: '' }, { value: '' }, { value: '' }]


  constructor(public barcodeScanner: BarcodeScanner, public navCtrl: NavController, public http: HttpClient, public alertController: AlertController, public actionSheetController: ActionSheetController, public appC: AppComponent, public af: AngularFireAuth) {
  this.user = af.authState;
  this.user.subscribe((user) =>{
    this.userDetails = user; 
  });
  
  }

  async sendBox() {
    var dateSp = this.date.toString().split('GMT');

    if (this.chkBxBool[0].value == true) {
      await this.http.patch(this.dbUrl, {
        food: 'Last Completed by ' + this.userDetails.displayName.toString() + " " + dateSp[0]
      }).subscribe((data) => { });
    }
    if (this.chkBxBool[1].value == true) {
      await this.http.patch(this.dbUrl, {
        water: 'Last Completed by ' + this.userDetails.displayName.toString() + " " +dateSp[0]
      }).subscribe((data) => { });
    }
    if (this.chkBxBool[2].value == true) {
      await this.http.patch(this.dbUrl, {
        temp: 'Last Completed by ' + this.userDetails.displayName.toString() + " " + dateSp[0]
      }).subscribe((data) => { });
    }
    if (this.chkBxBool[3].value == true) {
      await this.http.patch(this.dbUrl, {
        egg: 'Last Completed by ' + this.userDetails.displayName.toString() + " " +dateSp[0]
      }).subscribe((data) => { });
    }
  }

  getBox(url) {
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
            navTransition.then(() => {
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
    try{
    this.barcodeScanner.scan().then(barcodeData => {
      if(barcodeData.text != null && barcodeData.text != ""){
      this.dbUrl = barcodeData.text;
      this.getBox(barcodeData.text).subscribe(data => { this.boxes = data; });
      }
      else{
        this.navCtrl.navigateForward("/home"); 
      }
    }).catch(err => {
      alert(err);
      console.log('Error', err);
    });
  }
  catch{
    this.navCtrl.navigateForward("/home");
  }
  }

}

