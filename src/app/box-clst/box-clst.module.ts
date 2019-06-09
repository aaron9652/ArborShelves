import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';


import { BoxCLstPage } from './box-clst.page';


const routes: Routes = [
  {
    path: '',
    component: BoxCLstPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
    
  ],
  declarations: [BoxCLstPage],
  exports: [BoxCLstPage]
})
export class BoxCLstPageModule {}
