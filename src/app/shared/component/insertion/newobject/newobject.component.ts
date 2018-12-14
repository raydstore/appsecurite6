import { InputData } from './../../../table/table';
import { ObjectService } from 'shared/services/object.service';
import { NewData } from './../newData';
import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Object } from 'shared/table/table';


const _newObject: Object = {
  datecreate: new Date(),
  dateupdate: new Date(),
  id: 0,
  lastuser: 'ali',
  name: '',
  owner: 'ali'
};

@Component({
  selector: 'app-newobject',
  templateUrl: './newobject.component.html',
  styleUrls: ['./newobject.component.css']
})
export class NewobjectComponent  extends NewData<Object> implements OnInit, OnChanges {
  @Input() dialogVisible: boolean;
  @Output() closeDialog = new EventEmitter<InputData<Object>>();

  constructor(service: ObjectService) {
    super(service, _newObject);
    this._closeDialog = this.closeDialog;
  }

  ngOnChanges() {
    this.onChange();
  }


  ngOnInit() {
  }

}
