import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { WheatherService } from './wheather.sevice';
import {HttpClientModule} from '@angular/common/http';
import { MatCardModule, MatButtonModule,MatIconModule } from '@angular/material';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule ,HttpClientModule,MatButtonModule,MatCardModule,MatIconModule,NgxSkeletonLoaderModule],
  declarations: [ AppComponent, LoginComponent, PortfolioComponent, DashboardComponent ],
  bootstrap:    [ AppComponent ],
  providers:[WheatherService]
})
export class AppModule { }
