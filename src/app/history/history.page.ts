import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Script } from 'vm';
import { delay } from 'q';


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
  async boxTest(name: any){
    
    
    
    if (document.getElementById(name).hidden == true){ 
      document.getElementById(name).toggleAttribute("hidden");
      
    } 
    else{
      document.getElementById(name).classList.toggle("slide-in-both-ways");
      document.getElementById(name).classList.toggle("slide-in-reverse"); 
      
      //document.getElementById(name).classList.replace("slide-in-both-ways","slide-in-reverse");
      //document.getElementById(name).hidden = true; 
    }

  }
  toggle(){
  document.getElementById("item").classList.toggle  
  }
  
}


