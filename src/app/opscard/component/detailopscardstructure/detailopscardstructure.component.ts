import { BadInput } from 'app/core/component/common/bad-input';
import { AppError } from 'app/core/component/common/app-error';
import { SiteService } from 'shared/services/site.service';
import { Detailopscardstructure, Structure, Detailopscard, Vwreststructureofopscard } from 'shared/table/table';
import { Component, OnInit, Input } from '@angular/core';
import { DetailopscardstructureService } from 'shared/services/detailopscardstructure.service';
import { StructureService } from 'shared/services/structure.service';
import { VwreststructureofopscardService } from 'shared/services/vwreststructureofopscard.service';
import { TreeNode } from 'primeng/api';
import { isUndefined, isNullOrUndefined } from 'util';

@Component({
  selector: 'app-detailopscardstructure',
  templateUrl: './detailopscardstructure.component.html',
  styleUrls: ['./detailopscardstructure.component.css']
})
export class DetailopscardstructureComponent implements OnInit {

  @Input() detailopscard: Detailopscard;

  detailOpscardstructures: Detailopscardstructure[];
  selectedDetailOpscardstructure: Detailopscardstructure;
  structures: Vwreststructureofopscard[];
  structure: Vwreststructureofopscard = null;
  newStructure: Structure = {
    datecreate: new Date(),
    dateupdate: new Date(),
    id: 0,
    lastuser: 'ali',
    name: '',
    owner: 'ali'
  };
  selectedStructure: Detailopscardstructure;
  newDetailopscardstructure: Detailopscardstructure = {
    datecreate: new Date(),
    dateupdate: new Date(),
    detailopscard: this.detailopscard,
    detailopscardstructurePK: {
                                idopscard: 0,
                                idstructure: 0,
                              },
    lastuser: 'ali',
    owner: 'ali',
    structure: this.newStructure
  };

  selectedNode: TreeNode;

  titlelist = 'Leadeur';

  constructor(private service: DetailopscardstructureService, private structureService: StructureService,
              private vwreststructureofopscardService: VwreststructureofopscardService) { }

  ngOnInit() {
    this.loadData();
    this.loadStructure();
  }

  loadData() {
    this.service.getByQueryParam({idopscard: this.detailopscard.idopscard}).
    subscribe(detailOpscardstructures => {
      this.detailOpscardstructures = detailOpscardstructures;
    });
  }

  loadStructure() {
    this.vwreststructureofopscardService.getByQueryParam({idopscard: this.detailopscard.idopscard}).
    subscribe(structures => {
      this.structures = structures;
    })
  }

  onChangeStructureOfdetailopscard(structure, field, event) {
    this.structure               = <Vwreststructureofopscard> event;
    this.newStructure.id         = this.structure.idstructure;
    this.newStructure.name       = this.structure.name;
    this.newStructure.datecreate = this.structure.datecreate;
    this.newStructure.dateupdate = this.structure.dateupdate;
    this.newStructure.owner      = this.structure.owner;
    this.newStructure.lastuser   = this.structure.lastuser;
  }

  displayNameStructure(item: any, args: string[]): string {
    let result = '';
    if (item !== null) {
      if (args.length > 0) {
        result = item[args[0]];
      }
    }
    return result;
  }

  deleteDetailOpscardstructure(item) {

  }

  updateDetailOpscardstructure(item) {

  }

  cancelUpdate(item) {

  }

  showNewDialoge() {

  }

  addStructure() {
    this.newDetailopscardstructure.detailopscardstructurePK.idopscard   = this.detailopscard.idopscard;
    this.newDetailopscardstructure.detailopscardstructurePK.idstructure = this.structure.idstructure;
    this.newDetailopscardstructure.structure                            = this.newStructure;
    this.service.create(this.newDetailopscardstructure).
    subscribe(newActionopscard => {
        this.loadData();
        this.loadStructure();
        this.structure = null;
    }, (error: AppError) => {
         if (error instanceof BadInput) {
         } else {
         throw error;
       }
     });
  }

  deleteAction(item) {

  }

  isEmptyStructure(): boolean {
    let result = false;
    if (isNullOrUndefined(this.structure)) {
      result = true;
    };
    return result;
  }

}
