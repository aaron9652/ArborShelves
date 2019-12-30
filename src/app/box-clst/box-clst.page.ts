//https://stackoverflow.com/questions/45193926/angular2-firebase-set-the-current-user-id-as-the-name-of-a-node-in-firebase
//https://firebase.google.com/docs/reference/js/firebase.database
import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AppComponent } from '../app.component';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase';


@Component({
  selector: 'app-box-clst',
  templateUrl: './box-clst.page.html',
  styleUrls: ['./box-clst.page.scss'],
})
export class BoxCLstPage implements OnInit {

  public dbUrl;
  public dbDir; 
  public boxes: Object;
  public date = new Date();
  public sendDate = this.datePipe.transform(new Date(),"MM-dd-yyyy h:mm a");
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  public id;
  public chkBxBool: Array<{ value: boolean }> =
    [{ value: false }, { value: false }, { value: false }, { value: false }];
  public dbLabel: Array<{ value: string }> =
    [{ value: 'Not Completed' }, { value: 'Not Completed' }, { value: 'Not Completed' }, { value: 'Not Completed' }]


  constructor(public datePipe: DatePipe, public barcodeScanner: BarcodeScanner, public navCtrl: NavController, public http: HttpClient, public alertController: AlertController, public actionSheetController: ActionSheetController, public appC: AppComponent, public af: AngularFireAuth) {
    this.user = af.authState;
    this.user.subscribe((user) =>{
      this.userDetails = user;
      this.id = this.userDetails.displayName.toString(); 
    });      
  }

  async sendBox() {    
    var dscInp = document.getElementById("chkDescription").textContent; 
    var lst = firebase.database().refFromURL(this.dbDir);
    let sendOrder = await lst.push().set({
      time: this.sendDate.toString(), food: this.dbLabel[0].value, water: this.dbLabel[1].value, temp: this.dbLabel[2].value, egg: this.dbLabel[3].value, description: dscInp, 
    });
    await sendOrder;  
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

  chkClick(idx: number){ (this.chkBxBool[idx].value) ? this.dbLabel[idx].value = "Completed by "+this.id : this.dbLabel[idx].value = "Not Completed"; }

  ngOnInit() {
    try{
    this.barcodeScanner.scan().then(barcodeData => {
      if(barcodeData.text != null && barcodeData.text != ""){
      this.dbUrl = barcodeData.text + ".json";
      this.dbDir = barcodeData.text; 
      this.getBox(barcodeData.text).subscribe(data => { this.boxes = data; });
      }
      else{
        this.navCtrl.navigateForward("/home"); 
      }
    }).catch(err => {
      this.navCtrl.navigateForward("/home");
      console.log('Error', err);
    });
  }
  catch{
    this.navCtrl.navigateForward("/home");
  }
  }

  

}

