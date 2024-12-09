import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {PortfolioComponent} from './portfolio/portfolio.component';


const route:Routes=[
  {
    path:'',
    component:LoginComponent

  },
  {
    path:'search',
    component:PortfolioComponent 
  }
  
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(route)
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }