import { VwnotnatureofaccidentService } from 'shared/services/vwnotnatureofaccident.service';
import { AccidentnatureService } from 'shared/services/accidentnature.service';
import { NotFoundError } from '../../../core/component/common/not-found-error';
import { BadInput } from '../../../core/component/common/bad-input';
import { AppError } from '../../../core/component/common/app-error';
import { Damage, AccidentnaturePK, Accidentnature } from 'shared/table/table';
import { VwgridService } from 'shared/services/vwgrid.service';
import { Component, OnInit, Input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DamageService } from 'shared/services/damage.service';


@Component({
  selector: 'app-vwgrid',
  templateUrl: './vwgrid.component.html',
  styleUrls: ['./vwgrid.component.css']
})
export class VwgridComponent implements OnInit {
  @Input() accident: any;
  // @Input() idnature: number;
  indexheader: number;
  vwgrids: any[];
  damages: Damage[];
  expandedRows: any[] = [];
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
  infoDamage: any  = {
    id: -1,
    name: ''
  };

  constructor(private service: VwgridService, private damageService: DamageService,
    private vwnotnatureofaccidentService: VwnotnatureofaccidentService, private accidentnatureService: AccidentnatureService) { }

  ngOnInit() {
    this.loadData();
    this.indexheader = 1;
    // this.expandedRows = [...this.vwgrids];
   /*  const thisRef = this;
    this.vwgrids.forEach(function(vwgrid) {
      thisRef.expandedRows[vwgrid.id] = 1;
    }); */
  }

  loadData() {
    this.service.getAll()
      .subscribe(grids => {
        this.vwgrids = grids;
        this.expandedRows = this.vwgrids.filter(function(row) {
          return row.id in [1, 2, 3, 4];
        });
        console.log('this.expandedRows = ' + JSON.stringify(this.expandedRows));
      });
    this.damageService.getAll()
      .subscribe(damages => {
        this.damages = damages;
      });
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

  deleteDamage(damage: Damage) {
    let index = this.damages.indexOf(damage);
    this.damages.splice(index, 1);
    this.damages = [...this.damages];
    this.service.delete(damage.id)
      .subscribe(
        () => {
          this.loadData();
        },
        (error: Response) => {
          this.damages.splice(index, 0, damage);

          if (error instanceof NotFoundError) {
            alert('this damage has already been deleted');
          } else {
            throw error;
          }
        }
      );
  }

  onChangeDamageWithRank(eventargs: Damage) {
    let nAccidentnature: Accidentnature;
    let idnature = eventargs.accidentdomain <= 3 ? 1 : eventargs.accidentdomain <= 6 ? 2 : 3;
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

        eventargs.accidentnature = _accidentnature;
        this.createdamage(eventargs);
      });
  }

}
