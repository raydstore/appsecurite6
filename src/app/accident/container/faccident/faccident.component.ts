import { isNullOrUndefined } from 'util';
import { AgentService } from 'shared/services/agent.service';
import { SiteService } from 'shared/services/site.service';
import { Agent, Site, EventArgs, Item } from 'shared/table/table';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Accident, Mode } from 'shared/table/table';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-faccident',
  templateUrl: './faccident.component.html',
  styleUrls: ['./faccident.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FaccidentComponent implements OnInit {
  @Input() item: Accident;
  @Input() mode: Mode;
  @Input() sites: Site[];
  @Input() agents: Agent[];
  @Output() operation = new EventEmitter();

  table: any = {};

  agentDeclare: Agent;
  agentValidate: Agent;
  site: Site;
  newid: string;
  enabled: boolean = false;
  isDisabled: boolean = true; 
  filteredAgentsMultiple: any[];
  listAgent: Item[] = [];
  items: any[];


  constructor(private agentService: AgentService) { }

  ngOnInit() {
    this.loadAgent();
  }

  loadAgent() {
    this.agentService.getAll()
      .subscribe(agents => {
        for (let agent of agents) {
          if (agent !== null) {
            this.listAgent.push({ name: agent.firstname + ' ' + agent.lastname, obj: agent });
          }
        }
      });
  }



  onChangeDate(item: Accident, event) {
    item.curdate = event;
  }

  onChangeItem(item: Accident, field: string, event) {
    const agent = <Agent>event;
    agent['_displayname'] = this.displayNameAgent(event, ['name']);
    this.item[field] = agent;
  }

  onChangeSiteOfItem(item: Accident, field: string, event) {
    this.item[field] = <Site>event;
    this.item[field]._displayname = this.displayNameSite(event, ['name']);
  }


  perform(item: Accident, event) {
    const loockUp = ['idsite', 'idagentdeclare', 'idagentvalidate'];
    for (const elmnt of loockUp) {
      if (item[elmnt] != null) {
        if ('_displayname' in item[elmnt]) {
          delete item[elmnt]._displayname;
        }
      }
    }
    let eventargs: EventArgs;
    eventargs = this.mode === Mode.insert ? { item: item, mode: Mode.insert, dialogVisible: false, table: this.table }
      : { item: item, mode: Mode.update, dialogVisible: false, table: this.table };
    this.operation.emit(eventargs);
  }

  cancel(item) {
    const eventargs: EventArgs = { item: this.item, mode: Mode.delete, dialogVisible: false };
    this.operation.emit(eventargs);
  }

  displayNameAgent(item: any, args: string[]): string {
    let result = '';
    /*  */
    if ((item != null && item != undefined)) {
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
    console.log('item =' + JSON.stringify(item) + '\n' + result);
    return result;
  }

  addVictime() {

  }

  enableAddAgent() {
    this.enabled = true;
  }

  getList(): string {
    let result: string = '';
    console.log('items = ' + this.items);
    for (let item of this.items) {
      if (item !== null) {
        result === '' ? result = item.name : result = result + '\n' + item.name;
      }
    }
    return result;
  }

  addAgent(item: any) {
    /* add list of sh victims to Victim item  */
    item.victim === '' ? item.victim = this.getList() : item.victim = item.victim + '\n' + this.getList();
    /* desactivate add mode */
    this.disable()
  }

  disable() {
    /* clear suggestion */
    this.filteredAgentsMultiple = [];
    /* clear selected list */
    this.items = [];
    /* disable add  */
    this.enabled = false;
  }

  onUnselectItems() {
     this.isDisabled = this.items.length === 0;
  }

   selectValue() {
    this.isDisabled = this.items.length === 0;
  }

  filterAgentMultiple(event) {
    let query = event.query;
    this.filteredAgentsMultiple = this.filterAgent(query);
   }

  filterAgent(query): any[] {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let agent of this.listAgent) {
      if (agent !== null && agent !== undefined) {
        if (agent.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(agent);
        }
      }
    }
    return filtered;
  }

}


