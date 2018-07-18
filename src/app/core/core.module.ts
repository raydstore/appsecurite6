import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './component/nav/nav.component';
import { HomeComponent } from './component/home/home.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    NavComponent,
    HomeComponent
  ],
  exports: [
    NavComponent,
    HomeComponent
  ]
})
export class CoreModule { }
