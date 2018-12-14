import { InputData } from './../../../table/table';
import { TypeFormationService } from 'shared/services/type-formation.service';
import { NewData } from './../newData';
import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { TypeFormation } from 'shared/table/table';


const _newTypeFormation: TypeFormation = {
  datecreate: new Date(),
  dateupdate: new Date(),
  id: 0,
  lastuser: 'ali',
  name: '',
  owner: 'ali'
};

@Component({
  selector: 'app-newtypeformation',
  templateUrl: './newtypeformation.component.html',
  styleUrls: ['./newtypeformation.component.css']
})
export class NewtypeformationComponent  extends NewData<TypeFormation> implements OnInit, OnChanges {
  @Input() dialogVisible: boolean;
  @Output() closeDialog = new EventEmitter<InputData<TypeFormation>>();

  constructor(service: TypeFormationService) {
    super(service, _newTypeFormation);
    this._closeDialog = this.closeDialog;
  }

  ngOnChanges() {
    this.onChange();
  }


  ngOnInit() {
  }

}
