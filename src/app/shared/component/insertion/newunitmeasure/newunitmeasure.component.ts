import { InputData } from './../../../table/table';
import { UnitMeasureService } from 'shared/services/unit-measure.service';
import { NewData } from './../newData';
import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { UnitMeasure } from 'shared/table/table';


const _newUnitMeasure: UnitMeasure = {
  datecreate: new Date(),
  dateupdate: new Date(),
  id: 0,
  lastuser: 'ali',
  name: '',
  owner: 'ali'
};

@Component({
  selector: 'app-newunitmeasure',
  templateUrl: './newunitmeasure.component.html',
  styleUrls: ['./newunitmeasure.component.css']
})
export class NewunitmeasureComponent  extends NewData<UnitMeasure> implements OnInit, OnChanges {
  @Input() dialogVisible: boolean;
  @Output() closeDialog = new EventEmitter<InputData<UnitMeasure>>();

  constructor(service: UnitMeasureService) {
    super(service, _newUnitMeasure);
    this._closeDialog = this.closeDialog;
  }

  ngOnChanges() {
    this.onChange();
  }


  ngOnInit() {
  }

}
