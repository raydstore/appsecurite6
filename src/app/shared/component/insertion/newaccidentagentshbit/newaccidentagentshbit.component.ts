import { Bit } from 'shared/table/table';
// import { AccidentagentshbitService } from './../../../services/accidentagentshbit.service';
import { InputData, Accidentagentshbit, Accidentagentsh } from './../../../table/table';
import { AccidentagentshbitService } from 'shared/services/accidentagentshbit.service';
import { NewData } from './../newData';
import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { isUndefined, isNullOrUndefined } from 'util';
/* import { Accidentagentshbit } from 'shared/table/table'; */


const _newAccidentagentshbit: Accidentagentshbit = {
  accidentagentsh: null,
  idgrid: 0,
  idbit: '',
  idbitclass: '',
  name: '',
  kind: '',
  datecreate: new Date(),
  dateupdate: new Date(),
  id: 0,
  lastuser: 'ali',
  owner: 'ali'
};

@Component({
  selector: 'app-newaccidentagentshbit',
  templateUrl: './newaccidentagentshbit.component.html',
  styleUrls: ['./newaccidentagentshbit.component.css']
})
export class NewaccidentagentshbitComponent extends NewData<Accidentagentshbit> implements OnInit, OnChanges {
  @Input() dialogVisible: boolean;
  @Input() accidentagentsh: Accidentagentsh;
  @Input() bits: Bit[];
  @Output() closeDialog = new EventEmitter<InputData<Accidentagentshbit>>();

  constructor(service: AccidentagentshbitService) {
    // _newAccidentagentshbit.name = this.accidentagentsh;
    super(service, _newAccidentagentshbit);
      this._closeDialog = this.closeDialog;
  }

  ngOnChanges() {
    this.onChange();
    console.log('on init change = ' + JSON.stringify(this.bits));
  }

  ngOnInit() {
    console.log('on init = ' + JSON.stringify(this.bits));
    _newAccidentagentshbit.accidentagentsh = this.accidentagentsh;
  }

  onChangeItem(item: Accidentagentshbit, field: string, event) {
    console.log('enter on change accidentagentshbit = ' + JSON.stringify(event));
    item[field] = <string>event;
  }

  tdisplayName(item: any, args: string[]): string {
    console.log('1');
    let result = '';
    console.log('2');
    if (!isNullOrUndefined(item) && (!isNullOrUndefined(this.bits))) {
      console.log('3');
    for (const bit of this.bits) {
      if (bit.id === this.newT.idbit) {
        result = bit.name;
        this.newT.idbitclass = bit.idbitclass;
        this.newT.kind = bit.kind;
        break;
      }
    }
    console.log('4');
  }
  return result;
}

}
