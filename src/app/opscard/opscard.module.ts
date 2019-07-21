import { OpscardComponent } from './component/opscard/opscard.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'shared/shared.module';
import { DetailopscardComponent } from './component/detailopscard/detailopscard.component';
import { DetailopscardstructureComponent } from './component/detailopscardstructure/detailopscardstructure.component';
import { ActionopscardComponent } from './component/actionopscard/actionopscard.component';
import { WorkComponent } from './component/work/work.component';

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
    DetailopscardComponent,
    DetailopscardstructureComponent,
    ActionopscardComponent,
    WorkComponent,
  ]
})
export class OpscardModule { }
