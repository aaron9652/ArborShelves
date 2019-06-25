import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Script } from 'vm';
import { delay } from 'q';
import { del } from 'selenium-webdriver/http';
import { HttpClient } from '@angular/common/http';
import { throws } from 'assert';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit 
 {
  public boxd: any[]=[];
  public dbUrl = "https://arborshelvestest.firebaseio.com/Boxes.json"; 
  public boxes: Object;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  test:any[]=[]; 
  listTest:any[]=[]; 
  public testID; 
  constructor(public http: HttpClient) { 
    this.test = [
      "label",
      "label",
      "label",
      "label",
      "label",
      "label"
    ];
    this.listTest = [
      "label",
      "label",
      "label",
      "label",
      "label",
      "label"
    ];
  }
   
  ngOnInit() {
    this.getBox(this.dbUrl).subscribe(data=>{this.boxd =  JSON.parse(JSON.stringify(data)); console.log(this.boxd);});
    
    //this.db(); 
  }

  getBox(url) {
    return this.http.get(url);
  }
    
  async db(){
    let k = 10; 
    let cnt = 0; 
    
    let obj    
    while(cnt<k){
      let box = "box" + cnt; 
      let his = "history" + cnt; 
      obj = { [box]: {"history1": {"egg": "done", "water": "done", "food": "done", "temp": "done"} }  };
      this.http.put(this.dbUrl, obj).subscribe((data)=>{});
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


