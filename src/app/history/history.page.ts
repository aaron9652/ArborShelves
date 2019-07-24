import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Script } from 'vm';
import { delay } from 'q';
import { del } from 'selenium-webdriver/http';
import { HttpClient } from '@angular/common/http';
import { throws } from 'assert';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase/app'; 
import { FirebaseApp } from '@angular/fire';
import { Key } from 'protractor';



@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit 
 {
  
  public hstCls = class  {
    constructor(
                public food: string,
                public water: string,
                public egg: string,           
                public temp: string, 
                public time: string, 
                public description: string){
      
  
    }
    //  public description: string; 
    //  public egg: string; 
    //  public food: string; 
    //  public temp: string; 
    //  public time: string; 
    //  public water: string; 
        
      
  };
  public boxCls = class{
    constructor(public histories: any[]=[]){}

  } 
  slideOpts = {
    initialSlide: 1,
    speed: 40000
  };
  public items = ["adsf","adsf","adsf","adsf","adsf","adsf","adsf","adsf","adsf"]
  public boxAry: any[]=[]; 
   
  public lsTst: any[] = []; 
  public boxIdx = 0; 
  public dbDir; 
  public boxd: any;
  public dbUrl = "https://arborshelvestest.firebaseio.com/Boxes.json"; 
  public boxes: Object;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll; 
  
  constructor(public datePipe: DatePipe, public http: HttpClient ) { 
    
    // var a = "https://arborshelvestest.firebaseio.com/Boxes"; 
    // var lst = firebase.database().refFromURL("https://arborshelvestest.firebaseio.com/Boxes/box0"); 

    // lst.orderByKey().limitToLast(1).on("child_added", function(snapshot) {
    //   console.log(snapshot.key);
    // });
    
     
  }
  async ngOnInit() {
    let idx = 0; 

    let subBox = await this.getBox(this.dbUrl).subscribe(data=>{
      this.boxd =  JSON.parse(JSON.stringify(data)); 
      Object.values(this.boxd).map(boxes=>{
        let hstAry: any[]=[];
        Object.values(boxes).map(history=>{
          hstAry.push(new this.hstCls(history.food, history.water, history.egg, history.temp, history.time, history.description)); 
        });
        this.boxAry.push(hstAry);  
         
      });
      console.log(this.boxAry);        
    }); 
     
    // this.getBox(this.dbUrl).subscribe(data=>{
    //    let  Object.keys(this.boxd).map(key => (console.log(key)));console.log(this.boxd); });
    // let  map = await 
    await subBox; 
    //await map; 
    console.log("test");
    // this.boxd.forEach(boxes=>{
    //   boxes.forEach(element => {
        
    //   });
    // }) 
  }

  getBox(url) {
    return this.http.get(url);
  }
     
  async boxTest(name: any){
    if (document.getElementById(name).style.display == 'none'){ 
      document.getElementById(name).classList.replace("slide-in-reverse","slide-in-both-ways")
      document.getElementById(name).style.display = 'block';
    } 
    else{
      var myBox = document.getElementById(name);
      
      myBox.addEventListener("webkitAnimationEnd", function handler(e){ 
      myBox.style.display = 'none'; e.currentTarget.removeEventListener(e.type, handler); }, false);
      myBox.classList.replace("slide-in-both-ways","slide-in-reverse");
    }
  }
  callTest(num: any){
    console.log(num); 
  }
  trackElement(element: any) {
    console.log(element);
    
    //return element ? element.guid : null
  }
}


