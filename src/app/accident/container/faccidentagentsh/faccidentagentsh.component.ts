import { BadInput } from '../../../core/component/common/bad-input';
import { AppError } from '../../../core/component/common/app-error';
import { AgentService } from 'shared/services/agent.service';
import { Accidentagentsh, Mode, Agent, EventArgs } from 'shared/table/table';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { isUndefined, isNullOrUndefined } from 'util';

@Component({
  selector: 'app-faccidentagentsh',
  templateUrl: './faccidentagentsh.component.html',
  styleUrls: ['./faccidentagentsh.component.css']
})
export class FaccidentagentshComponent implements OnInit {

  @Input() item: Accidentagentsh;
  @Input() mode: Mode;
  @Input() agents: Agent[];
  @Output() operation = new EventEmitter();

  sites: Site[];
  // agents: Agent[];
  // public agentService: AgentService

  constructor() { }

  ngOnInit() {
    // this.loadAgent();
  }


  /* loadAgent() {
    this.agentService.getAll()
      .subscribe(agents => {
        this.agents = agents;
      });
  } */

  onChangeItem(item: Accidentagentsh, field: string, event) {
    /* passe choise agent to field item on accidentagent */
    this.item[field] = <Agent>event.item;
    this.item.accidentagentshPK.idagent = (<Agent>event.item).id;
  }


  perform(event) {
    /* build event message */
    let eventargs: EventArgs;
    /* build event argument to send to parent call component */
    eventargs = this.mode === Mode.insert ? { item: this.item, mode: Mode.insert, dialogVisible: false }
                                         : { item: this.item, mode: Mode.update, dialogVisible: false };
    /* send event argument  */
    this.operation.emit(eventargs);
  }

  cancel(item) {

  }

  displayNameAgent(item: any, args: string[]): string {
    let result = '';
    if (!isNullOrUndefined(item)) {
      if (args.length > 0) {
        result = item[args[0]];
      }
      for (let i = 1; i < args.length; i++) {
        result = result + ' ' + item[args[i]];
      }
    }
    return result;
  }


  /* getAgent(id?: string): Agent {
    let res: Agent  = null;
    this.agentService.getItem(id)
        .subscribe(result => res = result);
    return res;
  } */

  getAgent(id?: string): Agent {
    if (!isNullOrUndefined(id) && !isNullOrUndefined(this.agents)) {
      return this.agents.find(item => item.id === id);
    }
  }

  /* getName(agent?: Agent): string {
    if (!isNullOrUndefined(agent)) {
       return agent.firstname + ' ' + agent.lastname;
    }
  } */

}