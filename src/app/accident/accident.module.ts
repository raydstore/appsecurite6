import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutocompleteComponent } from 'shared/component/autocomplete/autocomplete.component';
// import { CalendarComponent } from 'shared/component/calendar/calendar.component';
import { GridComponent } from 'shared/component/grid/grid.component';
import { RankComponent } from 'shared/component/rank/rank.component';

import { SharedModule } from './../shared/shared.module';
import { AccidentComponent } from './component/accident/accident.component';
import { AccidentagenteeComponent } from './component/accidentagentee/accidentagentee.component';
import { AccidentagentshComponent } from './component/accidentagentsh/accidentagentsh.component';
import { AccidentagentshbitComponent } from './component/accidentagentshbit/accidentagentshbit.component';
import { AccidentagenttpComponent } from './component/accidentagenttp/accidentagenttp.component';
import { AccidentdetailComponent } from './component/accidentdetail/accidentdetail.component';
import { AccidentfileComponent } from './component/accidentfile/accidentfile.component';
import { AccidentmaterialComponent } from './component/accidentmaterial/accidentmaterial.component';
import { AccidentnatureComponent } from './component/accidentnature/accidentnature.component';
import { AccidentvehiculeComponent } from './component/accidentvehicule/accidentvehicule.component';
import { AccidentvehiculenonshComponent } from './component/accidentvehiculenonsh/accidentvehiculenonsh.component';
import { AccidentvehiculeshComponent } from './component/accidentvehiculesh/accidentvehiculesh.component';
import { ActionComponent } from './component/action/action.component';
import { ActionassignmentComponent } from './component/actionassignment/actionassignment.component';
import { CauseComponent } from './component/cause/cause.component';
import { DamageComponent } from './component/damage/damage.component';
import { DamagedefinitionComponent } from './component/damagedefinition/damagedefinition.component';
import { ElementComponent } from './component/element/element.component';
import { ElementdamageComponent } from './component/elementdamage/elementdamage.component';
import { ElementswitchComponent } from './component/elementswitch/elementswitch.component';
import { RecommendationComponent } from './component/recommendation/recommendation.component';
import { VwdamagewithrankComponent } from './component/vwdamagewithrank/vwdamagewithrank.component';
import { VwelementgridComponent } from './component/vwelementgrid/vwelementgrid.component';
import { VwgridComponent } from './component/vwgrid/vwgrid.component';
import {
  VwnotelementofnatureaccidentComponent,
} from './component/vwnotelementofnatureaccident/vwnotelementofnatureaccident.component';
import { VwnotnatureofaccidentComponent } from './component/vwnotnatureofaccident/vwnotnatureofaccident.component';
import { FaccidentComponent } from './container/faccident/faccident.component';
import { FaccidentagentshComponent } from './container/faccidentagentsh/faccidentagentsh.component';
import { VwgridforaccidentComponent } from './component/vwgridforaccident/vwgridforaccident.component';
import { AggravatingfactorComponent } from './component/aggravatingfactor/aggravatingfactor.component';
import { AccidentvehiculeinsuranceComponent } from './component/accidentvehiculeinsurance/accidentvehiculeinsurance.component';
import { AccidentvehiculedriverComponent } from './component/accidentvehiculedriver/accidentvehiculedriver.component';
import { AccidentvehiculeownerComponent } from './component/accidentvehiculeowner/accidentvehiculeowner.component';
import { AccidentvehiculedrivershComponent } from './component/accidentvehiculedriversh/accidentvehiculedriversh.component';
import { AccidentvehiculedrivernsComponent } from './component/accidentvehiculedriverns/accidentvehiculedriverns.component';
import { PrintComponent } from './component/print/print.component';
import { DamagedescriptionComponent } from './component/damagedescription/damagedescription.component';
import { VwactionaccidentComponent } from './component/vwactionaccident/vwactionaccident.component';
import { AccidentpictureComponent } from './component/accidentpicture/accidentpicture.component';



@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'accident', component: AccidentComponent },
/*       { path: '', redirectTo: '/home' , pathMatch: 'full'},
      { path: '**', component: NotFoundComponent } */
    ])

  ],
  declarations: [
    ElementComponent,
    RankComponent,
    GridComponent,
    AccidentComponent,
    AccidentnatureComponent,
    DamageComponent,
    CauseComponent,
    RecommendationComponent,
    AccidentagentshComponent,
    ElementswitchComponent,
    AccidentagenteeComponent,
    AccidentagenttpComponent,
    AccidentdetailComponent,
    ElementdamageComponent,
    AccidentvehiculeComponent,
    AccidentvehiculeshComponent,
    AccidentvehiculenonshComponent,
    VwnotnatureofaccidentComponent,
    AccidentagentshbitComponent,
    ActionComponent,
    VwnotelementofnatureaccidentComponent,
    VwelementgridComponent,
    VwgridComponent,
    VwdamagewithrankComponent,
    AccidentmaterialComponent,
    DamagedefinitionComponent,
    ActionassignmentComponent,
    AccidentfileComponent,
    /* CalendarComponent, */
    /* AutocompleteComponent, */
    FaccidentComponent,
    FaccidentagentshComponent,
    VwgridforaccidentComponent,
    AggravatingfactorComponent,
    AccidentvehiculeinsuranceComponent,
    AccidentvehiculedriverComponent,
    AccidentvehiculeownerComponent,
    AccidentvehiculedrivershComponent,
    AccidentvehiculedrivernsComponent,
    VwactionaccidentComponent,
    PrintComponent,
    DamagedescriptionComponent,
    VwactionaccidentComponent,
    AccidentpictureComponent,
  ]
})
export class AccidentModule { }
