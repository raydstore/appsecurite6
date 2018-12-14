import { InputData } from './../../../table/table';
import { NatureService } from 'shared/services/nature.service';
import { NewData } from './../newData';
import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Nature } from 'shared/table/table';


const _newNature: Nature = {
  datecreate: new Date(),
  dateupdate: new Date(),
  id: 0,
  lastuser: 'ali',
  name: '',
  owner: 'ali'
};

@Component({
  selector: 'app-newnature',
  templateUrl: './newnature.component.html',
  styleUrls: ['./newnature.component.css']
})
export class NewnatureComponent  extends NewData<Nature> implements OnInit, OnChanges {
  @Input() dialogVisible: boolean;
  @Output() closeDialog = new EventEmitter<InputData<Nature>>();

  constructor(service: NatureService) {
    super(service, _newNature);
    this._closeDialog = this.closeDialog;
  }

  ngOnChanges() {
    this.onChange();
  }


  ngOnInit() {
  }

}
