import { InputData } from './../../../table/table';
import { FormationService } from 'shared/services/formation.service';
import { NewData } from './../newData';
import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Formation } from 'shared/table/table';


const _newFormation: Formation = {
  datecreate: new Date(),
  dateupdate: new Date(),
  id: 0,
  idtypeformation: null,
  lastuser: 'ali',
  name: '',
  owner: 'ali'
};

@Component({
  selector: 'app-newformation',
  templateUrl: './newformation.component.html',
  styleUrls: ['./newformation.component.css']
})
export class NewformationComponent  extends NewData<Formation> implements OnInit, OnChanges {
  @Input() dialogVisible: boolean;
  @Output() closeDialog = new EventEmitter<InputData<Formation>>();

  constructor(service: FormationService) {
    super(service, _newFormation);
    this._closeDialog = this.closeDialog;
  }

  ngOnChanges() {
    this.onChange();
  }


  ngOnInit() {
  }

}
