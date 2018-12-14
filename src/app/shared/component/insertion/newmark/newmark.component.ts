import { InputData } from './../../../table/table';
import { MarkService } from 'shared/services/mark.service';
import { NewData } from './../newData';
import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Mark } from 'shared/table/table';


const _newMark: Mark = {
  datecreate: new Date(),
  dateupdate: new Date(),
  id: 0,
  lastuser: 'ali',
  name: '',
  owner: 'ali'
};

@Component({
  selector: 'app-newmark',
  templateUrl: './newmark.component.html',
  styleUrls: ['./newmark.component.css']
})

export class NewmarkComponent extends NewData<Mark> implements OnInit, OnChanges {
  @Input() dialogVisible: boolean;
  @Output() closeDialog = new EventEmitter<InputData<Mark>>();

  constructor(service: MarkService) {
    super(service, _newMark);
    this._closeDialog = this.closeDialog;
  }

  ngOnChanges() {
    this.onChange();
  }

  ngOnInit() {
  }

}
