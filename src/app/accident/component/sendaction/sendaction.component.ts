import { BadInput } from 'app/core/component/common/bad-input';
import { AppError } from 'app/core/component/common/app-error';
import { DatePipe } from '@angular/common';
import { ActionService } from 'shared/services/action.service';
import { StructureService } from 'shared/services/structure.service';
import { Vwactionsended, Structure, Action, Sendaction, Actionassignment } from 'shared/table/table';
import { SendactionService } from 'shared/services/sendaction.service';
import { Component, OnInit } from '@angular/core';
import { VwactionsendedService } from 'shared/services/vwactionsended.service';
import { TreeNode } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActionassignmentService } from 'shared/services/actionassignment.service';

@Component({
  selector: 'app-sendaction',
  templateUrl: './sendaction.component.html',
  styleUrls: ['./sendaction.component.css']
})
export class SendactionComponent implements OnInit {

  vwactionsendeds: Vwactionsended[];
  vwactionrealizeds: Vwactionsended[];
  vwactionterminateds: Vwactionsended[];
  vwactionaborteds: Vwactionsended[];
  _structures: Structure[] = [];
  structures: Structure[] = [];
  _actions: Action[] = [];
  actions: Action[] = [];
  selectedStructures: Structure[] = [];
  selectedActions: Action[] = [];
  titlelist = 'Action';
  // selectedAction: Action;
  selectedNode: TreeNode;
  // action: any;
  newSendaction: Sendaction;
  newActionassignment: Actionassignment;
  /*  = {
    datecreate: new Date(),
    dateupdate: new Date(),
    id: 0,
    kind: 'M',
    state: 'C',
    lastuser: 'ali',
    name: '',
    owner: 'ali'
  }; */
  dialogVisible = false;
  newMode = false;

  lastids: any[];
  lastid: any;
  datePipe: DatePipe;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  completeStep: boolean[] = [false, false, false];
  strActionTree: TreeNode[] = [];
  AllActionNode: TreeNode[] = [];
  _stepper: MatStepper = null;
  rowGroupMetadata: any;

  constructor(private sendactionService: SendactionService, private vwactionsendedService: VwactionsendedService,
    private structureService: StructureService, private actionService: ActionService,
    private actionassignmentService: ActionassignmentService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.laodAction();
    /* this.laodStructure(); */
    this.loadData();
    this.datePipe = new DatePipe('en-US');
    this.laodStructure();
    /*  this.firstFormGroup = this._formBuilder.group({
       selectedStructures: ['', Validators.required]
     });
     this.secondFormGroup = this._formBuilder.group({
       selectedActions: ['', Validators.required]
     }); */
  }

  onSort(items: Vwactionsended[]) {
    if (!this.itemsIsEmpty(items)) {
      this.updateRowGroupMetaData(items);
    }
  }

/*   updateRowGroupMetaData(items: Vwactionsended[]) {
    this.rowGroupMetadata = {};
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const rowData = items[i];
        const namestructure = rowData.namestructure;
        if (i === 0) {
          this.rowGroupMetadata[namestructure] = { index: 0, size: 1 };
        } else {
          const previousRowData = items[i - 1];
          const previousRowGroup = previousRowData.namestructure;
          if (namestructure === previousRowGroup) {
            this.rowGroupMetadata[namestructure].size++;
          } else {
            this.rowGroupMetadata[namestructure] = { index: i, size: 1 };
          }
        }
      }
    }
  } */

  updateRowGroupMetaData(items: Vwactionsended[]) {
    this.rowGroupMetadata = {};
    if (items) {
        for (let i = 0; i < items.length; i++) {
            const rowData = items[i];
            const namestructure = rowData.namestructure;
            if (i === 0) {
                this.rowGroupMetadata[namestructure] = { index: 0, size: 1 };
            } else {
                const previousRowData = items[i - 1];
                const previousRowGroup = previousRowData.namestructure;
                if (namestructure === previousRowGroup) {
                    this.rowGroupMetadata[namestructure].size++;
                } else {
                    this.rowGroupMetadata[namestructure] = { index: i, size: 1 };
                  }
            }
        }
    }
  }

  showItem(name, index): boolean {
    let result = false;
    if (this.rowGroupMetadata[name] !== undefined) {
       result = this.rowGroupMetadata[name].index === index;
    }
    return result;
  }


  nextStep(index: number, stepper: MatStepper) {
    this.completeStep[index] = true;
    stepper.selectedIndex = index + 1;
  }

  previousStep(index: number, stepper: MatStepper) {
    stepper.selectedIndex = index - 1;
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goNext(stepper: MatStepper) {
    stepper.next();
  }

  initialisation() {
    this.strActionTree = [];
    this.selectedStructures = [];
    this.selectedActions = [];
    this.structures = JSON.parse(JSON.stringify(this._structures));
    this.actions = JSON.parse(JSON.stringify(this._actions));
    this.completeStep = [false, false, false];
  }

  reset(stepper: MatStepper) {
    this.initialisation();
    stepper.reset();
  }

  onMoveToTarget(index) {
    this.completeStep[index] = true;
    /* if (index === 1) {
      this.buildStrActionNode();
    } */
    this.buildStrActionNode();
  }

  onMoveToSource(items: any[], index) {
    if (this.itemsIsEmpty(items)) {
      this.completeStep[index] = false;
      this.completeStep[index + 1] = false;
    } else {
      this.buildStrActionNode();
    }
  }

  itemsIsEmpty(items: any[]): boolean {
    return JSON.stringify(items) === '[]';
  }

  expandAll() {
    this.strActionTree.forEach(node => {
      this.expandRecursive(node, true);
    });
  }

  collapseAll() {
    this.strActionTree.forEach(node => {
      this.expandRecursive(node, false);
    });
  }

  expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  buildAllActionNode() {
    this.AllActionNode = [];
    for (const action of this.selectedActions) {
      let value: TreeNode;
      value = {
        label: action.name,
        data: action,
        icon: 'fa fa-file-word-o'
      };
      this.AllActionNode.push(value);
    }
  }

  buildStrActionNode() {
    this.strActionTree = [];
    this.buildAllActionNode();
    // let items: TreeNode[] = [{ data: [] }];
    const items: TreeNode[] = [];
    for (const str of this.selectedStructures) {
      let value: TreeNode;
      value = {
        label: str.name,
        data: str,
        expandedIcon: 'fa-folder-open',
        collapsedIcon: 'fa-folder',
        children: this.AllActionNode,
        expanded: true
      };
      items.push(value);
    }
    this.strActionTree = items;
    // console.log('this.strActionTree = ' + JSON.stringify(this.strActionTree));
  }

  initializeView() {
    this.vwactionsendeds = [];
    this.vwactionrealizeds = [];
    this.vwactionterminateds = [];
    this.vwactionaborteds = [];
  }

  loadData() {
    this.initializeView();
    this.vwactionsendedService.getAll().
      subscribe(vwactionsendeds => {
        for (const item of vwactionsendeds) {
          switch (item.state) {
            case 'C': {
              this.vwactionsendeds.push(item);
              break;
            }
            case 'R': {
              this.vwactionrealizeds.push(item);
              break;
            }
            case 'T': {
              this.vwactionterminateds.push(item);
              break;
            }
            case 'A': {
              this.vwactionaborteds.push(item);
              break;
            }
            default: {
              break;
            }
          }
        }
        this.updateRowGroupMetaData(this.vwactionsendeds);
        this.updateRowGroupMetaData(this.vwactionrealizeds);
        this.updateRowGroupMetaData(this.vwactionterminateds);
        this.updateRowGroupMetaData(this.vwactionaborteds);
      });
  }

  laodStructure() {
    this.structureService.getAll().
      subscribe(structures => {
        this._structures = structures;
        this.structures = JSON.parse(JSON.stringify(structures)); // Object.assign({}, structures);
        /*  for (let i = 0; i < structures.length; i++) {
           this.structures = [...this.structures, {label: structures[i].name, value: structures[i]}];
           } */
      });
  }

  laodAction() {
    this.actionService.getAll().
      subscribe(actions => {
        this._actions = actions;
        this.actions = JSON.parse(JSON.stringify(actions)); // Array.({}, actions);
        /* for (let i = 0; i < actions.length; i++) {
          this.actions = [...this.actions, {label: actions[i].name, value: actions[i]}];
          } */
      });
  }

  initSendaction() {
    this.newSendaction = {
      id: 0,
      curdate: new Date(),
      idstructure: 0,
      owner: 'ali',
      lastuser: 'ali',
      datecreate: new Date(),
      dateupdate: new Date(),
    };
  }

  initActionassignment() {
    this.newActionassignment = {
      sendaction: null,
      action: null,
      actionassignmentPK: {
        idsendaction: 0,
        idaction: 0
      },
      state: 'C',
      owner: 'ali',
      lastuser: 'ali',
      datecreate: new Date(),
      dateupdate: new Date(),
    };
  }

  nodeExpand(event) {
    this.selectedNode = event.node;
  }

  isSelected(event) {
    return this.selectedNode === event.node ? true : false;
  }

  

  createSendaction(stepper: MatStepper) {
    if (this._stepper === null) {
      this._stepper = stepper;
    }
    let datecreate: Date;
    let i = 0;
    for (const itemStructure of this.strActionTree) {
      const structure: Structure = itemStructure.data;
      this.initSendaction();
      datecreate = new Date();
      datecreate.setSeconds(datecreate.getSeconds() + i);
      if (i === 0) {
        i = 1;
      }
      this.newSendaction.datecreate = datecreate;
      const value = this.datePipe.transform(datecreate, 'yyMMddHHmmss');
      this.newSendaction.id = +value;
      this.newSendaction.idstructure = structure.id;
      this.sendactionService.create(this.newSendaction)
        .subscribe(newSendaction => {
          const items = itemStructure.children;
          for (const itemAction of items) {
            this.initActionassignment();
            this.newActionassignment.actionassignmentPK.idsendaction = +value;
            this.newActionassignment.actionassignmentPK.idaction = itemAction.data.id;
            this.newActionassignment.sendaction = this.newSendaction;
            this.newActionassignment.action     = itemAction.data;
            this.newActionassignment.datecreate = this.newSendaction.datecreate;
            this.newActionassignment.dateupdate = this.newSendaction.dateupdate;
            this.newActionassignment.owner      = this.newSendaction.owner;
            this.newActionassignment.lastuser   = this.newSendaction.lastuser;
            this.actionassignmentService.create(this.newActionassignment)
              .subscribe(newActionassignment => {
                this.loadData();
              }, (error: AppError) => {
                if (error instanceof BadInput) {
                } else {
                  throw error;
                }
              });
          }
        }, (error: AppError) => {

          if (error instanceof BadInput) {
          } else {
            throw error;
          }
        }
        );
    }
    this.dialogVisible = false;
    // this.hideNewDialoge(stepper);
  }

  updateSendaction(item) {

  }

  deleteSendaction(m) {

  }

  cancelUpdate(_action) {
    //
  }

  showNewDialoge() {
    this.newMode = true;
    this.initSendaction();
    this.initActionassignment();
    if (this._stepper !== null) {
      this.reset(this._stepper);
    }
    this.dialogVisible = true;
  }

  hideNewDialoge(stepper: MatStepper) {
    this.dialogVisible = false;
    // this.reset(stepper);
  }

  perform(item: Vwactionsended, state: string) {
    const _actionassignment: Actionassignment = {
      actionassignmentPK: {
        idaction: item.idaction,
        idsendaction: item.idsendaction
      },
      sendaction: {
        id: item.idsendaction,
        curdate: item.curdate,
        idstructure: item.idstructure,
        datecreate: item.datecreate,
        dateupdate: item.dateupdate,
        owner: item.owner,
        lastuser: item.lastuser
      },
      action: {
        id: item.idaction,
        name: item.nameaction,
        kind: item.kind,
        state: item.stateaction,
        datecreate: item.adatecreate,
        dateupdate: item.adateupdate,
        owner: item.aowner,
        lastuser: item.alastuser
      },
      state: state,
      datecreate: item.aadatecreate,
      dateupdate: item.aadateupdate,
      owner: item.aaowner,
      lastuser: item.aalastuser
    };
    this.actionassignmentService.update(_actionassignment).
      subscribe(actionassignment => {
        this.loadData();
      });
  }

}
