import { InspectionModule } from './inspection/inspection.module';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganizationChartModule } from 'primeng/primeng';

import { AccidentModule } from './accident/accident.module';
import { ElementComponent } from './accident/component/element/element.component';
import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { AppErrorHandler } from './core/component/common/app-error-handler';
import { HomeComponent } from './core/component/home/home.component';
import { CoreModule } from './core/core.module';
import { ActivityComponent } from 'shared/component/activity/activity.component';
import { AgentComponent } from 'shared/component/agent/agent.component';
import { AlertComponent } from './alert/component/alert.component';
import { BitComponent } from 'shared/component/bit/bit.component';
import { CaseagentComponent } from './jobposting/component/caseagent/caseagent.component';
import { DialogModalComponent } from 'shared/component/dialog-modal/dialog-modal.component';
import { EntrepriseComponent } from 'shared/component/entreprise/entreprise.component';
import { FormationComponent } from './formation/component/formation.component';
import { GridComponent } from 'shared/component/grid/grid.component';
import { InstanceObjectComponent } from './instance/component/instance-object/instance-object.component';
import { InstanceComponent } from './instance/component/instance/instance.component';
import { JobpostingComponent } from './jobposting/component/jobposting/jobposting.component';
import { LabelsComponent } from 'shared/component/label/labels.component';
import { ListagentComponent } from './jobposting/component/listagent/listagent.component';
import { MarkComponent } from 'shared/component/mark/mark.component';
import { NatureComponent } from 'shared/component/nature/nature.component';
import { NotFoundComponent } from 'shared/component/notfound/notFound.component';
import { ObjectComponent } from './instance/component/object/object.component';
import { OperationComponent } from 'shared/component/operation/operation.component';
import { OpscardComponent } from './opscard/component/opscard/opscard.component';
import { RankComponent } from 'shared/component/rank/rank.component';
import { SitesComponent } from 'shared/component/site/sites.component';
import { StructureComponent } from 'shared/component/structure/structure.component';
import { TitletaskComponent } from './verification/component/titletask.component';
import { TypeObjectComponent } from 'shared/component/type-object/type-object.component';
import { TypeOperationComponent } from 'shared/component/type-operation/type-operation.component';
import { UnitmeasureComponent } from 'shared/component/unitmeasure/unitmeasure.component';
import { SharedModule } from './shared/shared.module';
import { OpscardModule } from './opscard/opscard.module';
/* import { TreeTableModule } from 'primeng/primeng';
import { TreeNode } from 'primeng/api'; */






@NgModule({
  declarations: [
    AppComponent,
    TitletaskComponent,
    ObjectComponent,
    InstanceComponent,
    JobpostingComponent,
    FormationComponent,
    AlertComponent,
    InstanceObjectComponent,
    CaseagentComponent,
    ListagentComponent,
  ],
  imports: [
    SharedModule,
    AdminModule,
    AccidentModule,
    InspectionModule,
    CoreModule,
    OpscardModule,
    // TreeTableModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home' , pathMatch: 'full'},
      { path: 'object', component: ObjectComponent },
      { path: 'titletask', component: TitletaskComponent },
      { path: 'instance', component: InstanceComponent },
      { path: 'jobposting', component: JobpostingComponent },
      { path: 'home', component: HomeComponent },

      { path: 'operation', component: OperationComponent },
      { path: 'activity', component: ActivityComponent },
      { path: 'label', component: LabelsComponent },
      { path: 'mark', component: MarkComponent },
      { path: 'typeobject', component: TypeObjectComponent },
      { path: 'typeoperation', component: TypeOperationComponent },
      { path: 'operation', component: OperationComponent },
      { path: 'unitmeasure', component: UnitmeasureComponent },
      { path: 'site', component: SitesComponent },
      { path: 'structure', component: StructureComponent },
      { path: 'agent', component: AgentComponent },
      { path: 'entreprise', component: EntrepriseComponent },
      { path: 'nature', component: NatureComponent },
      { path: 'bit', component: BitComponent },
      { path: 'rank', component: RankComponent },

      { path: 'element', component: ElementComponent },

      { path: 'grid', component: GridComponent },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
