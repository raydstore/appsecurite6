import { InputData } from './../../../table/table';
import { OperationService } from 'shared/services/operation.service';
import { NewData } from './../newData';
import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Operation } from 'shared/table/table';


const _newOperation: Operation = {
  datecreate: new Date(),
  dateupdate: new Date(),
  id: 0,
  idTypeOperation: null,
  lastuser: 'ali',
  name: '',
  owner: 'ali'
};

@Component({
  selector: 'app-newoperation',
  templateUrl: './newoperation.component.html',
  styleUrls: ['./newoperation.component.css']
})
export class NewoperationComponent  extends NewData<Operation> implements OnInit, OnChanges {
  @Input() dialogVisible: boolean;
  @Output() closeDialog = new EventEmitter<InputData<Operation>>();

  constructor(service: OperationService) {
    super(service, _newOperation);
    this._closeDialog = this.closeDialog;
  }

  ngOnChanges() {
    this.onChange();
  }


  ngOnInit() {
  }

}
