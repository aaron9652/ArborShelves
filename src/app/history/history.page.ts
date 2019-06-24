import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Script } from 'vm';
import { delay } from 'q';
import { del } from 'selenium-webdriver/http';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  test:any[]=[]; 
  public testID; 
  constructor() { 
    this.test = [
      "label",
      "label",
      "label",
      "label",
      "label",
      "label"
    ]
  }

  ngOnInit() {
  }
  forTest(){
    for(var k = 0; k < this.test.length; k++){
      this.testID = "box" + k; 
    }
  }
  box(event: any){
    let elementId: string = (event.target as Element).id;
    console.log(elementId);
  }
  async boxTest(name: any, button: any){
    

    
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


