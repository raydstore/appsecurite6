import { InputData } from './../../../table/table';
import { ActivityService } from 'shared/services/activity.service';
import { NewData } from './../newData';
import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Activity } from 'shared/table/table';


const _newActivity: Activity = {
  datecreate: new Date(),
  dateupdate: new Date(),
  id: 0,
  lastuser: 'ali',
  name: '',
  owner: 'ali'
};

@Component({
  selector: 'app-newactivity',
  templateUrl: './newactivity.component.html',
  styleUrls: ['./newactivity.component.css']
})
export class NewactivityComponent  extends NewData<Activity> implements OnInit, OnChanges {
  @Input() dialogVisible: boolean;
  @Output() closeDialog = new EventEmitter<InputData<Activity>>();

  constructor(service: ActivityService) {
    super(service, _newActivity);
    this._closeDialog = this.closeDialog;
  }

  ngOnChanges() {
    this.onChange();
  }


  ngOnInit() {
  }

}
