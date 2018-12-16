import { Mode, EventArgs } from './../../../shared/table/table';
import { EntrepriseService } from 'shared/services/entreprise.service';
import { TreeNode } from 'primeng/components/common/api';
import { LastidService } from 'shared/services/lastid.service';
import { NotFoundError } from '../../../core/component/common/not-found-error';
import { AppError } from '../../../core/component/common/app-error';
import { BadInput } from '../../../core/component/common/bad-input';
import { AccidentvehiculeinsuranceService } from 'shared/services/accidentvehiculeinsurance.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { Accidentvehiculeinsurance, Entreprise } from 'shared/table/table';
import { PanelModule } from 'primeng/primeng';
import { Http, Response } from '@angular/http';
import { isUndefined, isNullOrUndefined } from 'util';

@Component({
  selector: 'app-accidentvehiculeinsurance',
  templateUrl: 'accidentvehiculeinsurance.component.html',
  styleUrls: ['./accidentvehiculeinsurance.component.css']
})
export class AccidentvehiculeinsuranceComponent implements OnInit {
  /* accidentvehiculeinsurance: Accidentvehiculeinsurance; */
  selectedAccidentvehiculeinsurance: Accidentvehiculeinsurance;
  selectedNode: TreeNode;
  entreprises: Entreprise[];

  
  newAccidentvehiculeinsurance: Accidentvehiculeinsurance;

 // accidentvehiculeinsurance: Accidentvehiculeinsurance = this.newAccidentvehiculeinsurance;

  dialogVisible = false;
  newMode = false;

  @Input() accidentvehiculeinsurance: Accidentvehiculeinsurance;
  @Input() mode: Mode;
  @Output() operation = new EventEmitter();

  constructor(private service: AccidentvehiculeinsuranceService, private entrepriseservice: EntrepriseService) {
  }

  ngOnInit() {
    this.selectedAccidentvehiculeinsurance = Object.assign({}, this.accidentvehiculeinsurance);
    this.loadData();
  }

  loadData() {
  /*   this.initAccidentvehiculeinsurance();
    this.service.getItem(this.idaccidentvehicule)
        .subscribe(accidentvehiculeinsurance => {
          if (!isNullOrUndefined(accidentvehiculeinsurance)) {
            this.accidentvehiculeinsurance = accidentvehiculeinsurance;
          } else {
            this.accidentvehiculeinsurance = this.newAccidentvehiculeinsurance;
          }
        }); */
    this.entrepriseservice.getAll()
        .subscribe(entreprises => {
            this.entreprises = entreprises;
          }
        );
  }

  initAccidentvehiculeinsurance()  {
    let a = {
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
    this.newAccidentvehiculeinsurance = <Accidentvehiculeinsurance> a;
  }

  perform(event) {
    let eventargs: EventArgs;
    eventargs = this.mode === Mode.insert ? { item: this.accidentvehiculeinsurance, mode: Mode.insert, dialogVisible: false }
                                         : { item: this.accidentvehiculeinsurance, mode: Mode.update, dialogVisible: false };
    this.operation.emit(eventargs);
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
    this.service.updatebyid(this.accidentvehiculeinsurance, 'idaccidentvehicule')
      .subscribe(updateaccidentvehiculeinsurance => {
        this.loadData();
      });
  }

  cancelUpdate(_accidentvehiculeinsurance) {
    this.accidentvehiculeinsurance = Object.assign({}, this.selectedAccidentvehiculeinsurance);
  }

  displayName(item: any, args: string[]): string {
    let result = '';
   /*  */
    if (!isNullOrUndefined(item))  {
      if (args.length > 0) {
        result = item[args[0]];
      }
      for (let i = 1; i < args.length; i++) {
        result = result + ' ' + item[args[i]];
      }
    }
    return result;
  }

  onChangeItem(item: Accidentvehiculeinsurance, field: string, event) {
    item[field] = <Entreprise> event;
  }

  onChangeDatefirst(accidentvehiculeinsurance: Accidentvehiculeinsurance, event) {
    accidentvehiculeinsurance.datefirst = event;
  }

  onChangeDatelast(accidentvehiculeinsurance: Accidentvehiculeinsurance, event) {
    accidentvehiculeinsurance.datelast = event;
  }

}