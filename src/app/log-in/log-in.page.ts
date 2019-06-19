import { Component, OnInit } from '@angular/core';
import { NavController} from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  private user: Observable<firebase.User>;

  constructor(public af: AngularFireAuth, public navCtrl: NavController) {
    this.user = af.authState; 
    this.user.subscribe(
      (user) => {
        if (user) {
          console.log("Logged In");
          this.navCtrl.navigateForward("/home");  
        } 
      }
    );
  }

  ngOnInit() {
  }

}
