import { InputData } from './../../../table/table';
import { StructureService } from 'shared/services/structure.service';
import { NewData } from './../newData';
import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Structure } from 'shared/table/table';


const _newStructure: Structure = {
  datecreate: new Date(),
  dateupdate: new Date(),
  id: 0,
  lastuser: 'ali',
  name: '',
  owner: 'ali'
};

@Component({
  selector: 'app-newstructure',
  templateUrl: './newstructure.component.html',
  styleUrls: ['./newstructure.component.css']
})
export class NewstructureComponent  extends NewData<Structure> implements OnInit, OnChanges {
  @Input() dialogVisible: boolean;
  @Output() closeDialog = new EventEmitter<InputData<Structure>>();

  constructor(service: StructureService) {
    super(service, _newStructure);
    this._closeDialog = this.closeDialog;
  }

  ngOnChanges() {
    this.onChange();
  }


  ngOnInit() {
  }

}
