import { InputData } from './../../../table/table';
import { TypeOperationService } from 'shared/services/type-operation.service';
import { NewData } from './../newData';
import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { TypeOperation } from 'shared/table/table';


const _newTypeOperation: TypeOperation = {
  datecreate: new Date(),
  dateupdate: new Date(),
  id: 0,
  lastuser: 'ali',
  name: '',
  owner: 'ali'
};

@Component({
  selector: 'app-newtypeoperation',
  templateUrl: './newtypeoperation.component.html',
  styleUrls: ['./newtypeoperation.component.css']
})
export class NewtypeoperationComponent  extends NewData<TypeOperation> implements OnInit, OnChanges {
  @Input() dialogVisible: boolean;
  @Output() closeDialog = new EventEmitter<InputData<TypeOperation>>();

  constructor(service: TypeOperationService) {
    super(service, _newTypeOperation);
    this._closeDialog = this.closeDialog;
  }

  ngOnChanges() {
    this.onChange();
  }


  ngOnInit() {
  }

}
