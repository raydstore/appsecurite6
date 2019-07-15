import { NewData } from './../newData';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Typeaccident, InputData } from 'shared/table/table';
import { TypeaccidentService } from 'shared/services/typeaccident.service';


const _newTypeaccident: Typeaccident = {
  datecreate: new Date(),
  dateupdate: new Date(),
  id: 0,
  lastuser: 'ali',
  name: '',
  owner: 'ali'
};

@Component({
  selector: 'app-newtypeaccident',
  templateUrl: './newtypeaccident.component.html',
  styleUrls: ['./newtypeaccident.component.css']
})
export class NewtypeaccidentComponent   extends NewData<Typeaccident> implements OnInit, OnChanges {
  @Input() dialogVisible: boolean;
  @Output() closeDialog = new EventEmitter<InputData<Typeaccident>>();

  constructor(service: TypeaccidentService) {
    super(service, _newTypeaccident);
    this._closeDialog = this.closeDialog;
  }

  ngOnChanges() {
    this.onChange();
  }


  ngOnInit() {
  }

}
