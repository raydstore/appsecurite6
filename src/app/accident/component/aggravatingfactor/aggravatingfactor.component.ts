import { Accident } from 'shared/table/table';
import { TreeNode } from 'primeng/components/common/api';
import { LastidService } from 'shared/services/lastid.service';
import { NotFoundError } from '../../../core/component/common/not-found-error';
import { AppError } from '../../../core/component/common/app-error';
import { BadInput } from '../../../core/component/common/bad-input';
import { AggravatingfactorService } from 'shared/services/aggravatingfactor.service';
import { Component, OnInit, Input } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { Aggravatingfactor } from 'shared/table/table';
import { PanelModule } from 'primeng/primeng';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-aggravatingfactor',
  templateUrl: 'aggravatingfactor.component.html',
  styleUrls: ['./aggravatingfactor.component.css']
})
export class AggravatingfactorComponent implements OnInit {
  @Input() idaccident: Accident;
  @Input() titlelist: string;
  aggravatingfactors: any[];
  selectedAggravatingfactor: Aggravatingfactor;
  selectedNode: TreeNode;
  // aggravatingfactor: any;
  newAggravatingfactor: any = {
    datecreate: new Date(),
    dateupdate: new Date(),
    id: 0,
    idaccident: null,
    lastuser: 'ali',
    name: '',
    owner: 'ali'
  };
  dialogVisible = false;
  newMode = false;

  lastids: any[];
  lastid: any;
  // titlelist = 'Aggravatingfactor';

  constructor(private service: AggravatingfactorService, private lastidService: LastidService) {
  }

  ngOnInit() {
    this.loadData();
    // this.loadLastId(); 
  }

  loadData() {
    this.service.getByQueryParam({'idaccident': this.idaccident.id})
      .subscribe(aggravatingfactors => {
        this.aggravatingfactors = aggravatingfactors;
      });
  }

  loadLastId() {
    this.lastidService.getAll()
      .subscribe(lastids => this.lastids = lastids);
  }

  getLastid(name) {
    let lts: any[];
    this.loadLastId();
    for (let lid of this.lastids) {
      if (lid.id === name) {
        return lid['count'];
      }
    }
    return 0;
  }

  nodeExpand(event) {
    this.selectedNode = event.node;
  }

  isSelected(event) {
    return this.selectedNode === event.node ? true : false;
  }


  createAggravatingfactor() {
    this.dialogVisible = false;
    this.newAggravatingfactor.idaccident = this.idaccident;
    this.aggravatingfactors = [this.newAggravatingfactor, ...this.aggravatingfactors];
    this.service.create(this.newAggravatingfactor)
      .subscribe(newAggravatingfactor => {
        this.loadData();
      }, (error: AppError) => {
        this.aggravatingfactors.splice(0, 1);
        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
          throw error;
        }
      });
  }

  deleteAggravatingfactor(_aggravatingfactor: Aggravatingfactor) {
    let index = this.aggravatingfactors.indexOf(_aggravatingfactor);
    this.aggravatingfactors.splice(index, 1);
    this.aggravatingfactors = [...this.aggravatingfactors];
    this.service.delete(_aggravatingfactor.id)
      .subscribe(
      () => { this.loadData(); },
      (error: Response) => {
        this.aggravatingfactors.splice(index, 0, _aggravatingfactor);
        if (error instanceof NotFoundError) {
          alert('this post has already been deleted');
        } else {
          throw error;
        }
      }
      );
  }

  updateAggravatingfactor(_aggravatingfactor, input: HTMLInputElement) {
    _aggravatingfactor.name = input.value;
    this.service.update(_aggravatingfactor)
      .subscribe(updateaggravatingfactor => {
        this.loadData();
      });
  }

  cancelUpdate(_aggravatingfactor) {
    //
  }

  showNewDialoge() {
    this.dialogVisible = true;
    this.newMode = true;
    this.newAggravatingfactor = {
      datecreate: new Date(),
      dateupdate: new Date(),
      id: 0,
      lastuser: 'ali',
      name: '',
      owner: 'ali'
    };
  }

  hideNewDialoge() {
    this.dialogVisible = false;
  }

  showDialogToAdd() {
    this.newMode = true;
    this.dialogVisible = true;
  }

  save() {
    let aggravatingfactors = [...this.aggravatingfactors];
    if (this.newMode) {
      aggravatingfactors.push(this.newAggravatingfactor);
    } else {
      aggravatingfactors[this.findSelectedAggravatingfactorIndex()] = this.newAggravatingfactor;
    }
    this.aggravatingfactors = aggravatingfactors;
    this.newAggravatingfactor = null;
    this.dialogVisible = false;
  }

  delete() {
    let index = this.findSelectedAggravatingfactorIndex();
    this.aggravatingfactors = this.aggravatingfactors.filter((val, i) => i !== index);
    this.newAggravatingfactor = null;
    this.dialogVisible = false;
  }

  onRowSelect(event) {
  }

  cloneAggravatingfactor(c: Aggravatingfactor): Aggravatingfactor {
    let aggravatingfactor: Aggravatingfactor; 
    aggravatingfactor = c;
    return aggravatingfactor;
  }

  findSelectedAggravatingfactorIndex(): number {
    return this.aggravatingfactors.indexOf(this.selectedAggravatingfactor);
  }
}



