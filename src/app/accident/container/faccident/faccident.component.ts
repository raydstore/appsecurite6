import { isNullOrUndefined } from 'util';
import { AgentService } from 'shared/services/agent.service';
import { SiteService } from 'shared/services/site.service';
import { Agent, Site, EventArgs } from 'shared/table/table';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Accident, Mode } from 'shared/table/table';


@Component({
  selector: 'app-faccident',
  templateUrl: './faccident.component.html',
  styleUrls: ['./faccident.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FaccidentComponent implements OnInit {
  /* private _item: Accident;
  get item() {
    return this._item;
  }
  @Input()
  set item(value: Accident) {
    console.log('i = ' + JSON.stringify(value));
    this._item = value;
    this.agentDeclare  = this._item.idagentdeclare;
    this.agentValidate = this._item.idagentvalidate;
    this.siteparent    = this._item.idsiteparent;
    this.site          = this._item.idsite;
  } */
  @Input() item: Accident;
  @Input() mode: Mode;
  @Input() sites: Site[];
  @Input() agents: Agent[];
  /* @Input() table: any; */
  @Output() operation = new EventEmitter();

  table: any = {};

  agentDeclare: Agent;
  agentValidate: Agent;
  // siteparent: Site;
  site: Site;
  newid: string;

//   sites: Site[];
  // agents: Agent[];

  // public siteService: SiteService, public agentService: AgentService
  constructor() { }

  ngOnInit() {
//  this.loadSite();
  //  this.loadAgent();
  }

  /* loadSite() {
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
  } */

  onChangeDate(item: Accident, event) {
    item.curdate = event;
  }

  onChangeItem(item: Accident, field: string, event) {
    item[field] = <Agent>event;
  }


/*   perform(event, _table) { */
  perform(event) {
/*     console.log('table = ' + JSON.stringify(this.table)); */
  //  console.log('dt = ' + JSON.stringify(_table));
    let eventargs: EventArgs;
    /* console.log('newid = ' + this.newid); */
    /* console.log('event = ' + event); */
    eventargs = this.mode === Mode.insert ? { item: this.item, mode: Mode.insert, dialogVisible: false, table: this.table }
                                          : { item: this.item, mode: Mode.update, dialogVisible: false, table: this.table };
    this.operation.emit(eventargs);
  }

  

  cancel(item) {
    console.log('cancel = ' + JSON.stringify(this.item));
    let eventargs: EventArgs = { item: this.item, mode: Mode.delete, dialogVisible: false };
    this.operation.emit(eventargs);
  }

  displayNameAgent(item: any, args: string[]): string {
    let result = '';
   /*  */
    if (!isNullOrUndefined(item))  {
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

}


