import { DatePipe } from '@angular/common';
import { ActionService } from 'shared/services/action.service';
import { StructureService } from 'shared/services/structure.service';
import { Vwactionsended, Structure, Action, Sendaction, Actionassignment } from 'shared/table/table';
import { SendactionService } from 'shared/services/sendaction.service';
import { Component, OnInit } from '@angular/core';
import { VwactionsendedService } from 'shared/services/vwactionsended.service';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-sendaction',
  templateUrl: './sendaction.component.html',
  styleUrls: ['./sendaction.component.css']
})
export class SendactionComponent implements OnInit {

  vwactionsendeds: Vwactionsended[];
  structures: Structure[] = [];
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

  constructor(private sendactionService: SendactionService, private vwactionsendedService: VwactionsendedService,
    private structureService: StructureService, private actionService: ActionService) { }

  ngOnInit() {
    this.laodAction();
    /* this.laodStructure(); */
    this.loadData();
    this.datePipe = new DatePipe('en-US');
    this.laodStructure();
  }

  loadData() {
    this.vwactionsendedService.getAll().
      subscribe(vwactionsendeds => {
        this.vwactionsendeds = vwactionsendeds;
      });
  }

  laodStructure() {
    this.structureService.getAll().
      subscribe(structures => {
         this.structures = structures;
       /*  for (let i = 0; i < structures.length; i++) {
          this.structures = [...this.structures, {label: structures[i].name, value: structures[i]}];
          } */
      });
  }

  laodAction() {
    this.actionService.getAll().
      subscribe(actions => {
         this.actions = actions;
        /* for (let i = 0; i < actions.length; i++) {
          this.actions = [...this.actions, {label: actions[i].name, value: actions[i]}];
          } */
      });
  }

  initSendaction() {
     this.newSendaction = {
       id: 0,
       curdate: new Date(),
       owner: 'ali',
       lastuser: 'ali',
       datecreate: new Date(),
       dateupdate: new Date(),
     };
  }

  initActionassignment() {
    this.newActionassignment = {
      idsendaction: 0,
      idstructure: 0,
      idaction: 0,
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

  createSendaction() {

  }

  updateSendaction(item) {

  }

  deleteSendaction(m) {

  }

  cancelUpdate(_action) {
    //
  }

  showNewDialoge() {
    this.dialogVisible = true;
    this.newMode = true;
    this.initSendaction();
    this.initActionassignment();
  }

  hideNewDialoge() {
    this.dialogVisible = false;
  }

}
