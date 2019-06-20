import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';


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
      "label",
      "label",
      "label",
      "label",
      "label",
      "label",
      "label",
      "label",
      "label",
      "label",
      "label",
      "label",
      "label",
      "label",
      "label",
      "label",
      "label",
      "label",
      "label",
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
  boxTest(name: any){
    (document.getElementById(name).hidden == true) ? document.getElementById(name).hidden = false : document.getElementById(name).hidden = true; 
  }
}
