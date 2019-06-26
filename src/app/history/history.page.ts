import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Script } from 'vm';
import { delay } from 'q';
import { del } from 'selenium-webdriver/http';
import { HttpClient } from '@angular/common/http';
import { throws } from 'assert';
import { DatePipe } from '@angular/common';
import * as firebase from 'firebase/app'; 
import { FirebaseDatabase } from '@angular/fire';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit 
 {
 
  
 
 
  public dbDir; 
  public boxd: any[]=[];
  public dbUrl = "https://arborshelvestest.firebaseio.com/Boxes.json"; 
  public boxes: Object;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll; 
  
  constructor(public datePipe: DatePipe, public http: HttpClient ) { 

  }
   
  ngOnInit() {
    this.getBox(this.dbUrl).subscribe(data=>{this.boxd =  JSON.parse(JSON.stringify(data)); console.log(this.boxd);}); 
  }

  getBox(url) {
    return this.http.get(url);
  }
    
  async db(){
    
    // let boxObj =  ["ob"];
    // this.http.patch("https://arborshelvestest.firebaseio.com/Boxes.json", boxObj).subscribe((data) => {});
    let k = 10; 
    let cnt = 0; 
    // let dscInp = "things"; 
    let obj;
        
         let his;
         let cnt2 = 0; 
         let box; 
         while(cnt<k){
    cnt2 = 0; 
    box = "box" + cnt; 
       
      while(cnt2<k){
        his = "history" + cnt2;
        obj = {"egg": "done", "water": "done", "food": "done", "temp": "done", "description": "needs...."   };
        let tas = this.http.put("https://arborshelvestest.firebaseio.com/Boxes/"+box+"/"+his+".json", obj).subscribe((data)=>{});
        await tas; 
        cnt2++;
    }
      cnt++; 
    }  
     
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
  handler = function(event){
    removeEventListener("webkitAnimationEnd", this.handler, false);
    
  }
  toggle(name: any){
    document.getElementById(name).style.display = 'none'; 
  }
  disTest(){
    console.log("hit"); 
    document.getElementById("listVis").style.visibility = "Hidden"; 
  }
  
}


