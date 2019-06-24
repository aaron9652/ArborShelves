import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Script } from 'vm';
import { delay } from 'q';
import { del } from 'selenium-webdriver/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  public dbUrl = "https://arborshelvestest.firebaseio.com/Boxes/Box0.json"; 
  public boxes: Object = this.getBox(this.dbUrl).subscribe(); 
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


