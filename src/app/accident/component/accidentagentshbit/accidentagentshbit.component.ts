import { BitclassService } from 'shared/services/bitclass.service';
import { AccidentagentshbitService } from 'shared/services/accidentagentshbit.service';
import { Component, OnInit, Input } from '@angular/core';
import { Vw$accidentagentshbitService } from 'shared/services/vw$accidentagentshbit.service';
import { Vw$accidentagentshbit } from 'shared/table/table';

@Component({
  selector: 'app-accidentagentshbit',
  templateUrl: './accidentagentshbit.component.html',
  styleUrls: ['./accidentagentshbit.component.css']
})
export class AccidentagentshbitComponent implements OnInit {
  @Input() iddamage: number;
  @Input() idagent:  string;
  @Input() idgrid: number;
  vw$accidentagentshbits: Vw$accidentagentshbit[];
  bitclasss: any[];

  constructor(private service: Vw$accidentagentshbitService,
     private accidentagentshbitService: AccidentagentshbitService, private bitclassService: BitclassService) { }

  ngOnInit() {
    this.loadData();
    this.loadDataBitClass();

  }

  loadData() {
    this.service.getByQueryParam({ 'iddamage': this.iddamage, 'idagent': this.idagent, 'idgrid': this.idgrid })
      .subscribe(vw$accidentagentshbits => {
        this.vw$accidentagentshbits = vw$accidentagentshbits;
      });
  }


  loadDataBitClass() {
    this.bitclassService.getAll()
      .subscribe(bitclasss => {
        this.bitclasss = bitclasss;
      });
  }

  newNature() {

  }

  newSiege() {

  }

  newForme() {

  }

  newMateriel() {

  }

}
