import { TreeNode } from 'primeng/components/common/api';
import { LastidService } from 'shared/services/lastid.service';
import { NotFoundError } from '../../../core/component/common/not-found-error';
import { AppError } from '../../../core/component/common/app-error';
import { BadInput } from '../../../core/component/common/bad-input';
import { AccidentvehiculeinsuranceService } from 'shared/services/accidentvehiculeinsurance.service';
import { Component, OnInit, Input } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { Accidentvehiculeinsurance } from 'shared/table/table';
import { PanelModule } from 'primeng/primeng';
import { Http, Response } from '@angular/http';
import { isUndefined, isNullOrUndefined } from 'util';

@Component({
  selector: 'app-accidentvehiculeinsurance',
  templateUrl: 'accidentvehiculeinsurance.component.html',
  styleUrls: ['./accidentvehiculeinsurance.component.css']
})
export class AccidentvehiculeinsuranceComponent implements OnInit {
  accidentvehiculeinsurance: Accidentvehiculeinsurance;
  selectedAccidentvehiculeinsurance: Accidentvehiculeinsurance;
  selectedNode: TreeNode;

  newAccidentvehiculeinsurance: Accidentvehiculeinsurance = {
    datecreate: new Date(),
    dateupdate: new Date(),
    idaccidentvehicule: 0,
    accidentvehicule: null,
    identreprise: null,
    policynumber: '',
    datefirst: new Date(),
    datelast: new Date(),
    lastuser: 'ali',
    owner: 'ali'
  };
  dialogVisible = false;
  newMode = false;

  @Input() idaccidentvehicule: number;

  constructor(private service: AccidentvehiculeinsuranceService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.getItem(this.idaccidentvehicule)
      .subscribe(accidentvehiculeinsurance => {
        if (isNullOrUndefined(accidentvehiculeinsurance)) {
          this.accidentvehiculeinsurance = this.newAccidentvehiculeinsurance;
          this.newMode = true;
        } else {
          this.accidentvehiculeinsurance = accidentvehiculeinsurance;
          this.newMode = false;
        }
      });
  }

  perform () {
     if (this.newMode) {
       this.createAccidentvehiculeinsurance();
     } else {
      console.log(JSON.stringify(this.accidentvehiculeinsurance));
       this.updateAccidentvehiculeinsurance();
     }
  }

  createAccidentvehiculeinsurance() {
    this.dialogVisible = false;
    this.accidentvehiculeinsurance = this.newAccidentvehiculeinsurance;


    this.service.create(this.newAccidentvehiculeinsurance)
      .subscribe(newAccidentvehiculeinsurance => {
        this.loadData();
      }, (error: AppError) => {
        this.accidentvehiculeinsurance = null;
        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
          throw error;
        }
      });
  }

  deleteAccidentvehiculeinsurance(_accidentvehiculeinsurance: Accidentvehiculeinsurance) {
    this.service.delete(_accidentvehiculeinsurance.idaccidentvehicule)
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

  updateAccidentvehiculeinsurance() {
    this.service.update(this.accidentvehiculeinsurance)
      .subscribe(updateaccidentvehiculeinsurance => {
        this.loadData();
      });
  }

  cancelUpdate(_accidentvehiculeinsurance) {
    //
  }

}