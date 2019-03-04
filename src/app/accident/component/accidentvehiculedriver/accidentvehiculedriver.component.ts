import { AccidentvehiculedrivernsService } from './../../../shared/services/accidentvehiculedriverns.service';
import { AccidentvehiculedrivershService } from './../../../shared/services/accidentvehiculedriversh.service';
import { Mode, EventArgs, Accidentvehiculedriversh, Accidentvehiculedriverns } from './../../../shared/table/table';
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


  statusdriver: any = {
    classification: '',
    record: null
  };

  modeChangeClassification = false;

  /* private _dateofbirth: Date; */
  // private _issuedon: any;

  /* @Input() idaccidentvehicule: number; */
  @Input() accidentvehiculedriver: Accidentvehiculedriver;
  @Input() mode: Mode;
  @Output() operation = new EventEmitter();



  constructor(private service: AccidentvehiculedriverService, private accidentvehiculedrivershService: AccidentvehiculedrivershService, 
              private accidentvehiculedrivernsService: AccidentvehiculedrivernsService) {
  }

  ngOnInit() {
    this.selectedAccidentvehiculedriver = Object.assign({}, this.accidentvehiculedriver);
    this.modeChangeClassification = false;
   // this.loadData();
  }

  loadData() {
    this.service.getItem(this.accidentvehiculedriver.idaccidentvehicule)
        .subscribe(accidentvehiculedriver => {
            this.accidentvehiculedriver = accidentvehiculedriver;
          });
  }

  isNullOrUndefinedProperty(property) {
     console.log('property = ' + property);
     const a = isNullOrUndefined(property);
     console.log('a = ' + a);
     return !a;
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
    /* let eventargs: EventArgs;
    eventargs = this.mode === Mode.insert ? { item: this.accidentvehiculedriver, mode: Mode.insert, dialogVisible: false }
                                          : { item: this.accidentvehiculedriver, mode: Mode.update, dialogVisible: false };
    this.operation.emit(eventargs); */
    console.log('this.accidentvehiculedriver = ' + JSON.stringify(this.accidentvehiculedriver));
    if (this.accidentvehiculedriver.membership === 'S') {
      this.updateAccidentvehiculedriversh(this.accidentvehiculedriver.accidentvehiculedriversh);
    } else if (this.accidentvehiculedriver.membership === 'N') {
      this.updateAccidentvehiculedriverns(this.accidentvehiculedriver.accidentvehiculedriverns);
    }
    this.updateAccidentvehiculedriver(this.accidentvehiculedriver);
  }

  setClassification() {
    this.modeChangeClassification = true;
    if (this.accidentvehiculedriver.membership === 'S') {
      this.accidentvehiculedriver.membership = 'N';
      delete this.accidentvehiculedriver.accidentvehiculedriversh;
      /* this.updateAccidentvehiculedriver(this.accidentvehiculedriver);
      this.accidentvehiculedrivernsService.getItem(this.accidentvehiculedriver.idaccidentvehicule)
         .subscribe(accidentvehiculedriversh => {
          this.accidentvehiculedriver.accidentvehiculedriversh = accidentvehiculedriversh;
         }); */
     // accidentvehiculedrivershService
    } else if (this.accidentvehiculedriver.membership === 'N') {
      this.accidentvehiculedriver.membership = 'S';
      delete this.accidentvehiculedriver.accidentvehiculedriverns;
      /* this.accidentvehiculedrivershService.getItem(this.accidentvehiculedriver.idaccidentvehicule)
         .subscribe(accidentvehiculedriversh => {
          this.accidentvehiculedriver.accidentvehiculedriversh = accidentvehiculedriversh;
         }); */
   // this.updateAccidentvehiculedriver(this.accidentvehiculedriver);

  }
  console.log('avd = ' + JSON.stringify(this.accidentvehiculedriver));
  this.updateAccidentvehiculedriver(this.accidentvehiculedriver);
  this.modeChangeClassification = false;
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
      .subscribe(accidentvehiculedriver => {
         //         this.loadData();
         this.loadData();
         console.log('u accidentvehiculedriver = ' + JSON.stringify(accidentvehiculedriver));
      },
      (error: Response) => {

        if (error instanceof NotFoundError) {
          alert('this post has already been deleted');
        } else {
          throw error;
        }
      });
  }

  updateAccidentvehiculedriversh(_accidentvehiculedriversh: Accidentvehiculedriversh) {
    this.accidentvehiculedrivershService.updatebyid(_accidentvehiculedriversh, 'idaccidentvehicule')
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
    }

    updateAccidentvehiculedriverns(_accidentvehiculedriverns: Accidentvehiculedriverns) {
      this.accidentvehiculedrivernsService.updatebyid(_accidentvehiculedriverns, 'idaccidentvehicule')
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
      }

  changeInfoDriver(event, record: any) {
     this.statusdriver.classification = event;
     this.statusdriver.record = record;
  }

  cancelUpdate(_accidentvehiculedriver) {
    this.accidentvehiculedriver = Object.assign({}, this.selectedAccidentvehiculedriver);
  }
}