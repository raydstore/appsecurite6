import { NotFoundError } from './../../../core/component/common/not-found-error';
import { AgentService } from 'shared/services/agent.service';
import { Accidentvehiculedriversh, Agent, Vwagent } from './../../../shared/table/table';
import { AccidentvehiculedrivershService } from './../../../shared/services/accidentvehiculedriversh.service';
import { Accidentvehiculedriver } from 'shared/table/table';
import { Component, OnInit, Input, Output, OnChanges, ViewEncapsulation, EventEmitter } from '@angular/core';
import { isUndefined, isNullOrUndefined } from 'util';
import { VwagentService } from 'shared/services/vwagent.service';

@Component({
  selector: 'app-accidentvehiculedriversh',
  templateUrl: './accidentvehiculedriversh.component.html',
  styleUrls: ['./accidentvehiculedriversh.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccidentvehiculedrivershComponent implements OnInit, OnChanges {

  @Input() accidentvehiculedriversh: Accidentvehiculedriversh;
  @Output() changeItem = new EventEmitter();

 /*  accidentvehiculedriversh: Accidentvehiculedriversh; */
  agents: Agent [];
  agent: Agent;
  templateAgent: Agent = {
    id: '',
    firstname: '',
    lastname: '',
    dateofbirth: null,
    placeofbirth: '',
    adress: '',
  };
  constructor(private agentService: AgentService) { }

  setAgent() {
    if (isUndefined(this.accidentvehiculedriversh.idagent)) {
      this.agent = this.templateAgent;
    } else {
      this.agent = this.accidentvehiculedriversh.idagent;
    }
    console.log('24689 = ' + JSON.stringify(this.agent));
    console.log('24689 = ' + JSON.stringify(this.accidentvehiculedriversh.idagent));
  }

  ngOnInit() {
    this.loadData();
    this.setAgent();
  }

  ngOnChanges() {
    console.log('enter ngonchange');
    this.setAgent();
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

  /* updateAccidentvehiculedriversh() {
      this.accidentvehiculedrivershService.update(this.accidentvehiculedriversh)
        .subscribe(() => {
  //         this.loadData();
        },
        (error: Response) => {
          if (error instanceof NotFoundError) {
            alert('this post has already been deleted');
          } else {
            throw error;
          }
        });
    } */

  onChangeItem(event) {
    this.accidentvehiculedriversh.idagent = <Agent> event;
    
    console.log('emit s');
    this.changeItem.emit('S');
    this.setAgent();
   // this.updateAccidentvehiculedriversh();
    console.log('onc = ' + JSON.stringify(this.accidentvehiculedriversh.idagent));
  }


}
