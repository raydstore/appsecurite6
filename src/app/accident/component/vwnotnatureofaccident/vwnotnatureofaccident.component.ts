import { Accidentnature, AccidentnaturePK } from 'shared/table/table';
import { BadInput } from '../../../core/component/common/bad-input';
import { AppError } from '../../../core/component/common/app-error';
import { AccidentnatureService } from 'shared/services/accidentnature.service';
import { VwnotnatureofaccidentService } from 'shared/services/vwnotnatureofaccident.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vwnotnatureofaccident',
  templateUrl: './vwnotnatureofaccident.component.html',
  styleUrls: ['./vwnotnatureofaccident.component.css']
})
export class VwnotnatureofaccidentComponent implements OnInit {
  @Input() accident: any;
  vwnotnatureofaccidents: any[];
  newaccidentnaturePK: AccidentnaturePK = {
    idaccident : 0,
    idnature : 0
  };
  newaccidentnature : Accidentnature = {
    accident: null,
    accidentnaturePK: this.newaccidentnaturePK,
    datecreate: new Date(),
    dateupdate: new Date(),
    owner: 'ali'
}

  constructor(private service: VwnotnatureofaccidentService, private serviceAccidentnature: AccidentnatureService) { }

  ngOnInit() {
    this.loadData();

  }

  loadData() {
    this.service.getByQueryParam({ 'idaccident': this.accident['id'] })
    .subscribe(vwnotnatureofaccidents => {
      this.vwnotnatureofaccidents = vwnotnatureofaccidents;
    });
  }

  newAccidentNature (idnature: number) {
    this.newaccidentnature.accidentnaturePK.idaccident = this.accident['id'];
    this.newaccidentnature.accidentnaturePK.idnature = idnature;
    this.newaccidentnature.accident = this.accident;
    // console.log('ac n = '+ JSON.stringify(this.newaccidentnature));
    this.serviceAccidentnature.create(this.newaccidentnature).subscribe (
      newaccidentnature => { this.loadData(); }
    , (error: AppError) => {
      if (error instanceof BadInput) {
        // this.form.setErrors(originalError);
      } else {
        throw error;
      }
    });
    this.newaccidentnature.accidentnaturePK.idnature = 0;
  }
}
