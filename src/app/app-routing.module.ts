import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'box', loadChildren: './box-clst/box-clst.module#BoxCLstPageModule' },
  { path: 'box-scan', loadChildren: './box-scan/box-scan.module#BoxScanPageModule' },
  { path: 'log-in', loadChildren: './log-in/log-in.module#LogInPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
