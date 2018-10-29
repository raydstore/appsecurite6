import { Mode, EventArgs } from './../../../shared/table/table';
import { TreeNode } from 'primeng/components/common/api';
import { LastidService } from 'shared/services/lastid.service';
import { NotFoundError } from '../../../core/component/common/not-found-error';
import { AppError } from '../../../core/component/common/app-error';
import { BadInput } from '../../../core/component/common/bad-input';
import { AccidentvehiculedriverService } from 'shared/services/accidentvehiculedriver.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  /* accidentvehiculedriver: Accidentvehiculedriver; */
  selectedAccidentvehiculedriver: Accidentvehiculedriver;
  selectedNode: TreeNode;

  newAccidentvehiculedriver: Accidentvehiculedriver = {
    datecreate: new Date(),
    dateupdate: new Date(),
    idaccidentvehicule: 0,
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

  /* @Input() idaccidentvehicule: number; */
  @Input() accidentvehiculedriver: Accidentvehiculedriver;
  @Input() mode: Mode;
  @Output() operation = new EventEmitter();


  constructor(private service: AccidentvehiculedriverService) {
  }

  ngOnInit() {
    this.selectedAccidentvehiculedriver = Object.assign({}, this.accidentvehiculedriver);
   // this.loadData();
  }

  loadData() {
    /* this.service.getItem(this.idaccidentvehicule)
        .subscribe(accidentvehiculedriver => {
          if (!isNullOrUndefined(accidentvehiculedriver)) {
            this.accidentvehiculedriver = accidentvehiculedriver;
          } else {
            this.accidentvehiculedriver = this.accidentvehiculedriver;
          }
        }); */
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

  perform(event) {
    let eventargs: EventArgs;
    eventargs = this.mode === Mode.insert ? { item: this.accidentvehiculedriver, mode: Mode.insert, dialogVisible: false }
                                          : { item: this.accidentvehiculedriver, mode: Mode.update, dialogVisible: false };
    this.operation.emit(eventargs);
  }

/*   perform(_accidentvehiculedriver: Accidentvehiculedriver) {
    this.updateAccidentvehiculedriver(_accidentvehiculedriver);
  }
 */
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

  updateAccidentvehiculedriver(_accidentvehiculedriver: Accidentvehiculedriver) {
    this.service.updatebyid(this.accidentvehiculedriver, 'idaccidentvehicule')
      .subscribe(() => {
//         this.loadData();
      },
      (error: Response) => {

        if (error instanceof NotFoundError) {
          alert('this post has already been deleted');
        } else {
          throw error;
        }
      });
    /* console.log(JSON.stringify(_accidentvehiculedriver));
    this.service.updatebyid(_accidentvehiculedriver, 'idaccidentvehicule')
      .subscribe(updateaccidentvehiculedriver => {
        // this.loadData();
      }); */
  }

  cancelUpdate(_accidentvehiculedriver) {
    this.accidentvehiculedriver = Object.assign({}, this.selectedAccidentvehiculedriver);
  }
}