import { BadInput } from './../../../../core/component/common/bad-input';
import { AppError } from './../../../../core/component/common/app-error';
import { Label } from 'shared/table/table';
import { LabelService } from 'shared/services/label.service';
import { Component, OnInit, OnChanges, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-newlabel',
  templateUrl: './newlabel.component.html',
  styleUrls: ['./newlabel.component.css']
})
export class NewlabelComponent implements OnInit , OnChanges {

  @Input() dialogVisible: boolean;
  @Output() closeDialog = new EventEmitter();

  labels: Label[];
  _newLabel: Label = {
    datecreate: new Date(),
        dateupdate: new Date(),
        id: 0,
        lastuser: 'ali',
        name: '',
        owner: 'ali'
  };
  newLabel: Label;

  constructor(private service: LabelService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.newLabel = Object.assign({}, this._newLabel);
  }

  create() {
    const nlabel = Object.assign({}, this.newLabel);
    this.newLabel = Object.assign({}, this._newLabel);
    this.service.create(nlabel)
      .subscribe( () => {
        this.closeDialog.emit({newLabel: nlabel, cancelDialog: false});
      }, (error: AppError) => {
        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
          throw error;
        }
      });
  }

  hideNewDialoge() {
    this.closeDialog.emit({newLabel: null, cancelDialog: true});
  }

  /* when dialog is close with X button */
  onHide() {
    this.closeDialog.emit({newLabel: null, cancelDialog: true});
  }

}
