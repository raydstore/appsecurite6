import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './component/nav/nav.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { NoAccessComponent } from './component/no-access/no-access.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    NavComponent,
    HomeComponent,
    LoginComponent,
    NoAccessComponent
  ],
  exports: [
    NavComponent,
    HomeComponent
  ]
})
export class CoreModule { }
