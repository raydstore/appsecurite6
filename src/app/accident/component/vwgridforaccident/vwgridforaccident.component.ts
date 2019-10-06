import { NotFoundError } from './../../../core/component/common/not-found-error';
import { BadInput } from './../../../core/component/common/bad-input';
import { AppError } from './../../../core/component/common/app-error';
import { Damage, AccidentnaturePK, Accidentnature, VwGridForAccident, CellGrid } from 'shared/table/table';
import { AccidentnatureService } from './../../../shared/services/accidentnature.service';
import { VwnotnatureofaccidentService } from 'shared/services/vwnotnatureofaccident.service';
import { DamageService } from './../../../shared/services/damage.service';
import { VwgridforaccidentService } from './../../../shared/services/vwgridforaccident.service';
import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

enum RateButtonPressed {cancelPressed = 0, ratePressed = 1}
interface RateStatus {
    buttonPressed: RateButtonPressed;
    value: number;
}

@Component({
  selector: 'app-vwgridforaccident',
  templateUrl: './vwgridforaccident.component.html',
  styleUrls: ['./vwgridforaccident.component.css'],
  animations: [
    trigger('rowExpansionTrigger', [
        state('void', style({
            transform: 'translateX(-10%)',
            opacity: 0
        })),
        state('active', style({
            transform: 'translateX(0)',
            opacity: 1
        })),
        transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})

export class VwgridforaccidentComponent implements OnInit {
  @Input() accident: any;
  // @Input() idnature: number;
  indexheader: number;
  vwgridforaccidents: VwGridForAccident[];
  damages: Damage[];
  expandedRows: any = {};
  vwnotnatureofaccidents: any[];
  accidentnatures: any;
  newaccidentnaturePK: AccidentnaturePK = {
    idaccident: 0,
    idnature: 0
  };
  newaccidentnature: Accidentnature = {
    accident: null,
    accidentnaturePK: this.newaccidentnaturePK,
    datecreate: new Date(),
    dateupdate: new Date(),
    owner: 'ali'
  };

  newDamage: Damage = {
    id: 0,
    accidentdomain: 0,
    accidentnature: null,
    idgrid: 0,
    degree: 'A',
    description: '',
    owner: 'ali',
    lastuser: 'ali',
    datecreate: new Date(),
    dateupdate: new Date()
  };

  infoDamage: any  = {
    id: -1,
    name: ''
  };

  rateStatus: RateStatus = {
    buttonPressed: RateButtonPressed.ratePressed,
    value: 0
  };

  cols: any[];
  expandAll = false;
  showLabel = true;
  titleExpandAll = `Tous déveloper      `;
  titleShowLabel = `Affiché les libéllé `;

  constructor(private service: VwgridforaccidentService, private damageService: DamageService,
    private vwnotnatureofaccidentService: VwnotnatureofaccidentService, private accidentnatureService: AccidentnatureService) { }

  ngOnInit() {
    this.loadData();
    this.indexheader = 1;
    this.cols = [
      {field: 'col1', header: 'Salaries du groupe Sonatrach'},
      {field: 'col2', header: 'Salaries EE'},
      {field: 'col3', header: 'Tierce personne'},
      {field: 'col4', header: 'Installations (coûts directs)'},
      {field: 'col5', header: 'Pertes de production'},
      {field: 'col6', header: 'Véhicules'},
      {field: 'col7', header: 'Epandage d"hydrocarbures'}
    ];
  }

  loadData() {
    // let v: any;
    this.service.getByQueryParam({ 'idaccident': this.accident['id'] })
      .subscribe(vwgridforaccidents => {
        /*  */
        for (let i = 0; i < vwgridforaccidents.length; i++) {
          // console.log('this.vwgridforaccidents = ' + JSON.stringify(vwgridforaccidents[i].col1));
          /* v = this.StringToCellGrid((JSON.stringify(vwgridforaccidents[i].col1).replace('///g', ''));
          console.log('v = ' + v); */
          for (let col of this.cols) {
/*             console.log(' (vwgridforaccidents[i]) = ' +  JSON.stringify((vwgridforaccidents[i])));
            console.log(' (vwgridforaccidents[i])[col] = ' +  JSON.stringify((vwgridforaccidents[i])[col]));
 */            (vwgridforaccidents[i])[col.field]     = this.StringToCellGrid((vwgridforaccidents[i])[col.field]);
            vwgridforaccidents[i].expanded = true;
          }
          /* vwgridforaccidents[i].col1 = this.StringToCellGrid(vwgridforaccidents[i].col1);
          vwgridforaccidents[i].col2 = this.StringToCellGrid(vwgridforaccidents[i].col2);
          vwgridforaccidents[i].col3 = this.StringToCellGrid(vwgridforaccidents[i].col3);
          vwgridforaccidents[i].col4 = this.StringToCellGrid(vwgridforaccidents[i].col4);
          vwgridforaccidents[i].col5 = this.StringToCellGrid(vwgridforaccidents[i].col5);
          vwgridforaccidents[i].col6 = this.StringToCellGrid(vwgridforaccidents[i].col6);
          vwgridforaccidents[i].col7 = this.StringToCellGrid(vwgridforaccidents[i].col7); */
        }
        this.vwgridforaccidents = vwgridforaccidents;
        /*  */
     /*    this.expandedRows = this.vwgridforaccidents.filter(function(row) {
          return row.id in [1, 2, 3, 4];
        }); */
      //  console.log('this.vwgridforaccidents = ' + JSON.stringify(this.vwgridforaccidents));
        // console.log('this.expandedRows = ' + JSON.stringify(this.expandedRows));
      });
    this.damageService.getAll()
      .subscribe(damages => {
        this.damages = damages;
      });
  }

ExpandedRow()   {
  if (this.expandAll) {
     this.expandedRows = {"1": true, "2": true, "3": true, "4": true};
  } else {
      this.expandedRows = {};
  }
}

ShowLabels() {

}

StringToCellGrid(col): CellGrid {
  let cell: CellGrid = <CellGrid> JSON.parse(col);
  return cell;
}

  getIdDamage(idaccident, idgrid): any {
    let result: any[];
    result = this.damages.filter(function(damage){
      return ((damage.accidentnature.accident.id === idaccident) && (damage.idgrid === idgrid));
    });
    if (result.length === 0) {
      this.infoDamage.id   = -1;
      this.infoDamage.name = '';
    } else {
      this.infoDamage.id   = result[0].id;
      this.infoDamage.name = result[0].name;
      // result[0].id;
    };
    return this.infoDamage;
  }

  loadAccidentNature() {
    this.accidentnatureService.getAll()
      .subscribe(accidentnatures => {
        this.accidentnatures = accidentnatures;
      });
    this.vwnotnatureofaccidentService.getByQueryParam({ 'idaccident': this.accident['id'] })
      .subscribe(vwnotnatureofaccidents => {
        this.vwnotnatureofaccidents = vwnotnatureofaccidents;
      });
  }

  getAccidentnature(id: number): any {
    let item: Accidentnature;
    this.accidentnatureService.getItem('id;idaccident=' + this.accident.id + ';idnature=' + id)
    .subscribe(
      accidentnature => {
      return accidentnature;
    });

  }

  /* getDamageGrid(value: string): DamageGrid {
    let obj: DamageGrid =  <DamageGrid> JSON.parse(value);
    return obj;
  } */

  newAN(event) {
    this.rateStatus.buttonPressed = RateButtonPressed.ratePressed;
    this.rateStatus.value = event.value;

  }

  deleteAN(event) {
    this.rateStatus.buttonPressed = RateButtonPressed.cancelPressed;
    this.rateStatus.value = 0;
  }

  clicked(col: CellGrid) {
    // console.log('d event    = ' + JSON.stringify(event));
    // console.log('clicked col1 = ' + JSON.stringify(col1));

/*     console.log(JSON.stringify(col));
    console.log(JSON.stringify(this.rateStatus));
    console.log(oldrate); */

    if (this.rateStatus.buttonPressed === RateButtonPressed.ratePressed) {
       if (col.oldrate !== 1) {
         console.log('entred');
         this.onChangeDamageWithRank(col);
       }
    } else if (col.rate === 1) {
      this.deleteDamage(col.iddamage);
    }
  }

  getTitle(item: VwGridForAccident, indexheader: number): string {
     let field: string = 'col' + indexheader;
     return this.cols[indexheader - 1].header + ' : ' + (<CellGrid> item[field]).name;
  }

  newAccidentNature(accidentnature: Accidentnature) {
    this.accidentnatureService.create(accidentnature)
      .subscribe(newaccidentnature => {
      }
      , (error: AppError) => {
        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
          throw error;
        }
      });
  }

  createdamage(damage) {
    this.damages = [damage, ...this.damages];
    this.damageService.create(damage)
      .subscribe(newdamage => {
        this.loadData();
      }, (error: AppError) => {
        this.damages.splice(0, 1);
        if (error instanceof BadInput) {
        } else {
          throw error;
        }
      });
  }

  deleteDamage(iddamage: number) {
    // let index = this.damages.indexOf(damage);
    // this.damages.splice(index, 1);
    //  this.damages = [...this.damages];
    this.damageService.delete(iddamage)
      .subscribe(
        () => {
          this.loadData();
        },
        (error: Response) => {
          // this.damages.splice(index, 0, damage);

          if (error instanceof NotFoundError) {
            alert('this damage has already been deleted');
          } else {
            throw error;
          }
        }
      );
  }

  onChangeDamageWithRank(col: CellGrid) {
    let nAccidentnature: Accidentnature;
    let idnature = col.idnature;
    /* eventargs.accidentdomain <= 3 ? 1 : eventargs.accidentdomain <= 6 ? 2 : 3; */
    let _accidentnature: any;
    this.accidentnatureService.getItem('id;idaccident=' + this.accident.id + ';idnature=' + idnature)
      .subscribe(accidentnature => {
        _accidentnature = accidentnature;
      }, (error: AppError) => {
        this.damages.splice(0, 1);
        if (error instanceof BadInput) {
        } else {
          throw error;
        }
      }, () => {
        if (_accidentnature == null) {
          nAccidentnature = this.newaccidentnature;
          nAccidentnature.accident = this.accident;
          nAccidentnature.accidentnaturePK.idaccident = this.accident.id;
          nAccidentnature.accidentnaturePK.idnature = idnature;
          _accidentnature = nAccidentnature;
          this.newAccidentNature(_accidentnature);
        }
        let damage: Damage = this.newDamage;
        damage.accidentdomain = col.accidentdomain;
        damage.idgrid         = col.idgrid;
        damage.accidentnature = _accidentnature;
        this.createdamage(damage);
      });
  }

}

