import { TreeNode } from 'primeng/components/common/api';
import { LastidService } from 'shared/services/lastid.service';
import { NotFoundError } from '../../../core/component/common/not-found-error';
import { AppError } from '../../../core/component/common/app-error';
import { BadInput } from '../../../core/component/common/bad-input';
import { AccidentvehiculedriverService } from 'shared/services/accidentvehiculedriver.service';
import { Component, OnInit, Input } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { Accidentvehiculedriver } from 'shared/table/table';
import { PanelModule } from 'primeng/primeng';
import { Http, Response } from '@angular/http';
import { isUndefined, isNullOrUndefined } from 'util';

@Component({
  selector: 'app-accidentvehiculedriver',
  templateUrl: 'accidentvehiculedriver.component.html',
  styleUrls: ['./accidentvehiculedriver.component.css']
})
export class AccidentvehiculedriverComponent implements OnInit {
  accidentvehiculedriver: Accidentvehiculedriver;
  selectedAccidentvehiculedriver: Accidentvehiculedriver;
  selectedNode: TreeNode;

  newAccidentvehiculedriver: Accidentvehiculedriver = {
    datecreate: new Date(),
    dateupdate: new Date(),
    idaccidentvehicule: 0,
    accidentvehicule: null,
    adress: '',
    membership: '',
    licensenumber: '',
    dateofbirth: new Date(),
    placeofbirth: '',
    issuedon: new Date(),
    issuedby: '',
    lastuser: 'ali',
    name: '',
    owner: 'ali'
  };
  dialogVisible = false;
  newMode = false;

  lastids: any[];
  lastid: any;
  titlelist = 'Chauffeur';

  /* private _dateofbirth: Date; */
  // private _issuedon: any;

  @Input() idaccidentvehicule: number;


  constructor(private service: AccidentvehiculedriverService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.getItem(this.idaccidentvehicule)
      .subscribe(accidentvehiculedriver => {
        if (isNullOrUndefined(accidentvehiculedriver)) {
          this.accidentvehiculedriver = this.newAccidentvehiculedriver;
          this.newMode = true;
        } else {
          this.accidentvehiculedriver = accidentvehiculedriver;
          this.newMode = false;
        }
      });
  }

  /* get dateofbirth(): Date {
    return new Date(this.accidentvehiculedriver.dateofbirth);
  }

  set dateofbirth(value: Date) {
    this.accidentvehiculedriver.dateofbirth = new Date(value);
  }

  get issuedon(): Date {
    return new Date(this.accidentvehiculedriver.issuedon);
  }

  set issuedon(value: Date) {
    this.accidentvehiculedriver.issuedon = new Date(value);
  } */

  perform() {
    this.updateAccidentvehiculedriver();
    /* if (this.newMode) {
      this.createAccidentvehiculedriver();
    } else {
      console.log(JSON.stringify(this.accidentvehiculedriver));
      this.updateAccidentvehiculedriver();
    } */
  }

  onChangeDate(item: Accidentvehiculedriver, event) {
    item.dateofbirth = event;
  }


  onChangeIssuedon(item: Accidentvehiculedriver, event) {
    item.issuedon = event;
  }

  createAccidentvehiculedriver() {
    this.dialogVisible = false;
    this.accidentvehiculedriver = this.newAccidentvehiculedriver;


    this.service.create(this.newAccidentvehiculedriver)
      .subscribe(newAccidentvehiculedriver => {
        this.loadData();
      }, (error: AppError) => {
        this.accidentvehiculedriver = null;
        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
          throw error;
        }
      });
  }

  deleteAccidentvehiculedriver(_accidentvehiculedriver: Accidentvehiculedriver) {
    this.service.delete(_accidentvehiculedriver.idaccidentvehicule)
      .subscribe(
        () => { this.loadData(); },
        (error: Response) => {

          if (error instanceof NotFoundError) {
            alert('this post has already been deleted');
          } else {
            throw error;
          }
        }
      );
  }

  updateAccidentvehiculedriver() {
    this.service.update(this.accidentvehiculedriver)
      .subscribe(updateaccidentvehiculedriver => {
        this.loadData();
      });
  }

  cancelUpdate(_accidentvehiculedriver) {
    //
  }
}