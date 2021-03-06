import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { AgentService } from 'shared/services/agent.service';
import { TreeNode } from 'primeng/components/common/api';
import { LastidService } from 'shared/services/lastid.service';
import { NotFoundError } from '../../../core/component/common/not-found-error';
import { AppError } from '../../../core/component/common/app-error';
import { BadInput } from '../../../core/component/common/bad-input';
import { AccidentagentshService } from 'shared/services/accidentagentsh.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { Accidentagentsh, AccidentagentshPK, Agent, EventArgs, Mode, Vwagent } from 'shared/table/table';
import { PanelModule } from 'primeng/primeng';
import { Http, Response } from '@angular/http';
import { isUndefined, isNullOrUndefined } from 'util';
import { VwagentService } from 'shared/services/vwagent.service';



@Component({
  selector: 'app-accidentagentsh',
  templateUrl: 'accidentagentsh.component.html',
  styleUrls: ['./accidentagentsh.component.css']
})

export class AccidentagentshComponent implements OnInit {
  @Input() iddamage: number;
  @Input() idgrid: number;
  @Input() titlelist: string;


  accidentagentshs: Accidentagentsh[];
  agents: Agent[];
  selectedAccidentagentsh: Accidentagentsh;
  selectedNode: TreeNode;
  agent: Agent;
  filteredAgents: any[];

  accidentagentshPK: AccidentagentshPK;
  newAccidentagentsh: Accidentagentsh = {
    accidentagentshPK: {idagent: '', iddamage : this.iddamage},
    accidentdomain: 1,
    agent: null,
    countstopwork: 0,
    datecreate: new Date(),
    dateupdate: new Date(),
    idgrid: this.idgrid,
    lastuser: 'ali',
    owner: 'ali',
    samury: ' ',
    typeaccident: 'L'
  };
  dialogVisible = false;
  newMode = false;

  lastids: any[];
  lastid: any;
  mInsert: Mode.insert = 0;
  mUpdate: Mode.update = 1;

  @ViewChild('instance', { static: false }) instance: NgbTypeahead;
  focus$ = new Subject<String>();
  click$ = new Subject<String>();


  constructor(private service: AccidentagentshService, private serviceAgent: AgentService, private lastidService: LastidService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.getByQueryParam({ 'iddamage': this.iddamage, 'idgrid': this.idgrid })
      .subscribe(accidentagentshs => {
        this.accidentagentshs = accidentagentshs;
      });
    this.serviceAgent.getAll()
    .subscribe(agents => {
      this.agents = agents;
    })
  }

  getAgent(id?): Agent {
    if (!isNullOrUndefined(id) && !isNullOrUndefined(this.agents)) {
     return this.agents.find(item => item.id === id);
    }
  }

  getName(agent?: Agent): string {
    if (!isNullOrUndefined(agent)) {
       return agent.firstname + ' ' + agent.lastname;
    }
  }

  searchAgent = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => (term === '' ? this.agents : this.agents.filter(v => (v.firstname + ' ' + v.lastname).toLowerCase()
        .indexOf(term.toLowerCase()) > -1)).slice(0, 10));

  formatter = (x: { firstname: string; lastname: string }) => this.getName(x);

  isAccptedGrid(value: number) {
    return value >= 2 && value <= 4;
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

  performAction(eventArgs: EventArgs) {
    switch (eventArgs.mode) {
      case this.mInsert: {
                          this.dialogVisible = eventArgs.dialogVisible;
                          this.createAccidentagentsh();
                          break;
                        }
      case this.mUpdate: {
                          this.updateAccidentagentsh(<Accidentagentsh>eventArgs.item);
                          break;
                        }
    }
  }


  createAccidentagentsh() {
    this.dialogVisible = false;
   // this.newAccidentagentsh.accidentagentshPK.idagent = this.agent.id;
    this.accidentagentshs = [this.newAccidentagentsh, ...this.accidentagentshs];
    console.log('aa = ' + JSON.stringify(this.newAccidentagentsh));
    this.service.create(this.newAccidentagentsh)
      .subscribe(newAccidentagentsh => {
        console.log('aa = enter');
        this.loadData();
      }, (error: AppError) => {
        console.log('aa = erreur');
        this.accidentagentshs.splice(0, 1);
        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
        }
      });
  }

  deleteAccidentagentsh(_accidentagentsh: Accidentagentsh) {
    let index = this.accidentagentshs.indexOf(_accidentagentsh);
    this.accidentagentshs.splice(index, 1);
    this.accidentagentshs = [...this.accidentagentshs];
    this.service.delete(_accidentagentsh.accidentagentshPK)
      .subscribe(
      () => { this.loadData(); },
      (error: Response) => {
        this.accidentagentshs.splice(index, 0, _accidentagentsh);

        if (error instanceof NotFoundError) {
          alert('this post has already been deleted');
        } else {
          throw error;
        }
      }
      );
  }

  updateAccidentagentsh(_accidentagentsh) {
    this.service.update(_accidentagentsh)
      .subscribe(updateaccidentagentsh => {
        this.loadData();
      });
  }

  cancelUpdate(_accidentagentsh) {
    //
  }

  showNewDialoge() {
    this.dialogVisible = true;
    this.newMode = true;
    this.newAccidentagentsh = {
      accidentagentshPK: {idagent: '', iddamage : this.iddamage},
      accidentdomain: 1,
      agent: null,
      countstopwork: 0,
      datecreate: new Date(),
      dateupdate: new Date(),
      idgrid: this.idgrid,
      lastuser: 'ali',
      owner: 'ali',
      samury: ' ',
      typeaccident: 'L'
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
    let accidentagentshs = [...this.accidentagentshs];
    if (this.newMode) {
      accidentagentshs.push(this.newAccidentagentsh);
    } else {
      accidentagentshs[this.findSelectedAccidentagentshIndex()] = this.newAccidentagentsh;
    }
    this.accidentagentshs = accidentagentshs;
    this.newAccidentagentsh = null;
    this.dialogVisible = false;
  }

  delete() {
    let index = this.findSelectedAccidentagentshIndex();
    this.accidentagentshs = this.accidentagentshs.filter((val, i) => i !== index);
    this.newAccidentagentsh = null;
    this.dialogVisible = false;
  }

  onRowSelect(event) {
  }

  cloneAccidentagentsh(c: Accidentagentsh): Accidentagentsh {
    let accidentagentsh: Accidentagentsh;
    accidentagentsh = c;
    return accidentagentsh;
  }

  findSelectedAccidentagentshIndex(): number {
    return this.accidentagentshs.indexOf(this.selectedAccidentagentsh);
  }

  filterAgents(event) {
    this.filteredAgents = [];
    for (let i = 0; i < this.agents.length; i++) {
      let agent = this.agents[i];
      if ((agent.firstname.toLowerCase().indexOf(event.query.toLowerCase()) === 0) ||
          (agent.lastname.toLowerCase().indexOf(event.query.toLowerCase()) === 0)  ||
          (agent.id.toLowerCase().indexOf(event.query.toLowerCase()) === 0)) {
        this.filteredAgents.push(agent);
      }
    }
  }
}



