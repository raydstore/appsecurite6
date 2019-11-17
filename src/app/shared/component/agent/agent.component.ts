import { Vwagent } from './../../table/table';
import { TreeNode } from 'primeng/components/common/api';
import { LastidService } from 'shared/services/lastid.service';
import { NotFoundError } from '../../../core/component/common/not-found-error';
import { AppError } from '../../../core/component/common/app-error';
import { BadInput } from '../../../core/component/common/bad-input';
import { AgentService } from 'shared/services/agent.service';
import { Component, OnInit } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { Agent } from 'shared/table/table';
import { PanelModule } from 'primeng/primeng';
import { Http, Response } from '@angular/http';
import { VwagentService } from 'shared/services/vwagent.service';
import { PrintService } from 'shared/services/print.service';

@Component({
  selector: 'app-agent',
  templateUrl: 'agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  agents: Vwagent[];
  selectedAgent: Agent;
  selectedNode: TreeNode;
  // agent: any;
  newAgent: Agent = {
    datecreate: new Date(),
    dateupdate: new Date(),
    id: '',
    lastuser: 'ali',
    firstname: '',
    lastname: '',
    dateofbirth: new Date(),
    owner: 'ali'
  };
  dialogVisible = false;
  newMode = false;
  cols: any[];

  lastids: any[];
  lastid: any;
  titlelist = 'Agent';

  constructor(private service: AgentService, private vwagentService: VwagentService, private _printService: PrintService) {
  }

  ngOnInit() {
    this._printService.sendTargetToPrint({id: 0, name: 'agent'});
    this.loadData();
    this.cols = [
      { field: 'id', header: 'Matricule' },
      { field: 'firstname', header: 'Nom' },
      { field: 'lastname', header: 'Prénom' },
      { field: 'dateofbirth', header: 'Né le' },
      { field: 'placofbirth', header: 'Né a' },
      { field: 'datecreate', header: 'datecreate' },
      { field: 'dateupdate', header: 'dateupdate' },
      { field: 'owner', header: 'owner' },
      { field: 'lastuser', header: 'lastuser' }
    ];
    // this.loadLastId();
  }

  loadData() {
    this.vwagentService.getAll()
      .subscribe(agents => {
        this.agents = agents;
      });
  }

  nodeExpand(event) {
    this.selectedNode = event.node;
  }

  isSelected(event) {
    return this.selectedNode === event.node ? true : false;
  }


  createAgent() {
    this.dialogVisible = false;
    this.agents = [this.newAgent, ...this.agents];
    this.service.create(this.newAgent)
      .subscribe(newAgent => {
        this.loadData();
      }, (error: AppError) => {
        this.agents.splice(0, 1);
        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
          throw error;
        }
      });
  }

  deleteAgent(_agent: Agent) {
    const index = this.agents.indexOf(_agent);
    this.agents.splice(index, 1);
    this.agents = [...this.agents];
    this.service.delete(_agent.id)
      .subscribe(
      () => { this.loadData(); },
      (error: Response) => {
        this.agents.splice(index, 0, _agent);

        if (error instanceof NotFoundError) {
          alert('this post has already been deleted');
        } else {
          throw error;
        }
      }
      );
  }

  updateAgent(_agent, inputFirstname: HTMLInputElement, inputLastname: HTMLInputElement, inputHiredate: HTMLInputElement) {
    _agent.firstname = inputFirstname.value;
    _agent.lastname  = inputLastname.value;
    _agent.hiredate = inputHiredate.value;
    this.service.update(_agent)
      .subscribe(updateagent => {
        this.loadData();
      });
  }

  cancelUpdate(_agent) {
    //
  }

  showNewDialoge() {
    this.dialogVisible = true;
    this.newMode = true;
    this.newAgent = {
      datecreate: new Date(),
      dateupdate: new Date(),
      id: '',
      lastuser: 'ali',
      firstname: '',
      lastname: '',
      dateofbirth: new Date(),
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
    let agents = [...this.agents];
    if (this.newMode) {
      agents.push(this.newAgent);
    } else {
      agents[this.findSelectedAgentIndex()] = this.newAgent;
    }
    this.agents = agents;
    this.newAgent = null;
    this.dialogVisible = false;
  }

  delete() {
    const index = this.findSelectedAgentIndex();
    this.agents = this.agents.filter((val, i) => i !== index);
    this.newAgent = null;
    this.dialogVisible = false;
  }

  onRowSelect(event) {
  }

  cloneAgent(c: Agent): Agent {
    let agent: Agent;
    agent = c;
    return agent;
  }

  findSelectedAgentIndex(): number {
    return this.agents.indexOf(this.selectedAgent);
  }

  onChangeDate(event) {

  }
}



