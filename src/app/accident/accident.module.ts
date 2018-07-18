import { CalendarComponent } from './../shared/calendar/calendar.component';
import { AutocompleteComponent } from './../shared/autocomplete/autocomplete.component';
import { NotFoundComponent } from './../page/notfound/notFound.component';
import { SharedModule } from './../shared/shared.module';
import { ElementComponent } from './component/element/element.component';
import { RankComponent } from '../page/rank/rank.component';
import { GridComponent } from '../page/grid/grid.component';
import { AccidentComponent } from './component/accident/accident.component';
import { AccidentnatureComponent } from './component/accidentnature/accidentnature.component';
import { DamageComponent } from './component/damage/damage.component';
import { CauseComponent } from './component/cause/cause.component';
import { RecommendationComponent } from './component/recommendation/recommendation.component';
import { AccidentagentshComponent } from './component/accidentagentsh/accidentagentsh.component';
import { ElementswitchComponent } from './component/elementswitch/elementswitch.component';
import { AccidentagenteeComponent } from './component/accidentagentee/accidentagentee.component';
import { AccidentagenttpComponent } from './component/accidentagenttp/accidentagenttp.component';
import { AccidentdetailComponent } from './component/accidentdetail/accidentdetail.component';
import { ElementdamageComponent } from './component/elementdamage/elementdamage.component';
import { AccidentvehiculeComponent } from './component/accidentvehicule/accidentvehicule.component';
import { AccidentvehiculeshComponent } from './component/accidentvehiculesh/accidentvehiculesh.component';
import { AccidentvehiculenonshComponent } from './component/accidentvehiculenonsh/accidentvehiculenonsh.component';
import { VwnotnatureofaccidentComponent } from './component/vwnotnatureofaccident/vwnotnatureofaccident.component';
import { AccidentagentshbitComponent } from './component/accidentagentshbit/accidentagentshbit.component';
import { ActionComponent } from './component/action/action.component';
import { VwnotelementofnatureaccidentComponent } from './component/vwnotelementofnatureaccident/vwnotelementofnatureaccident.component';
import { VwelementgridComponent } from './component/vwelementgrid/vwelementgrid.component';
import { VwgridComponent } from './component/vwgrid/vwgrid.component';
import { VwdamagewithrankComponent } from './component/vwdamagewithrank/vwdamagewithrank.component';
import { AccidentmaterialComponent } from './component/accidentmaterial/accidentmaterial.component';
import { DamagedefinitionComponent } from './component/damagedefinition/damagedefinition.component';
import { ActionassignmentComponent } from './component/actionassignment/actionassignment.component';
import { AccidentfileComponent } from './component/accidentfile/accidentfile.component';
import { FaccidentComponent } from './container/faccident/faccident.component';
import { FaccidentagentshComponent } from './container/faccidentagentsh/faccidentagentsh.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: '/home' , pathMatch: 'full'},
      { path: 'accident', component: AccidentComponent },
      { path: '**', component: NotFoundComponent }
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
    CalendarComponent,
    AutocompleteComponent,
    FaccidentComponent,
    FaccidentagentshComponent,
  ]
})
export class AccidentModule { }
