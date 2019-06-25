import { ActionaccidentService } from './../../../shared/services/actionaccident.service';
import { Accident } from 'shared/table/table';
import { TreeNode } from 'primeng/components/common/api';
import { LastidService } from 'shared/services/lastid.service';
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

@Component({
  selector: 'app-action',
  templateUrl: 'action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  /* @Input() idaccident: Accident; */
  titlelist = 'Action';
  actions: any[];
  selectedAction: Action;
  selectedNode: TreeNode;
  // action: any;
  newAction: Action = {
    datecreate: new Date(),
    dateupdate: new Date(),
    id: 0,
 /*    idparent: this.idaccident, */
    kind: 'M',
    state: 'C',
    lastuser: 'ali',
    name: '',
    owner: 'ali'
  };
  dialogVisible = false;
  newMode = false;

  lastids: any[];
  lastid: any;
  datePipe: DatePipe;
  // titlelist = 'Marque';

  constructor(private service: ActionService, private actionaccidentService: ActionaccidentService) {
  }

  ngOnInit() {
    this.loadData();
    this.datePipe = new DatePipe('en-US');
    // this.loadLastId(); 
  }

  loadData() {
/*     this.service.getByQueryParam({ 'idparent': this.idaccident.id }) */
      this.service.getAll()
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

  getNameOfKind(kind: string): string {
    let name: string;
    switch (kind) {
      case 'R': {
        name = `        Recomandation - accident`;
        break;
      }
      case 'A': {
        name = `        Action - accident`;
        break;
      }
      case 'M': {
        name = `        Action - manuel`;
        break;
      }
      case 'O': {
        name = `        Ops card`;
        break;
      }
      case 'I': {
        name = `       Investigation - accident`;
        break;
      }
    }
    return name;
  }


  createAction() {
/*     this.newAction.idaccident = this.idaccident; */
    const value = this.datePipe.transform(this.newAction.datecreate, 'yyMMddHHmmss');
    this.newAction.id = +value;
    this.dialogVisible = false;
    this.actions = [this.newAction, ...this.actions];
    this.service.create(this.newAction)
      .subscribe(newAction => {
        this.loadData();
      }, (error: AppError) => {
        this.actions.splice(0, 1);
        if (error instanceof BadInput) {
        } else {
          throw error;
        }
      });
  }

  deleteAction(_action: Action) {
    let index = this.actions.indexOf(_action);
    this.actions.splice(index, 1);
    this.actions = [...this.actions];
    this.service.delete(_action.id)
      .subscribe(
        () => { this.loadData(); },
        (error: Response) => {
          this.actions.splice(index, 0, _action);

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
      /* idparent: this.idaccident, */
      kind: 'M',
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

  save() {
    let actions = [...this.actions];
    if (this.newMode) {
      actions.push(this.newAction);
    } else {
      actions[this.findSelectedActionIndex()] = this.newAction;
    }
    this.actions = actions;
    this.newAction = null;
    this.dialogVisible = false;
  }

  delete() {
    let index = this.findSelectedActionIndex();
    this.actions = this.actions.filter((val, i) => i !== index);
    this.newAction = null;
    this.dialogVisible = false;
  }

  onRowSelect(event) {
  }

  cloneAction(c: Action): Action {
    let action: Action;
    action = c;
    return action;
  }

  findSelectedActionIndex(): number {
    return this.actions.indexOf(this.selectedAction);
  }
}



