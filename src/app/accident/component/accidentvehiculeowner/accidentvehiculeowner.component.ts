import { Mode, EventArgs } from './../../../shared/table/table';
import { TreeNode } from 'primeng/components/common/api';
import { LastidService } from 'shared/services/lastid.service';
import { NotFoundError } from '../../../core/component/common/not-found-error';
import { AppError } from '../../../core/component/common/app-error';
import { BadInput } from '../../../core/component/common/bad-input';
import { AccidentvehiculeownerService } from 'shared/services/accidentvehiculeowner.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { Accidentvehiculeowner } from 'shared/table/table';
import { PanelModule } from 'primeng/primeng';
import { Http, Response } from '@angular/http';
import { isUndefined, isNullOrUndefined } from 'util';

@Component({
  selector: 'app-accidentvehiculeowner',
  templateUrl: 'accidentvehiculeowner.component.html',
  styleUrls: ['./accidentvehiculeowner.component.css']
})
export class AccidentvehiculeownerComponent implements OnInit {
  selectedAccidentvehiculeowner: Accidentvehiculeowner;
  selectedNode: TreeNode;

  newAccidentvehiculeowner: Accidentvehiculeowner = {
    datecreate: new Date(),
    dateupdate: new Date(),
    idaccidentvehicule: 0,
    adress: '',
    phone: '',
    lastuser: 'ali',
    name: '',
    owner: 'ali'
  };
  dialogVisible = false;
  newMode = false;

  lastids: any[];
  lastid: any;
  titlelist = 'Chauffeur';

  @Input() accidentvehiculeowner: Accidentvehiculeowner;
  @Input() mode: Mode;
  @Output() operation = new EventEmitter();

  constructor(private service: AccidentvehiculeownerService, private lastidService: LastidService) {
  }

  ngOnInit() {
    this.selectedAccidentvehiculeowner = Object.assign({}, this.accidentvehiculeowner);
    // this.loadData();
  }

  loadData() {
/*     this.service.getItem(this.idaccidentvehicule)
        .subscribe(accidentvehiculeowner => {
          if (!isNullOrUndefined(accidentvehiculeowner)) {
            this.accidentvehiculeowner = accidentvehiculeowner;
          } else {
            this.accidentvehiculeowner = this.accidentvehiculeowner;
          }
        }); */
  }

  perform(event) {
    let eventargs: EventArgs;
    eventargs = this.mode === Mode.insert ? { item: this.accidentvehiculeowner, mode: Mode.insert, dialogVisible: false }
                                         : { item: this.accidentvehiculeowner, mode: Mode.update, dialogVisible: false };
    this.operation.emit(eventargs);
  }

  createAccidentvehiculeowner() {
    this.dialogVisible = false;
    this.accidentvehiculeowner = this.newAccidentvehiculeowner;


    this.service.create(this.newAccidentvehiculeowner)
      .subscribe(newAccidentvehiculeowner => {
        this.loadData();
      }, (error: AppError) => {
        this.accidentvehiculeowner = null;
        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
          throw error;
        }
      });
  }

  deleteAccidentvehiculeowner(_accidentvehiculeowner: Accidentvehiculeowner) {
    this.service.delete(_accidentvehiculeowner.idaccidentvehicule)
      .subscribe(
      () => { this.loadData(); } ,
      (error: Response) => {

        if (error instanceof NotFoundError) {
          alert('this post has already been deleted');
        } else {
          throw error;
        }
      }
      );
  }

  updateAccidentvehiculeowner() {
    this.service.updatebyid(this.accidentvehiculeowner, 'idaccidentvehicule')
      .subscribe(updateaccidentvehiculeowner => {
        this.loadData();
      });
  }

  cancelUpdate(_accidentvehiculeowner) {
    this.accidentvehiculeowner = Object.assign({}, this.selectedAccidentvehiculeowner);
  }

}