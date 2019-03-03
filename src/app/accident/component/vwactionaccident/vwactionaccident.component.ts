import { ActionaccidentService } from './../../../shared/services/actionaccident.service';
import { Accident, Actionaccident, VwactionAccident } from 'shared/table/table';
import { TreeNode } from 'primeng/components/common/api';
import { NotFoundError } from '../../../core/component/common/not-found-error';
import { AppError } from '../../../core/component/common/app-error';
import { BadInput } from '../../../core/component/common/bad-input';
import { ActionService } from 'shared/services/action.service';
import { Component, OnInit, Input } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { Action } from 'shared/table/table';
import { PanelModule } from 'primeng/primeng';
import { Http, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { VwactionaccidentService } from 'shared/services/vwactionaccident.service';
import { map, filter, scan, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-vwactionaccident',
  templateUrl: './vwactionaccident.component.html',
  styleUrls: ['./vwactionaccident.component.css']
})
export class VwactionaccidentComponent implements OnInit {

  @Input() idaccident: Accident;
  @Input() titlelist: string;
  actions: VwactionAccident[];
  selectedAction: VwactionAccident;
  selectedNode: TreeNode;
  // action: any;
  newAction: Action = {
    datecreate: new Date(),
    dateupdate: new Date(),
    id: 0,
    kind: 'R',
    state: 'C',
    lastuser: 'ali',
    name: '',
    owner: 'ali'
  };

  newActionaccident: Actionaccident = {
    datecreate: new Date(),
    dateupdate: new Date(),
    idaction: 0,
    idaccident: this.idaccident,
    kind: 'R',
    lastuser: 'ali',
    owner: 'ali'
  };

  dialogVisible = false;
  newMode = false;

  datePipe: DatePipe;
  // titlelist = 'Marque';

  constructor(private service: VwactionaccidentService, private serviceAction: ActionService,
    private actionaccidentService: ActionaccidentService) {
  }

  ngOnInit() {
    this.loadData();
    this.datePipe = new DatePipe('en-US');
    // this.loadLastId(); 
  }

  loadData() {
    this.service.getByQueryParam({ 'idaccident': this.idaccident.id })
      .subscribe(actions => {
        this.actions = actions;
      });
  }

  nodeExpand(event) {
    this.selectedNode = event.node;
  }

  isSelected(event) {
    return this.selectedNode === event.node ? true : false;
  }


  createAction() {
    const value = this.datePipe.transform(this.newAction.datecreate, 'yyMMddHHmmss');
    this.newAction.id = +value;
    this.dialogVisible = false;
    // this.actions = [this.newAction, ...this.actions];
    this.serviceAction.create(this.newAction)
      .subscribe(newAction => {
        this.newActionaccident.idaccident = this.idaccident;
        this.newActionaccident.idaction = this.newAction.id;
        this.newActionaccident.datecreate = this.newAction.datecreate;
        this.newActionaccident.dateupdate = this.newAction.dateupdate;
        this.newActionaccident.owner = this.newAction.owner;
        this.newActionaccident.lastuser = this.newAction.lastuser;
        console.log('action = ' + JSON.stringify(this.newAction));
        console.log('newActionaccident = ' + JSON.stringify(this.newActionaccident));
        this.actionaccidentService.create(this.newActionaccident)
          .subscribe(newActionaccident => {
            this.loadData();
          }, (error: AppError) => {
            if (error instanceof BadInput) {
            } else {
              throw error;
            }
          });
      }, (error: AppError) => {

        if (error instanceof BadInput) {
        } else {
          throw error;
        }
      });

  }

  deleteAction(_action: VwactionAccident) {
    this.actionaccidentService.delete(_action.idaction)
    .subscribe(
      () => {
        this.loadData();
        this.serviceAction.delete(_action.idaction)
      .subscribe(
        () => { },
        (error: Response) => {
          if (error instanceof NotFoundError) {
            alert('this post has already been deleted');
          } else {
            throw error;
          }
        }
      );
      },
      (error: Response) => {
        if (error instanceof NotFoundError) {
          alert('this post has already been deleted');
        } else {
          throw error;
        }
      }
    );
  }

  updateAction(_action, input: HTMLInputElement) {
    _action.name = input.value;
    this.service.update(_action)
      .subscribe(updateaction => {
        this.loadData();
      });
  }

  cancelUpdate(_action) {
    //
  }

  showNewDialoge() {
    this.dialogVisible = true;
    this.newMode = true;
    this.newAction = {
      datecreate: new Date(),
      dateupdate: new Date(),
      id: 0,
      /* idaccident: this.idaccident, */
      kind: 'R',
      state: 'C',
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


  onRowSelect(event) {
  }



  findSelectedActionIndex(): number {
    return this.actions.indexOf(this.selectedAction);
  }

}

