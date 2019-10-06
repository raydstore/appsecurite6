import { AccidentvehiculeownerService } from './../../../shared/services/accidentvehiculeowner.service';
import { AccidentvehiculeinsuranceService } from './../../../shared/services/accidentvehiculeinsurance.service';
import { AccidentvehiculedriverService } from './../../../shared/services/accidentvehiculedriver.service';
import { Mode } from './../../../shared/table/table';
import { MarkService } from 'shared/services/mark.service';
import { EntrepriseService } from 'shared/services/entreprise.service';
import { Observable } from 'rxjs/Observable';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import { NotFoundError } from '../../../core/component/common/not-found-error';
import { BadInput } from '../../../core/component/common/bad-input';
import { AppError } from '../../../core/component/common/app-error';
import { LastidService } from 'shared/services/lastid.service';
import { AccidentvehiculeService } from 'shared/services/accidentvehicule.service';
import { TreeNode } from 'primeng/primeng';
import { Accidentvehicule, Accidentvehiculeinsurance, Accidentvehiculedriver, Accidentvehiculeowner, EventArgs } from 'shared/table/table';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { RadioButtonModule } from 'primeng/radiobutton';
import { isUndefined, isNullOrUndefined } from 'util';

@Component({
  selector: 'app-accidentvehicule',
  templateUrl: './accidentvehicule.component.html',
  styleUrls: ['./accidentvehicule.component.css']
})
export class AccidentvehiculeComponent implements OnInit {
  @Input() iddamage: number;
  @Input() idgrid: number;
  @Input() accidentdomain: number;
  @Input() classification: number;
  @Input() titlelist: string;
  /* @Input() accidentdomain: number; */
  accidentvehicules: Accidentvehicule[];
  selectedAccidentvehicule: Accidentvehicule;
  selectedNode: TreeNode;
  // accidentvehicule: any;
  newAccidentvehicule: Accidentvehicule = {
    id: 0,
    name: '',
    datecreate: new Date(),
    dateupdate: new Date(),
    iddamage: this.iddamage,
    idgrid: this.idgrid,
    accidentdomain: 6,
    matricule: '',
    lastuser: 'ali',
    kind: '',
    classification: '',
    idmark: null,
    source: '',
    destination: '',
    owner: 'ali'
  };
  dialogVisible = false;
  newMode = false;

  lastids: any[];
  lastid: any;

  marks: any[];
  entreprises: any[];
  // titlelist = 'Marque';
  newAccidentvehiculedriver: Accidentvehiculedriver = {
    datecreate: new Date(),
    dateupdate: new Date(),
    idaccidentvehicule: 0,
    adress: '',
    membership: 'S',
    licensenumber: '',
    dateofbirth: new Date(),
    placeofbirth: '',
    issuedon: new Date(),
    issuedby: '',
    lastuser: 'ali',
    name: '',
    owner: 'ali'
  };
  newAccidentvehiculeinsurance: Accidentvehiculeinsurance = {
    datecreate: new Date(),
    dateupdate: new Date(),
    idaccidentvehicule: 0,
    identreprise: null,
    policynumber: '',
    datefirst: new Date(),
    datelast: new Date(),
    lastuser: 'ali',
    owner: 'ali'
    };
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

  modedriver: Mode = Mode.update;
  modeinsurance: Mode = Mode.update;
  modeowner: Mode = Mode.update;

  @ViewChild('instance', { static: false }) instance: NgbTypeahead;
  focus$ = new Subject<String>();
  click$ = new Subject<String>();

  constructor(private service: AccidentvehiculeService, private lastidService: LastidService,
    private markService: MarkService, private entrepriseService: EntrepriseService,
    private accidentvehiculedriverservice: AccidentvehiculedriverService,
    private accidentvehiculeinsuranceservice: AccidentvehiculeinsuranceService,
    private accidentvehiculeownerservice: AccidentvehiculeownerService) {
  }

  ngOnInit() {
    this.loadData();
    // this.loadLastId();
  }

  initAccidentvehiculeinsurance()  {
    let a = {
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
    this.newAccidentvehiculeinsurance = <Accidentvehiculeinsurance> a;
  }

  loadData() {
    this.service.getByQueryParam({ 'iddamage': this.iddamage, 'idgrid': this.idgrid, 'accidentdomain': 6 })
      .subscribe(accidentvehicules => {
        this.accidentvehicules = accidentvehicules;
      });
    this.markService.getAll()
      .subscribe(marks => {
        this.marks = marks;
      });
    this.entrepriseService.getAll()
      .subscribe(entreprises => {
        this.entreprises = entreprises;
      });
  }

  searchMark = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => (term === '' ? this.marks : this.marks.filter(v => v.name.toLowerCase()
        .indexOf(term.toLowerCase()) > -1)).slice(0, 10));

  searchEntreprise = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => (term === '' ? this.entreprises : this.entreprises.filter(v => v.name.toLowerCase()
        .indexOf(term.toLowerCase()) > -1)).slice(0, 10));

  formatter = (x: { name: string }) => x.name;

  getName(item): string {
    if (!isNullOrUndefined(item)) {
      return item.name;
    }
  }

  performAccidentvehiculedriver(eventArgs: EventArgs) {
    const _accidentvehiculedriver: Accidentvehiculedriver = <Accidentvehiculedriver>eventArgs.item;
    switch (eventArgs.mode.valueOf()) {
      case Mode.insert.valueOf(): {

                           this.dialogVisible = eventArgs.dialogVisible;
                           this.createAccidentvehiculedriver(_accidentvehiculedriver);
                           break;
                         }
      case Mode.update.valueOf(): {
                           this.updateAccidentvehiculedriver(_accidentvehiculedriver);
                           break;
                         }
    }
  }

  performAcccidentvehiculeinsurance(eventArgs: EventArgs) {
    const _accidentvehiculeinsurance: Accidentvehiculeinsurance = <Accidentvehiculeinsurance> eventArgs.item;
    switch (eventArgs.mode.valueOf()) {
      case Mode.insert.valueOf(): {

                           this.dialogVisible = eventArgs.dialogVisible;
                           this.createAccidentvehiculeinsurance(_accidentvehiculeinsurance);
                           break;
                         }
      case Mode.update.valueOf(): {
                           this.updateAccidentvehiculeinsurance(_accidentvehiculeinsurance);
                           break;
                         }
    }
  }

  performAcccidentvehiculeowner(eventArgs: EventArgs) {
    const _accidentvehiculeowner: Accidentvehiculeowner = <Accidentvehiculeowner> eventArgs.item;
    switch (eventArgs.mode.valueOf()) {
      case Mode.insert.valueOf(): {

                           this.dialogVisible = eventArgs.dialogVisible;
                           this.createAccidentvehiculeowner(_accidentvehiculeowner);
                           break;
                         }
      case Mode.update.valueOf(): {
                           this.updateAccidentvehiculeowner(_accidentvehiculeowner);
                           break;
                         }
    }
  }

  createAccidentvehiculedriver(accidentvehiculedriver: Accidentvehiculedriver) {
    this.accidentvehiculedriverservice.create(accidentvehiculedriver)
      .subscribe(() => {
/*         this.loadData();
 */      }, (error: AppError) => {
        //
        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
          throw error;
        }
      });
  }

  updateAccidentvehiculedriver(_accidentvehiculedriver: Accidentvehiculedriver) {
    this.accidentvehiculedriverservice.updatebyid(_accidentvehiculedriver, 'idaccidentvehicule')
      .subscribe(() => {
        // this.loadData();
      });
  }

  createAccidentvehiculeinsurance(accidentvehiculeinsurance: Accidentvehiculeinsurance) {
    this.accidentvehiculeinsuranceservice.create(accidentvehiculeinsurance)
      .subscribe(() => {
/*         this.loadData();
 */      }, (error: AppError) => {
        //
        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
          throw error;
        }
      });
  }

  updateAccidentvehiculeinsurance(_accidentvehiculeinsurance: Accidentvehiculeinsurance) {
    this.accidentvehiculeinsuranceservice.updatebyid(_accidentvehiculeinsurance, 'idaccidentvehicule')
      .subscribe(() => {
        // this.loadData();
      });
  }

  createAccidentvehiculeowner(accidentvehiculeowner: Accidentvehiculeowner) {
    this.accidentvehiculeownerservice.create(accidentvehiculeowner)
      .subscribe(() => {
/*         this.loadData();
 */      }, (error: AppError) => {
        //
        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
          throw error;
        }
      });
  }

  updateAccidentvehiculeowner(_accidentvehiculeowner: Accidentvehiculeowner) {
    this.accidentvehiculeownerservice.updatebyid(_accidentvehiculeowner, 'idaccidentvehicule')
      .subscribe(() => {
        // this.loadData();
      });
  }


  loadLastId() {
    this.lastidService.getAll()
      .subscribe(lastids => this.lastids = lastids);
  }

  getLastid(name) {
    let lts: any[];
    this.loadLastId();
    for (let lid of this.lastids) {
      if (lid.id === name) {
        return lid['count'];
      }
    }
    return 0;
  }

  nodeExpand(event) {
    this.selectedNode = event.node;
  }

  isSelected(event) {
    return this.selectedNode === event.node ? true : false;
  }


  createAccidentvehicule() {
    this.dialogVisible = false;
    this.accidentvehicules = [this.newAccidentvehicule, ...this.accidentvehicules];

    this.service.create(this.newAccidentvehicule)
      .subscribe(newAccidentvehicule => {
        this.loadData();
      }, (error: AppError) => {
        this.accidentvehicules.splice(0, 1);
        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
        }
      });
  }

  deleteAccidentvehicule(_accidentvehicule: Accidentvehicule) {
    let index = this.accidentvehicules.indexOf(_accidentvehicule);
    this.accidentvehicules.splice(index, 1);
    this.accidentvehicules = [...this.accidentvehicules];
    this.service.delete(_accidentvehicule.id)
      .subscribe(
        () => { this.loadData(); },
        (error: Response) => {
          this.accidentvehicules.splice(index, 0, _accidentvehicule);

          if (error instanceof NotFoundError) {
            alert('this post has already been deleted');
          } else {
            throw error;
          }
        }
      );
  }

  updateAccidentvehicule(_accidentvehicule: Accidentvehicule) {
    // _accidentvehicule.samury = inputSamury.value;
    this.service.update(_accidentvehicule)
      .subscribe(() => {
        // this.loadData();
      });
  }

  cancelUpdate(_accidentvehicule) {
    //
  }

  showNewDialoge() {
    this.dialogVisible = true;
    this.newMode = true;
    this.newAccidentvehicule = {
      id: 0,
      name: '',
      datecreate: new Date(),
      dateupdate: new Date(),
      iddamage: this.iddamage,
      idgrid: this.idgrid,
      accidentdomain: 6,
      matricule: '',
      lastuser: 'ali',
      kind: 'UT',
      classification: 'S',
      idmark: null,
      source: '',
      destination: '',
      owner: 'ali'
    };
  }

  hideNewDialoge() {
    this.dialogVisible = false;
  }

  showDialogToAdd() {
    this.newMode = true;
    // this.accidentvehicule = new PrimeCar();
    this.dialogVisible = true;
  }

  save() {
    let accidentvehicules = [...this.accidentvehicules];
    if (this.newMode) {
      accidentvehicules.push(this.newAccidentvehicule);
    } else {
      accidentvehicules[this.findSelectedAccidentvehiculeIndex()] = this.newAccidentvehicule;
    }
    this.accidentvehicules = accidentvehicules;
    this.newAccidentvehicule = null;
    this.dialogVisible = false;
  }

  delete() {
    let index = this.findSelectedAccidentvehiculeIndex();
    this.accidentvehicules = this.accidentvehicules.filter((val, i) => i !== index);
    this.newAccidentvehicule = null;
    this.dialogVisible = false;
  }

  onRowSelect(event) {
    /* this.newMode = false;
    this.newAccidentvehicule = this.cloneAccidentvehicule(event.data);
    this.dialogVisible = true; */
  }

  cloneAccidentvehicule(c: Accidentvehicule): Accidentvehicule {
    let accidentvehicule: Accidentvehicule; // = new Prime();
    /* for (let prop of c) {
      accidentvehicule[prop] = c[prop];
    } */
    accidentvehicule = c;
    return accidentvehicule;
  }

  findSelectedAccidentvehiculeIndex(): number {
    return this.accidentvehicules.indexOf(this.selectedAccidentvehicule);
  }

  getClassification(value) {
    // display name for classification vehicule (sh or non sh)
    if (!isNullOrUndefined(value)) {
      return value === 'S' ? 'Vehicule SH' : 'Vehicule non SH';
    }
  }

  getAccidentvehiculedriver(accidentvehicule: Accidentvehicule): Accidentvehiculedriver {
    if (!isNullOrUndefined(accidentvehicule.accidentvehiculedriver)) {
      this.modedriver = Mode.update;
      return accidentvehicule.accidentvehiculedriver;
    } else {
      this.modedriver = Mode.insert;
      this.newAccidentvehiculedriver.idaccidentvehicule = accidentvehicule.id;
      return this.newAccidentvehiculedriver;
    }
  }

  getAccidentvehiculeinsurance(accidentvehicule: Accidentvehicule): Accidentvehiculeinsurance {
    if (!isNullOrUndefined(accidentvehicule.accidentvehiculeinsurance)) {
      this.modeinsurance = Mode.update;
      return accidentvehicule.accidentvehiculeinsurance;
    } else {
      this.modeinsurance = Mode.insert;
      this.newAccidentvehiculeinsurance.idaccidentvehicule = accidentvehicule.id;
      return this.newAccidentvehiculeinsurance;
    }
  }

  getAccidentvehiculeowner(accidentvehicule: Accidentvehicule): Accidentvehiculeowner {
    if (!isNullOrUndefined(accidentvehicule.accidentvehiculeowner)) {
      this.modeowner = Mode.update;
      return accidentvehicule.accidentvehiculeowner;
    } else {
      this.modeowner = Mode.insert;
      this.newAccidentvehiculeowner.idaccidentvehicule = accidentvehicule.id;
      return this.newAccidentvehiculeowner;
    }
  }
}



