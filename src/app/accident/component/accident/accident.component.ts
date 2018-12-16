import { Site, Agent, IAgent, TFunctionName, Mode, EventArgs } from 'shared/table/table';
import { SiteService } from 'shared/services/site.service';
import { VwdamageaccidentnatureService } from 'shared/services/vwdamageaccidentnature.service';
import { VwelementdamageService } from 'shared/services/vwelementdamage.service';
import { TreeNode } from 'primeng/components/common/api';
import { LastidService } from 'shared/services/lastid.service';
import { NotFoundError } from '../../../core/component/common/not-found-error';
import { AppError } from '../../../core/component/common/app-error';
import { BadInput } from '../../../core/component/common/bad-input';
import { AccidentService } from 'shared/services/accident.service';
import { Component, Injectable, OnInit, ViewChild, Input } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
/* import { InputTextareaModule } from 'primeng/inputtextarea'; */
import { Accident } from 'shared/table/table';
import { PanelModule } from 'primeng/primeng';
import { Http, Response } from '@angular/http';
import { CheckboxModule } from 'primeng/checkbox';
import { AgentService } from 'shared/services/agent.service';


import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { LazyLoadEvent } from 'primeng/api';
import { DatePipe } from '@angular/common';


/**
 * Example of a Native Date adapter
 */
@Injectable()
export class NgbDateNativeAdapter extends NgbDateAdapter<Date> {

  fromModel(date: Date): NgbDateStruct {
    return (date && date.getFullYear) ? { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } : null;
  }

  toModel(date: NgbDateStruct): Date {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }
}

@Component({
  selector: 'app-accident',
  templateUrl: 'accident.component.html',
  styleUrls: ['./accident.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class AccidentComponent implements OnInit {
  // @Input() displayValue;
  accidents: Accident[];
  _accidents: Accident[];

  sites: Site[];
  agents: Agent[];
  selectedAccident: Accident;
  selectedNode: TreeNode;
  newAccident: Accident;
  _newAccident: Accident;
  dialogVisible = false;
  newMode = false;
  mInsert: Mode.insert = 0;
  mUpdate: Mode.update = 1;
  // expanded = true;

  lastids: any[];
  lastid: any;
  titlelist = 'Accident';
  selectedNatures: string[];
  filteredAgentsSingle: IAgent[];
  // expandedRows: {} = {};
  totalRecords: number;

  cols: any[];

  loading: boolean;
  datePipe: DatePipe;






  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(private service: AccidentService,
    public siteService: SiteService,
    public agentService: AgentService,
    private lastidService: LastidService) {
  }



  ngOnInit() {
    //   const thisRef = this;
    this.initAccident();
    this.loadData();
    this.loadSite();
    this.loadAgent();
    this.loading = true;
    this.datePipe = new DatePipe('en-US');

    /* this.accidents.forEach(function(accident) {
      thisRef.expandedRows[accident.id] = 1;
    }); */

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'Classification', header: 'Classification' },
      { field: 'date', header: 'curdate' },
      { field: 'time', header: 'time' },
      { field: 'idsite.name', header: 'site' },
      { field: 'place', header: 'lieu' },
      { field: 'description', header: 'description' }
    ];
  }

  loadAccidentsLazy(event: LazyLoadEvent) {
    this.loading = true;

    // in a real application, make a remote request to load data using state metadata from event
    // event.first = First row offset
    // event.rows = Number of rows per page
    // event.sortField = Field name to sort with
    // event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    // filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    // imitate db connection over a network
    setTimeout(() => {
      if (this.accidents) {
        this._accidents = this.accidents.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }



  initAccident() {
    let a: any = {
      id: 0,
      classification: 'A',
      sitedescription: '',
      event: '',
      place: '',
      persondamage: '',
      propertydamage: '',
      envirenementdamage: '',
      obviouscause: '',
      idsite: null,
      curdate: new Date(),
      tabindex: 1,
      time: new Date(),
      idagentdeclare: null,
      idagentvalidate: null,
      datecreate: new Date(),
      dateupdate: new Date(),
      lastuser: 'ali',
      owner: 'ali'
    };
    this.newAccident = <Accident>a;
    this._newAccident = Object.assign({}, this.newAccident);
  }

  loadData() {
    this.service.getAll()
      .subscribe(accidents => {
        this.accidents = accidents;
        this.totalRecords = this.accidents.length;
      });
  }

  displayNameAgent(item: any, args: string[]): string {
    let result = '';
    if (item !== null) {
      if (args.length > 0) {
        result = item[args[0]];
      }
      for (let i = 1; i < args.length; i++) {
        result = result + ' ' + item[args[i]];
      }
    }
    return result;
  }

  displayNameSite(item: any, args: string[]): string {
    let result = '';
    if (item !== null) {
      if (args.length > 0) {
        result = item[args[0]];
      }
    }
    return result;
  }

  searchSite = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => (term === '' ? this.sites : this.sites.filter(v => (v.id + v.name).toLowerCase()
        .indexOf(term.toLowerCase()) > -1)).slice(0, 10));

  searchSiteParent = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => (term === '' ? this.sites : this.sites.filter(v => (v.id + v.name).toLowerCase()
        .indexOf(term.toLowerCase()) > -1)).slice(0, 10));

  searchAgentDeclare = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => (term === '' ? this.agents : this.agents.filter(v => (v.id + v.firstname).toLowerCase()
        .indexOf(term.toLowerCase()) > -1)).slice(0, 10));

  searchAgentValidate = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => (term === '' ? this.agents : this.agents.filter(v => (v.id + v.firstname).toLowerCase()
        .indexOf(term.toLowerCase()) > -1)).slice(0, 10));

  formatter = (x: { name: string }) => x.name;


  loadSite() {
    this.siteService.getAll()
      .subscribe(sites => {
        this.sites = sites;
      });
  }

  loadAgent() {
    this.agentService.getAll()
      .subscribe(agents => {
        this.agents = agents;
      });
  }

  filterAgentSingle(event) {
    let query = event.query;
    this.agentService.getAll().subscribe(agents => {
      this.agents = agents;
      this.filteredAgentsSingle = this.filterAgent(query, agents);
    });
  }


  filterAgent(query, agents: Agent[]): IAgent[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: IAgent[] = [];
    for (let i = 0; i < agents.length; i++) {
      let agent = agents[i];
      if (agent.firstname.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        let iagent: IAgent = {
          agent: agent,
          name: agent.firstname + ' ' + agent.lastname
        }
        filtered.push(iagent);
      }
    }
    return filtered;
  }


  loadLastId() {
    this.lastidService.getAll()
      .subscribe(lastids => this.lastids = lastids);
  }

  getLastid(name) {
    this.loadLastId();
    for (let lid of this.lastids) {
      if (lid.id === name) {
        return lid['count'];
      }
    }
    return 0;
  }

  get today() {
    return new Date();
  }
  /* 
    getDate(date): Date {
       return new Date(date);
    } */

  nodeExpand(event) {
    this.selectedNode = event.node;
  }

  isSelected(event) {
    return this.selectedNode === event.node ? true : false;
  }

  performAction(eventArgs: EventArgs, table: any) {
    console.log('arg arived eventargs = ' + JSON.stringify(eventArgs));
    console.log('mu = ' + JSON.stringify(this.mUpdate));
    console.log('mi = ' + JSON.stringify(this.mInsert));
    console.log('eventArgs.mode = ' + JSON.stringify(eventArgs.mode));

    switch (eventArgs.mode) {
      case this.mInsert: {
        console.log('insertion = ');
        const _accident: Accident = <Accident>eventArgs.item;
        const value = this.datePipe.transform(_accident.curdate, 'yyMMddHHmmss');
        _accident.id = +value;
        console.log('value = ' + value);
        console.log('_accident.id = ' + _accident.id);
        this.dialogVisible = eventArgs.dialogVisible;
        this.createAccident();
        table.toggleRow(this.newAccident);
        this.selectedAccident = this.accidents[1];
        this.newAccident = Object.assign({}, this._newAccident);
        break;
      }
      case this.mUpdate: {
        console.log('update = ' + JSON.stringify(eventArgs.item));
        this.updateAccident(<Accident>eventArgs.item);
        break;
      }
      /* default: {
             this.dialogVisible = false;
             this.initAccident();
      } */
    }
  }

  createAccident() {
    this.dialogVisible = false;
    this.accidents = [this.newAccident, ...this.accidents];
    console.log(JSON.stringify(this.newAccident));
    this.service.create(this.newAccident)
      .subscribe(newAccident => {
        /*  this.loadData(); */
      }, (error: AppError) => {
        this.accidents.splice(0, 1);
        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
          throw error;
        }
      });
  }

  deleteAccident(_accident: Accident) {
    console.log('1');
    console.log(JSON.stringify(_accident));
    const index = this.accidents.indexOf(_accident);
    this.accidents.splice(index, 1);
    this.accidents = [...this.accidents];
    this.service.delete(_accident.id)
      .subscribe(
        () => { this.loadData(); },
        (error: Response) => {
          this.accidents.splice(index, 0, _accident);

          if (error instanceof NotFoundError) {
            alert('this post has already been deleted');
          } else {
            throw error;
          }
        }
      );
  }

  updateAccident(_accident) {
    // _accident.name = input.value;
    console.log(_accident);
    this.service.update(_accident)
      .subscribe(updateaccident => {
        this.loadData();
      });
  }

  cancelUpdate(_accident) {
    //
  }


  showNewDialoge() {
    console.log('a');
    this.initAccident();
    console.log('a = ' + JSON.stringify(this.newAccident));
    this.dialogVisible = true;
    this.newMode = true;
    // this.initAccident();
    /* this.newAccident = {
      id: 0,
      classification: 'A',
      sitedescription: '',
      event: '',
      idsiteparent: null,
      idsite: null,
      tabindex: 1,
      curdate: new Date(),
      time: new Date(),
      idagentdeclare: null,
      idagentvalidate: null,
      datecreate: new Date(),
      dateupdate: new Date(),
      lastuser: 'ali',
      owner: 'ali'
    }; */
  }

  onHide(event) {
    if (this.showNewDialoge) {
      this.dialogVisible = false;
    }
  }

  hideNewDialoge() {
    this.dialogVisible = false;
  }

  showDialogToAdd() {
    this.newMode = true;
    this.dialogVisible = true;
  }

  save() {
    const accidents = [...this.accidents];
    if (this.newMode) {
      accidents.push(this.newAccident);
    } else {
      accidents[this.findSelectedAccidentIndex()] = this.newAccident;
    }
    this.accidents = accidents;
    this.newAccident = null;
    this.dialogVisible = false;
  }

  delete() {
    const index = this.findSelectedAccidentIndex();
    this.accidents = this.accidents.filter((val, i) => i !== index);
    this.newAccident = null;
    this.dialogVisible = false;
  }

  onChangeDate(item: Accident, event) {
    item.curdate = event;
  }

  onChangeItem(item: Accident, field: string, event) {
    item[field] = <Agent>event;
  }

  onSelect(event) {
    console.log(event);
  }

  onRowSelect(event) {
  }

  cloneAccident(c: Accident): Accident {
    let accident: Accident;
    return accident;
  }

  findSelectedAccidentIndex(): number {
    return this.accidents.indexOf(this.selectedAccident);
  }
}



