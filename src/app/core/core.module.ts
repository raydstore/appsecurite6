import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './component/nav/nav.component';
import { HomeComponent } from './component/home/home.component';
import { NoAccessComponent } from './component/no-access/no-access.component';
import { LogonComponent } from './component/logon/logon.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    LogonComponent,
    NavComponent,
    HomeComponent,
    NoAccessComponent
  ],
  exports: [
    NavComponent,
    HomeComponent,
    LogonComponent
  ]
})
export class CoreModule { }
