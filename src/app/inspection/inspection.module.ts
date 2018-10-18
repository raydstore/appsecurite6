import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InspectedsiteComponent } from './inspectedsite/inspectedsite.component';
import { InspectplanningComponent } from './inspectplanning/inspectplanning.component';
import { InspectionComponent } from './inspection/inspection.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild([
      { path: 'inspection', component: InspectedsiteComponent },
      { path: 'inspectionplanning', component: InspectplanningComponent }
    ])
  ],
  declarations: [InspectedsiteComponent, InspectplanningComponent, InspectionComponent]
})
export class InspectionModule { }
