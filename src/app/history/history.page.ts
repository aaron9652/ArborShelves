import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular'

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  test:any[]=[]; 
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

}
