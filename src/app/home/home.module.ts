import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { HomePage } from './home.page';
import { FirebaseUIModule } from 'firebaseui-angular';



@NgModule({
  imports: [
    FirebaseUIModule,
    
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule, 
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage],
  exports: [HomePage]
})

export class HomePageModule {

  
}

