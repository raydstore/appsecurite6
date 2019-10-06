import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { EntrepriseService } from 'shared/services/entreprise.service';
import { NotFoundError } from '../../../core/component/common/not-found-error';
import { BadInput } from '../../../core/component/common/bad-input';
import { AppError } from '../../../core/component/common/app-error';
import { LastidService } from 'shared/services/lastid.service';
import { AccidentagenteeService } from 'shared/services/accidentagentee.service';
import { TreeNode } from 'primeng/primeng';
import { Accidentagentee, AccidentagenteePK, Entreprise } from 'shared/table/table';
import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-accidentagentee',
  templateUrl: './accidentagentee.component.html',
  styleUrls: ['./accidentagentee.component.css']
})
export class AccidentagenteeComponent implements OnInit {
  @Input() iddamage: number;
  @Input() idgrid: number;
  @Input() titlelist: string;
  accidentagentees: any[];
  selectedAccidentagentee: Accidentagentee;
  selectedNode: TreeNode;
  accidentagenteePK: AccidentagenteePK;
  newAccidentagentee: Accidentagentee = {
    datecreate: new Date(),
    dateupdate: new Date(),
    dateofbirth: new Date(),
    accidentagenteePK: {iddamage : this.iddamage, id: 0},
    accidentdomain: 2,
    idgrid: this.idgrid,
    name: '',
    function: '',
    identreprise: null,
    lastuser: 'ali',
    samury: null,
    countstopwork: 0,
    typeaccident: 'L',
    owner: 'ali'
  };
  dialogVisible = false;
  newMode = false;

  entreprises: any[];
  entreprise: Entreprise;
  lastids: any[];
  lastid: any;

  @ViewChild('instance', { static: false }) instance: NgbTypeahead;
  focus$ = new Subject<String>();
  click$ = new Subject<String>();


  constructor(private service: AccidentagenteeService, private serviceEntreprise: EntrepriseService,
    private lastidService: LastidService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.getByQueryParam({ 'iddamage': this.iddamage, 'idgrid': this.idgrid })
      .subscribe(accidentagentees => {
        this.accidentagentees = accidentagentees;
      });

      this.serviceEntreprise.getAll()
        .subscribe(entreprises => {
          this.entreprises = entreprises;
        });
  }

  showcountstop(): boolean {
    let res = false;
    if (!(isNullOrUndefined(this.newAccidentagentee))) {
      res = !([1, 5, 9].includes(this.newAccidentagentee.idgrid));
    }
    return res;
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

  searchEntreprise = (text$: Observable<string>) =>
    text$
      .debounceTime(200).distinctUntilChanged()
      .merge(this.focus$)
      .merge(this.click$.filter(() => !this.instance.isPopupOpen()))
      .map(term => (term === '' ? this.entreprises : this.entreprises.filter(v => (v.name).toLowerCase()
        .indexOf(term.toLowerCase()) > -1)).slice(0, 10));

  formatter = (x: { name: string }) => x.name;

  nodeExpand(event) {
    this.selectedNode = event.node;
  }

  isSelected(event) {
    return this.selectedNode === event.node ? true : false;
  }


  createAccidentagentee() {
    this.dialogVisible = false;
    this.accidentagentees = [this.newAccidentagentee, ...this.accidentagentees];
    this.newAccidentagentee.identreprise = this.entreprise;
    this.service.create(this.newAccidentagentee)
      .subscribe(newAccidentagentee => {
        this.loadData();
      }, (error: AppError) => {
        this.accidentagentees.splice(0, 1);
        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
        }
      });
  }

  deleteAccidentagentee(_accidentagentee: Accidentagentee) {
    let index = this.accidentagentees.indexOf(_accidentagentee);
    console.log('av pk = ' + JSON.stringify(_accidentagentee));
    this.accidentagentees.splice(index, 1);
    this.accidentagentees = [...this.accidentagentees];
    console.log('ap pk = ' + JSON.stringify(_accidentagentee));
    this.service.delete(_accidentagentee.accidentagenteePK)
      .subscribe(
      () => { this.loadData(); },
      (error: Response) => {
        this.accidentagentees.splice(index, 0, _accidentagentee);

        if (error instanceof NotFoundError) {
          alert('this post has already been deleted');
        } else {
          throw error;
        }
      }
      );
  }

  updateAccidentagentee(_accidentagentee) {
    /* _accidentagentee.samury = inputSamury.value;  , inputSamury: HTMLInputElement*/
    this.service.update(_accidentagentee)
      .subscribe(updateaccidentagentee => {
        console.log('_accidentagentee = ' + JSON.stringify(_accidentagentee));
        this.loadData();
      });
  }

  cancelUpdate(_accidentagentee) {
    //
  }

  showNewDialoge() {
    this.dialogVisible = true;
    this.newMode = true;
    this.newAccidentagentee = {
      datecreate: new Date(),
      dateupdate: new Date(),
      dateofbirth: new Date(),
      accidentagenteePK: {iddamage: this.iddamage, id: 0} ,
      name: '',
      idgrid: this.idgrid,
      function: '',
      identreprise: null,
      lastuser: 'ali',
      countstopwork: 0,
      accidentdomain: 2,
      samury: null,
      typeaccident: 'L',
      owner: 'ali'
    };
  }

  hideNewDialoge() {
    this.dialogVisible = false;
  }

  showDialogToAdd() {
    this.newMode = true;
    this.dialogVisible = true;
  }

  save() {
    let accidentagentees = [...this.accidentagentees];
    if (this.newMode) {
      accidentagentees.push(this.newAccidentagentee);
    } else {
      accidentagentees[this.findSelectedAccidentagenteeIndex()] = this.newAccidentagentee;
    }
    this.accidentagentees = accidentagentees;
    this.newAccidentagentee = null;
    this.dialogVisible = false;
  }

  delete() {
    let index = this.findSelectedAccidentagenteeIndex();
    this.accidentagentees = this.accidentagentees.filter((val, i) => i !== index);
    this.newAccidentagentee = null;
    this.dialogVisible = false;
  }

  onRowSelect(event) {
  }

  cloneAccidentagentee(c: Accidentagentee): Accidentagentee {
    let accidentagentee: Accidentagentee;
    accidentagentee = c;
    return accidentagentee;
  }

  findSelectedAccidentagenteeIndex(): number {
    return this.accidentagentees.indexOf(this.selectedAccidentagentee);
  }
}



