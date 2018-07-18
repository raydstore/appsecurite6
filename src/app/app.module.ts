import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { AccidentModule } from './accident/accident.module';
import { TitletaskComponent } from './page/titletask/titletask.component';
import { NotFoundComponent } from './page/notfound/notFound.component';
import { SitesComponent } from './page/site/sites.component';
import { OrganizationChartModule } from 'primeng/primeng';
import { LabelsComponent } from './page/label/labels.component';
import { AppErrorHandler } from './core/component/common/app-error-handler';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MarkComponent } from './page/mark/mark.component';
import { TypeObjectComponent } from './page/type-object/type-object.component';
import { TypeOperationComponent } from './page/type-operation/type-operation.component';
import { OperationComponent } from './page/operation/operation.component';
import { ActivityComponent } from './page/activity/activity.component';
import { ObjectComponent } from './page/object/object.component';
import { InstanceComponent } from './page/instance/instance.component';
import { UnitmeasureComponent } from './page/unitmeasure/unitmeasure.component';
import { JobpostingComponent } from './page/jobposting/jobposting.component';
import { TypeFormationComponent } from './page/type-formation/type-formation.component';
import { FormationComponent } from './page/formation/formation.component';
import { AlertComponent } from './page/alert/alert.component';
import { DialogModalComponent } from './page/dialog-modal/dialog-modal.component';
import { PropertyComponent } from './page/property/property.component';
import { VwpropertyComponent } from './page/vwproperty/vwproperty.component';
import { InstanceObjectComponent } from './page/instance-object/instance-object.component';
import { SiteNameComponent } from './page/site-name/site-name.component';
import { CaseagentComponent } from './page/caseagent/caseagent.component';
import { ListagentComponent } from './page/listagent/listagent.component';
import { NatureComponent } from './page/nature/nature.component';
import { ElementComponent } from './accident/component/element/element.component';
import { RankComponent } from './page/rank/rank.component';
import { GridComponent } from './page/grid/grid.component';
import { BitComponent } from './page/bit/bit.component';
import { AgentComponent } from './page/agent/agent.component';
import { OpscardComponent } from './page/opscard/opscard.component';
import { EntrepriseComponent } from './page/entreprise/entreprise.component';
import { StructureComponent } from './page/structure/structure.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './core/component/home/home.component';





@NgModule({
  declarations: [
    AppComponent,
    LabelsComponent,
    SitesComponent,
    NotFoundComponent,
    TitletaskComponent,
    MarkComponent,
    TypeObjectComponent,
    TypeOperationComponent,
    OperationComponent,
    ActivityComponent,
    ObjectComponent,
    InstanceComponent,
    UnitmeasureComponent,
    JobpostingComponent,
    TypeFormationComponent,
    FormationComponent,
    AlertComponent,
    DialogModalComponent,
    PropertyComponent,
    VwpropertyComponent,
    InstanceObjectComponent,
    SiteNameComponent,
    OperationComponent,
    CaseagentComponent,
    ListagentComponent,
    NatureComponent,
    BitComponent,
    AgentComponent,
    EntrepriseComponent,
    OpscardComponent,
    StructureComponent
  ],
  imports: [
    OrganizationChartModule,
    OrganizationChartModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home' , pathMatch: 'full'},
      { path: 'activity', component: ActivityComponent },
      { path: 'label', component: LabelsComponent },
      { path: 'mark', component: MarkComponent },
      { path: 'typeobject', component: TypeObjectComponent },
      { path: 'typeoperation', component: TypeOperationComponent },
      { path: 'operation', component: OperationComponent },
      { path: 'unitmeasure', component: UnitmeasureComponent },
      { path: 'site', component: SitesComponent },
      { path: 'structure', component: StructureComponent },
      { path: 'object', component: ObjectComponent },
      { path: 'operation', component: OperationComponent },
      { path: 'titletask', component: TitletaskComponent },
      { path: 'instance', component: InstanceComponent },
      { path: 'jobposting', component: JobpostingComponent },
      { path: 'home', component: HomeComponent },
      { path: 'agent', component: AgentComponent },
      { path: 'entreprise', component: EntrepriseComponent },
      { path: 'nature', component: NatureComponent },
      { path: 'element', component: ElementComponent },
      { path: 'rank', component: RankComponent },
      { path: 'grid', component: GridComponent },
      { path: 'bit', component: BitComponent },
      { path: '**', component: NotFoundComponent }
    ]),
    SharedModule,
    AdminModule,
    AccidentModule,
    CoreModule,
  ],
  providers: [
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
