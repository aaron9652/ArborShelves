import { Component, OnInit, ElementRef, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { IonicModule, NavController, AlertController, ActionSheetController, IonSlides } from '@ionic/angular';
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
  @ViewChild('slides', {read: IonSlides}) slides: IonSlides;
  public swiper: any; 
  public qrHref = "";
  public hsHref = "";
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  public loggedIn = false;
  functions: any;
  public DOMSlides: any; 
  public slidesVisibility = false; 
  
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
    this.DOMSlides = document.getElementById("slides");
    this.DOMSlides.style.visibility = "hidden"; 
     
  }
  
   chkAuth() {
    if (this.loggedIn == true) {
      this.qrHref = "/box";
      this.hsHref = "/history";
      document.getElementById('lInButton').hidden = true;
      document.getElementById('lOutButton').hidden = false;
      document.getElementById('userName').innerHTML = this.userDetails.displayName; 
    }
    else {
      this.qrHref = "/log-in";
      this.hsHref = "/log-in";
      document.getElementById('lInButton').hidden = false;
      document.getElementById('lOutButton').hidden = true;
      document.getElementById('chkLstButton').onclick = function () { alert("Please Log In First"); }
      document.getElementById('hsButton').onclick = function () { alert("Please Log In First"); }
    }
  }

  logOut(){
    this.af.auth.signOut();
    console.log("signed out");
    this.navCtrl.navigateForward("/log-in");  
  }
  refreshBoxSlides(stopClose: Event){
    // var slides = document.getElementById("slides");
    // slides.toggleAttribute("hidden"); 
    //slides.getAttributeNames(true);
    //var a = slides.getAttributeNames; 
     
    // var sl = this.el.nativeElement;
    // sl = slides;  
  
    
    console.log(stopClose);
    stopClose.stopPropagation();
    //console.log(slides.dataset);//dom7ElementDataStorage.swiper.allowSlideNext
    document.getElementById("refreshIcon").toggleAttribute("hidden"); 
    document.getElementById("refreshSpinner").toggleAttribute("hidden");
    document.getElementById("slides").toggleAttribute("hidden");
    document.getElementById("slidesRefresh").toggleAttribute("hidden");
     
  }
  idxChng(){
    
    this.slides.slideTo(2); 
    
    console.log(this.slides); 
    //this.slides.lockSwipes(true); 
    this.slides.slideNext();
  }
  nextSlide($event) {
    setTimeout(() => { this.slides.slideTo(1, 500); }, 500);
  }
  toggleSlides(){
    if(this.slidesVisibility == true){
      this.DOMSlides.style.visibility = "hidden"; 
      this.slidesVisibility = false; 
      return;
    } 
    this.DOMSlides.style.visibility = "visible"; 
    this.slidesVisibility = true; 
  }
}






