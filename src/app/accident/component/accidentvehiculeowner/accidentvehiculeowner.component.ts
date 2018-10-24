import { TreeNode } from 'primeng/components/common/api';
import { LastidService } from 'shared/services/lastid.service';
import { NotFoundError } from '../../../core/component/common/not-found-error';
import { AppError } from '../../../core/component/common/app-error';
import { BadInput } from '../../../core/component/common/bad-input';
import { AccidentvehiculeownerService } from 'shared/services/accidentvehiculeowner.service';
import { Component, OnInit, Input } from '@angular/core';
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
  accidentvehiculeowner: Accidentvehiculeowner;
  selectedAccidentvehiculeowner: Accidentvehiculeowner;
  selectedNode: TreeNode;

  newAccidentvehiculeowner: Accidentvehiculeowner = {
    datecreate: new Date(),
    dateupdate: new Date(),
    idaccidentvehicule: 0,
    accidentvehicule: null,
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
  @Input() idaccidentvehicule: number;

  constructor(private service: AccidentvehiculeownerService, private lastidService: LastidService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.getItem(this.idaccidentvehicule)
      .subscribe(accidentvehiculeowner => {
        if (isNullOrUndefined(accidentvehiculeowner)) {
          this.accidentvehiculeowner = this.newAccidentvehiculeowner;
          this.newMode = true;
        } else {
          this.accidentvehiculeowner = accidentvehiculeowner;
          this.newMode = false;
        }
      });
  }

  perform () {
    if (this.newMode) {
      this.createAccidentvehiculeowner();
    } else {
      console.log(JSON.stringify(this.accidentvehiculeowner));
      this.updateAccidentvehiculeowner();
    }
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
    this.service.update(this.accidentvehiculeowner)
      .subscribe(updateaccidentvehiculeowner => {
        this.loadData();
      });
  }

  cancelUpdate(_accidentvehiculeowner) {
    //
  }

}