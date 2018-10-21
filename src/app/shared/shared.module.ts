import { AggravatingfactorService } from './services/aggravatingfactor.service';
import { InspectedsiteService } from './services/inspectedsite.service';
import { InspectplanningService } from './services/inspectplanning.service';
import { VwgridforaccidentService } from './services/vwgridforaccident.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  OrganizationChartModule,
  CalendarModule,
  CheckboxModule,
  CodeHighlighterModule,
  DataGridModule,
  DataTableModule,
  DialogModule,
  DropdownModule,
  GrowlModule,
  InplaceModule,
  ListboxModule,
  PanelModule,
  RadioButtonModule,
  TabViewModule,
} from 'primeng/primeng';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {TreeNode} from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';
import { RatingModule } from 'primeng/rating';
import { CarouselModule } from 'primeng/carousel';
import { TableModule } from 'primeng/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ActivityComponent } from 'shared/component/activity/activity.component';
import { AgentComponent } from 'shared/component/agent/agent.component';
import { BitComponent } from 'shared/component/bit/bit.component';
import { EntrepriseComponent } from 'shared/component/entreprise/entreprise.component';
import { LabelsComponent } from 'shared/component/label/labels.component';
import { MarkComponent } from 'shared/component/mark/mark.component';
import { NatureComponent } from 'shared/component/nature/nature.component';
import { NotFoundComponent } from 'shared/component/notfound/notFound.component';
import { OperationComponent } from 'shared/component/operation/operation.component';
import { PropertyComponent } from 'shared/component/property/property.component';
import { SiteNameComponent } from 'shared/component/site-name/site-name.component';
import { SitesComponent } from 'shared/component/site/sites.component';
import { StructureComponent } from 'shared/component/structure/structure.component';
import { TypeFormationComponent } from 'shared/component/type-formation/type-formation.component';
import { TypeObjectComponent } from 'shared/component/type-object/type-object.component';
import { TypeOperationComponent } from 'shared/component/type-operation/type-operation.component';
import { UnitmeasureComponent } from 'shared/component/unitmeasure/unitmeasure.component';
import { VwpropertyComponent } from 'shared/component/vwproperty/vwproperty.component';
import { AccidentService } from 'shared/services/accident.service';
import { AccidentagenteeService } from 'shared/services/accidentagentee.service';
import { AccidentagentshService } from 'shared/services/accidentagentsh.service';
import { AccidentagentshbitService } from 'shared/services/accidentagentshbit.service';
import { AccidentagenttpService } from 'shared/services/accidentagenttp.service';
import { AccidentfileService } from 'shared/services/accidentfile.service';
import { AccidentmaterialService } from 'shared/services/accidentmaterial.service';
import { AccidentnatureService } from 'shared/services/accidentnature.service';
import { AccidentvehiculeService } from 'shared/services/accidentvehicule.service';
import { ActionService } from 'shared/services/action.service';
import { ActivityService } from 'shared/services/activity.service';
import { AgentService } from 'shared/services/agent.service';
import { BitService } from 'shared/services/bit.service';
import { BitclassService } from 'shared/services/bitclass.service';
import { CaseagentService } from 'shared/services/caseagent.service';
import { CauseService } from 'shared/services/cause.service';
import { DamageService } from 'shared/services/damage.service';
import { DamagedefinitionService } from 'shared/services/damagedefinition.service';
import { DPropertyService } from 'shared/services/dproperty.service';
import { ElementService } from 'shared/services/element.service';
import { EntrepriseService } from 'shared/services/entreprise.service';
import { GridService } from 'shared/services/grid.service';
import { InstanceService } from 'shared/services/instance.service';
import { IPropertyService } from 'shared/services/iproperty.service';
import { JobpostingService } from 'shared/services/jobposting.service';
import { LabelService } from 'shared/services/label.service';
import { LastidService } from 'shared/services/lastid.service';
import { ListagentService } from 'shared/services/listagent.service';
import { MarkService } from 'shared/services/mark.service';
import { NatureService } from 'shared/services/nature.service';
import { NPropertyService } from 'shared/services/nproperty.service';
import { ObjectService } from 'shared/services/object.service';
import { OperationService } from 'shared/services/operation.service';
import { OpscardService } from 'shared/services/opscard.service';
import { PostService } from 'shared/services/post.service';
import { PropertyService } from 'shared/services/property.service';
import { RankService } from 'shared/services/rank.service';
import { RecommendationService } from 'shared/services/recommendation.service';
import { SiteService } from 'shared/services/site.service';
import { StructureService } from 'shared/services/structure.service';
import { TitletaskService } from 'shared/services/titletask.service';
import { TypeObjectService } from 'shared/services/type-object.service';
import { TypeOperationService } from 'shared/services/type-operation.service';
import { UnitMeasureService } from 'shared/services/unit-measure.service';
import { UploadfileService } from 'shared/services/uploadfile.service';
import { VPropertyService } from 'shared/services/vproperty.service';
import { Vw$accidentagentshbitService } from 'shared/services/vw$accidentagentshbit.service';
import { VwaccidentnatureService } from 'shared/services/vwaccidentnature.service';
import { VwdamageService } from 'shared/services/vwdamage.service';
import { VwdamageaccidentnatureService } from 'shared/services/vwdamageaccidentnature.service';
import { VwdamagewithrankService } from 'shared/services/vwdamagewithrank.service';
import { VwelementdamageService } from 'shared/services/vwelementdamage.service';
import { VwelementgridService } from 'shared/services/vwelementgrid.service';
import { VwgridService } from 'shared/services/vwgrid.service';
import { VwnotelementofnatureaccidentService } from 'shared/services/vwnotelementofnatureaccident.service';
import { VwnotnatureofaccidentService } from 'shared/services/vwnotnatureofaccident.service';
import { VwpropertyService } from 'shared/services/vwproperty.service';

import { PdfViewerModule } from '../../../node_modules/ng2-pdf-viewer';
import { DialogModalComponent } from 'shared/component/dialog-modal/dialog-modal.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatIconModule } from '../../../node_modules/@angular/material';
import { VwsitenotinspectedService } from './services/vwsitenotinspected.service';
import { VwinspectedsiteService } from './services/vwinspectedsite.service';
import { AggravatingfactorComponent } from './component/aggravatingfactor/aggravatingfactor.component';
/* import {FormBuilder, FormGroup, Validators} from '@angular/forms'; */

//
// import {TreeTableModule} from 'primeng/treetable';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    /* FormBuilder,
    FormGroup,
    Validators, */
    MatStepperModule,
    OrganizationChartModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    DataGridModule,
    GrowlModule,
    ListboxModule,
    PanelModule,
    AutoCompleteModule,
    TabViewModule,
    TreeTableModule,
    RatingModule,
    ScrollPanelModule,
    CardModule,
    InplaceModule,
    DropdownModule,
    DialogModule,
    DataTableModule,
    RadioButtonModule,
    TableModule,
    CheckboxModule,
    CodeHighlighterModule,
    PdfViewerModule,
    CalendarModule,
    CarouselModule,
    NgbModule.forRoot(),
  ],
  exports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    /* FormBuilder,
    FormGroup,
    Validators, */
    MatStepperModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    DataGridModule,
    GrowlModule,
    ListboxModule,
    PanelModule,
    AutoCompleteModule,
    TabViewModule,
    TreeTableModule,
    ScrollPanelModule,
    CardModule,
    InplaceModule,
    DropdownModule,
    DialogModule,
    DataTableModule,
    RatingModule,
    RadioButtonModule,
    TableModule,
    CheckboxModule,
    CodeHighlighterModule,
    PdfViewerModule,
    CalendarModule,
    NgbModule.forRoot().ngModule,
    NotFoundComponent,
    LabelsComponent,
    MarkComponent,
    TypeObjectComponent,
    TypeOperationComponent,
    OperationComponent,
    ActivityComponent,
    SitesComponent,
    UnitmeasureComponent,
    TypeFormationComponent,
    NatureComponent,
    BitComponent,
    AgentComponent,
    StructureComponent,
    OperationComponent,
    PropertyComponent,
    EntrepriseComponent,
    VwpropertyComponent,
    SiteNameComponent,
    DialogModalComponent,
    CarouselModule,
  ],
  declarations: [
    NotFoundComponent,
    LabelsComponent,
    MarkComponent,
    TypeObjectComponent,
    TypeOperationComponent,
    OperationComponent,
    ActivityComponent,
    SitesComponent,
    UnitmeasureComponent,
    TypeFormationComponent,
    NatureComponent,
    BitComponent,
    AgentComponent,
    StructureComponent,
    OperationComponent,
    PropertyComponent,
    EntrepriseComponent,
    VwpropertyComponent,
    SiteNameComponent,
    DialogModalComponent
  ],
  providers: [
    PostService,
    LabelService,
    SiteService,
    TitletaskService,
    MarkService,
    ActivityService,
    UnitMeasureService,
    TypeObjectService,
    TypeOperationService,
    OperationService,
    LastidService,
    ObjectService,
    PropertyService,
    InstanceService,
    VwpropertyService,
    DPropertyService,
    IPropertyService,
    NPropertyService,
    VPropertyService,
    JobpostingService,
    CaseagentService,
    ListagentService,
    NatureService,
    ElementService,
    RankService,
    GridService,
    BitService,
    AgentService,
    AccidentService,
    AccidentagentshService,
    AccidentagenteeService,
    AccidentagenttpService,
    VwelementdamageService,
    VwdamageService,
    VwaccidentnatureService,
    VwdamageaccidentnatureService,
    AccidentvehiculeService,
    VwnotnatureofaccidentService,
    AccidentnatureService,
    CauseService,
    RecommendationService,
    BitclassService,
    AccidentagentshbitService,
    Vw$accidentagentshbitService,
    ActionService,
    OpscardService,
    VwelementgridService,
    VwnotelementofnatureaccidentService,
    VwgridService,
    VwgridforaccidentService,
    VwdamagewithrankService,
    DamageService,
    EntrepriseService,
    AccidentmaterialService,
    DamagedefinitionService,
    StructureService,
    AccidentfileService,
    UploadfileService,
    InspectedsiteService,
    InspectplanningService,
    VwsitenotinspectedService,
    VwinspectedsiteService,
    AggravatingfactorService
  ]
})
export class SharedModule { }
