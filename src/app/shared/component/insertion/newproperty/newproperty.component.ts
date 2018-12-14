import { InputData } from './../../../table/table';
import { PropertyService } from 'shared/services/property.service';
import { NewData } from './../newData';
import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Property } from 'shared/table/table';


const _newProperty: Property = {
  datecreate: new Date(),
  dateupdate: new Date(),
  propertyPK: null,
  idunitmeasure: null,
  object1: null,
  type: '',
  lastuser: 'ali',
  name: '',
  owner: 'ali'
};

@Component({
  selector: 'app-newproperty',
  templateUrl: './newproperty.component.html',
  styleUrls: ['./newproperty.component.css']
})
export class NewpropertyComponent  extends NewData<Property> implements OnInit, OnChanges {
  @Input() dialogVisible: boolean;
  @Output() closeDialog = new EventEmitter<InputData<Property>>();

  constructor(service: PropertyService) {
    super(service, _newProperty);
    this._closeDialog = this.closeDialog;
  }

  ngOnChanges() {
    this.onChange();
  }


  ngOnInit() {
  }

}
