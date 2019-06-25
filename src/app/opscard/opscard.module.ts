import { OpscardComponent } from './component/opscard/opscard.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'opscard', component: OpscardComponent },
    ])
  ],
  declarations: [
    OpscardComponent,
  ]
})
export class OpscardModule { }
