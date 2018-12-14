import { InputData } from './../../../table/table';
import { TypeObjectService } from 'shared/services/type-object.service';
import { NewData } from './../newData';
import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { TypeObject } from 'shared/table/table';


const _newTypeObject: TypeObject = {
  datecreate: new Date(),
  dateupdate: new Date(),
  id: 0,
  lastuser: 'ali',
  name: '',
  owner: 'ali'
};

@Component({
  selector: 'app-newtypeobject',
  templateUrl: './newtypeobject.component.html',
  styleUrls: ['./newtypeobject.component.css']
})
export class NewtypeobjectComponent  extends NewData<TypeObject> implements OnInit, OnChanges {
  @Input() dialogVisible: boolean;
  @Output() closeDialog = new EventEmitter<InputData<TypeObject>>();

  constructor(service: TypeObjectService) {
    super(service, _newTypeObject);
    this._closeDialog = this.closeDialog;
  }

  ngOnChanges() {
    this.onChange();
  }


  ngOnInit() {
  }

}
