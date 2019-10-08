import { isNullOrUndefined } from 'util';
import { AgentService } from 'shared/services/agent.service';
import { SiteService } from 'shared/services/site.service';
import { Agent, Site, EventArgs } from 'shared/table/table';
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
  site: Site;
  newid: string;
  constructor() { }

  ngOnInit() {
  }


  onChangeDate(item: Accident, event) {
    console.log('1');
    item.curdate = event;
    console.log('2');
  }

  onChangeItem(item: Accident, field: string, event) {
    console.log('3');
    const agent = <Agent> event;
    agent['_displayname'] = this.displayNameAgent(event, ['name']);
    this.item[field] = agent;
    console.log('4');
  }

  onChangeSiteOfItem(item: Accident, field: string, event) {
    console.log('5');
      this.item[field] = <Site> event;
      this.item[field]._displayname = this.displayNameSite(event, ['name']);
      console.log('6');
  }


  perform(item: Accident, event) {
    console.log('7');
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
    console.log('7');
  }

  cancel(item) {
    const eventargs: EventArgs = { item: this.item, mode: Mode.delete, dialogVisible: false };
    this.operation.emit(eventargs);
  }

  displayNameAgent(item: any, args: string[]): string {
    console.log('8');
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
    console.log('9');
  }

  displayNameSite(item: any, args: string[]): string {
    console.log('10');
    let result = '';
    if (item !== null) {
      if (args.length > 0) {
        result = item[args[0]];
      }
    }
    return result;
    console.log('11');
  }

}


