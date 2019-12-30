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
import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';
import { timeout } from 'q';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('slides', {read: IonSlides}) slides: IonSlides;
  public dbUrl = "https://arborshelvestest.firebaseio.com/Boxes.json"; 
  public swiper: any; 
  public qrHref = "";
  public hsHref = "";
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  public loggedIn = false;
  functions: any;
  public DOMSlides: any; 
  public slidesVisibility = false; 
  public modelVisibility = false; 
  public yCord; 
  public boxAry: any[]=[]; 
  public modelBox: any[]=[];
  public model = class {
    constructor(
      public food: string,
      public water: string,
      public egg: string,           
      public temp: string, 
      public time: string, 
      public description: string){}
  }
  //https://stackoverflow.com/questions/53670047/angular-firebase-auth-how-to-check-if-user-is-logged-in-to-hide-login-link-from

  constructor(public navCtrl: NavController, public barcodeScanner: BarcodeScanner, public alertController: AlertController, public actionSheetController: ActionSheetController, public network: Network, public appC: AppComponent, public el: ElementRef, @Inject(DOCUMENT) document, public af: AngularFireAuth, public http: HttpClient) {     
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
    document.getElementById("slidesLoadingDiv").style.visibility = "hidden"; 
    this.DOMSlides = document.getElementById("slides");
    setTimeout(function(){
      document.getElementById("slides").style.display = "none";
    }, 1000); 
    this.getBoxesForSlides(this.dbUrl).subscribe((boxes) =>{
      let jsonBoxes = JSON.parse(JSON.stringify(boxes)); 
      Object.values(jsonBoxes).map(box => {
        Object.values(box).map(history => {
          this.boxAry.push(new this.model(history.food, history.water, history.egg, history.temp, history.time, history.description));
        }); 
          
      }); 
      //this.boxAry.push(this.modelBox); 
    });  
    document.getElementById("boxModel").addEventListener('touchmove', (event) => this.modelSwipeHandler(event), false);  
    document.addEventListener('touchstart', function handler(e){
      this.yCord = e.touches[0].clientY
    }, false); 
  }
  
  modelSwipeHandler(e: any){
      if (this.yCord > (e.touches[0].clientY * 1.05)) {this.changeZ(); this.yCord  = ""}
      
      else this.yCord  = e.touches[0].clientY;
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
  async refreshBoxSlides(stopClose: Event){        
    let stop = stopClose.stopPropagation();
    await stop; 
    document.getElementById("refreshIcon").toggleAttribute("hidden"); 
    document.getElementById("refreshSpinner").toggleAttribute("hidden");    
    this.refresherToggleSlides();   
     
  }
  idxChng(){
    
    this.slides.slideTo(2); 
    
    console.log(this.slides); 
    //this.slides.lockSwipes(true); 
    this.slides.slideNext();
  }

  toggleSlides(ev){
    console.log(document.getElementById("slides").click);
    var a = document.getElementById("slides").getAttributeNames; 
    console.log(a); 
    document.getElementById("slides").click(); 
    if(document.getElementById("slides").style.display == "none"){
      document.getElementById("slides").addEventListener("(click)", function handler(e){
        e.stopPropagation(); console.log("test"); 
      });
      this.DOMSlides.addEventListener("webkitAnimationEnd", function handler(e){ 

         e.currentTarget.removeEventListener(e.type, handler); document.getElementById("slides").removeEventListener("click", handler)});
         document.getElementById("slidesButton").click = function(){console.log("changed")};
         document.getElementById("slides").classList.replace("ion-slidesOut", "ion-slidesIn");
         document.getElementById("slides").style.visibility = "visible";       
         document.getElementById("slides").style.display = "block";
      this.slidesVisibility = true; 

    } 
    else {      
      this.DOMSlides.addEventListener("webkitAnimationEnd", function handler(e){           
        document.getElementById("slides").style.display = "none"; 
        e.currentTarget.removeEventListener(e.type, handler); 
        document.getElementById("slides").style.visibility = "hidden";
          }, false);
        document.getElementById("slidesButton").click = function(){console.log("changed")}; 
        document.getElementById("slides").classList.replace("ion-slidesIn", "ion-slidesOut");
      
        this.slidesVisibility = false; 
      return true;
    }

  }
  refresherToggleSlides(){
    if(this.slidesVisibility == true){
      document.getElementById("slides").style.visibility = "hidden";
      this.DOMSlides.addEventListener("webkitAnimationEnd", function handler(e){ 
        document.getElementById("slidesLoadingDiv").style.visibility = "visible"; 
        document.getElementById("slidesLoadingDiv").toggleAttribute("hidden");         
        document.getElementById("slides").classList.remove("ion-slidesOut");   
        document.getElementById("slides").style.display = "none"; e.currentTarget.removeEventListener(e.type, handler); }, false);
      document.getElementById("slides").classList.add("ion-slidesOut");            
      
        this.slidesVisibility = false; 
      return true;
    } 
    else{
      document.getElementById("slidesLoadingDiv").toggleAttribute("hidden"); 
      document.getElementById("slides").style.display = "block"
      this.DOMSlides.style.visibility = "visible"; 
      this.slidesVisibility = true; 
    }
  }
  
  getBoxesForSlides(url){
    return this.http.get(url);
  }

  viewSlideBoxInfo(index){    
    if(this.modelVisibility == false){          
      var boxModel = document.getElementById("boxModel");
      var foodText = document.getElementById("modelBodyFoodText");
      foodText.textContent = this.boxAry[index].food; 
      var waterText = document.getElementById("modelBodyWaterText");
      waterText.textContent = this.boxAry[index].water; 
      var eggText = document.getElementById("modelBodyEggText");
      eggText.textContent = this.boxAry[index].egg; 
      var tempText = document.getElementById("modelBodyTempText");
      tempText.textContent = this.boxAry[index].temp; 
      var noteText = document.getElementById("modelBodyNoteText"); 
      document.getElementById("modelBoxId").textContent = "Box #" + index; 
      document.getElementById("modelBoxTime").textContent = this.boxAry[index].time; 
      noteText.textContent = this.boxAry[index].description;   
      document.getElementById("boxModel").style.zIndex = "1";        
      document.getElementById("boxModel").toggleAttribute("hidden");
      document.getElementById("boxModel").addEventListener("webkitAnimationEnd", function handler(e){ 
        document.getElementById("boxModel").classList.remove("modelSlideInClass");
        e.currentTarget.removeEventListener(e.type, handler); 
        
      }, false
      );
      this.modelVisibility = true;
      document.getElementById("boxModel").classList.add("modelSlideInClass");
    }   
  }
  changeZ(){     
    if(this.modelVisibility == true){       
      document.getElementById("boxModel").addEventListener("webkitAnimationEnd", function handler(e){ 
        document.getElementById("boxModel").classList.remove("modelSlideOutClass");
        document.getElementById("boxModel").style.zIndex = "-1";  
        document.getElementById("boxModel").toggleAttribute("hidden");
        e.currentTarget.removeEventListener(e.type, handler); 
        }, false
      );
      this.modelVisibility = false;
      document.getElementById("boxModel").classList.add("modelSlideOutClass");
    }    
    
    
  }
}






