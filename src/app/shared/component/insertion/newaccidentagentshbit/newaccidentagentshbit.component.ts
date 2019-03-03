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
    console.log('new error accidentagentsh = ' + JSON.stringify(this.accidentagentsh));
  }

  ngOnInit() {
    console.log('on init = ' + JSON.stringify(this.bits));
    // _newAccidentagentshbit.accidentagentsh = this.accidentagentsh;
  }

  onChangeItem(item: Accidentagentshbit, field: string, event) {
    console.log('enter on change accidentagentshbit = ' + JSON.stringify(event));
    const bit: Bit = <Bit> event;
    item[field] = bit.id;
    item['idbitclass'] = bit.idbitclass;
    item['kind']       = bit.kind;
    item['name']       = bit.name;
    console.log('enter on change accidentagentshbit item = ' + JSON.stringify(item));
  }

  displayName(item: any, args: string[]): string {
    let result = '';
    console.log('i--- = ' + JSON.stringify(item));
    if (!isNullOrUndefined(item)) {
      console.log('i 11111 ');
      result = item.id + ') ' + item.name;
      console.log('i 22222 ');
    /* for (const bit of this.bits) {
      if (bit.id === this.newT.idbit) {
        result = bit.name;
        this.newT.idbitclass = bit.idbitclass;
        this.newT.kind = bit.kind;
        break;
      } 
    }
    console.log('4');*/
  }
  return result;
}

createItem() {
  console.log('11111');
  const _accidentagentsh: Accidentagentsh = Object.assign({}, this.accidentagentsh);
  if ('_displayname' in _accidentagentsh.agent) {
   delete _accidentagentsh.agent['_displayname'];
  }
  this.newT.accidentagentsh = _accidentagentsh;
  this.newT.idgrid          = _accidentagentsh.idgrid;
  this.create();
}

}
