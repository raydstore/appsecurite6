import { BadInput } from 'app/core/component/common/bad-input';
import { AppError } from 'app/core/component/common/app-error';
import { ActionService } from 'shared/services/action.service';
import { DatePipe } from '@angular/common';
import { Actionopscard, Action, Opscard, Vwactionopscard } from 'shared/table/table';
import { Component, OnInit, Input } from '@angular/core';
import { ActionopscardService } from 'shared/services/actionopscard.service';
import { NotFoundError } from 'app/core/component/common/not-found-error';
import { TreeNode } from 'primeng/api';
import { VwactionopscardService } from 'shared/services/vwactionopscard.service';

@Component({
  selector: 'app-actionopscard',
  templateUrl: './actionopscard.component.html',
  styleUrls: ['./actionopscard.component.css']
})
export class ActionopscardComponent implements OnInit {

  @Input() opscard: Opscard;
  actionopscards: Actionopscard[];
  selectedActionopscard: Actionopscard;
  selectedNode: TreeNode;

  newAction: Action = {
    datecreate: new Date(),
    dateupdate: new Date(),
    id: 0,
    kind: 'O',
    state: 'C',
    lastuser: 'ali',
    name: '',
    owner: 'ali'
  };

  newActionopscard: Actionopscard = {
    datecreate: new Date(),
    dateupdate: new Date(),
    idaction: 0,
    idopscard: 0,
    kind: 'O',
    lastuser: 'ali',
    owner: 'ali'
  };

  dialogVisible = false;
  newMode = false;

  datePipe: DatePipe;
  titledialog: string;
  titlelist = 'Action ops card';


  constructor(private service: VwactionopscardService, private actionopscardService: ActionopscardService,
     private actionService: ActionService) { }

  ngOnInit() {
    this.loadData();
    this.datePipe = new DatePipe('en-US');
  }

  loadData() {
    this.service.getByQueryParam({ 'idopscard': this.opscard.id })
      .subscribe(actionopscards => {
        this.actionopscards = actionopscards;
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
    this.actionService.create(this.newAction)
      .subscribe(newAction => {
        this.newActionopscard.idaction   = this.newAction.id;
        this.newActionopscard.idopscard  = this.opscard.id;
        this.newActionopscard.kind       = this.newAction.kind;
        this.newActionopscard.datecreate = this.newAction.datecreate;
        this.newActionopscard.dateupdate = this.newAction.dateupdate;
        this.newActionopscard.owner      = this.newAction.owner;
        this.newActionopscard.lastuser   = this.newAction.lastuser;
        console.log('action = ' + JSON.stringify(this.newAction));
        console.log('newActionopscard = ' + JSON.stringify(this.newActionopscard));
        this.actionopscardService.create(this.newActionopscard)
          .subscribe(newActionopscard => {
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

  getNameOfKind(kind: string): string {
    let name: string;
    kind === 'R' ? name = `        Recomandation` : name = `        Action`;
    return name;
  }

  deleteAction(_action: Actionopscard) {
    this.actionopscardService.delete(_action.idaction)
    .subscribe(
      () => {
        this.loadData();
        this.actionService.delete(_action.idaction)
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

  updateAction(_action: Vwactionopscard, input: HTMLInputElement) {
    // _action.name = input.value;
    this.newAction.id         = _action.idaction;
    this.newAction.name       = input.value;
    this.newAction.datecreate = _action.datecreate;
    this.newAction.dateupdate = _action.dateupdate;
    this.newAction.kind       = _action.kind;
    this.newAction.state      = _action.state;
    this.newAction.owner      = _action.owner;
    this.newAction.lastuser   = _action.lastuser;
    this.actionService.update(this.newAction)
      .subscribe(updateaction => {
        this.loadData();
      });
  }

  cancelUpdate(_action) {
    //
  }

  showNewDialoge() {
  /*   this.titledialog = title; */
    this.dialogVisible = true;
    this.newMode = true;
    this.newAction = {
      datecreate: new Date(),
      dateupdate: new Date(),
      id: 0,
      /* idopscard: this.idopscard, */
      kind: 'O',
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
    return this.actionopscards.indexOf(this.selectedActionopscard);
  }



}


