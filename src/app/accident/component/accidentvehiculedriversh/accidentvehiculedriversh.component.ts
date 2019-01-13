import { AgentService } from 'shared/services/agent.service';
import { Accidentvehiculedriversh, Agent, Vwagent } from './../../../shared/table/table';
import { AccidentvehiculedrivershService } from './../../../shared/services/accidentvehiculedriversh.service';
import { Accidentvehiculedriver } from 'shared/table/table';
import { Component, OnInit, Input } from '@angular/core';
import { isUndefined, isNullOrUndefined } from 'util';
import { VwagentService } from 'shared/services/vwagent.service';

@Component({
  selector: 'app-accidentvehiculedriversh',
  templateUrl: './accidentvehiculedriversh.component.html',
  styleUrls: ['./accidentvehiculedriversh.component.css']
})
export class AccidentvehiculedrivershComponent implements OnInit {

  @Input() accidentvehiculedriversh: Accidentvehiculedriversh;

 /*  accidentvehiculedriversh: Accidentvehiculedriversh; */
  agents: Agent [];

  constructor(private agentService: AgentService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.agentService.getAll()
       .subscribe(agents => {
         this.agents = agents;
       });
  }

  displayName(item: any, args: string[]): string {
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

  onChangeItem(item: Accidentvehiculedriversh, field: string, event) {
    item[field] = <Agent> event;
  }


}
