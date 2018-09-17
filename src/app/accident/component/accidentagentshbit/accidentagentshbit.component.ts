import { BitService } from './../../../shared/services/bit.service';
import { BitclassService } from 'shared/services/bitclass.service';
import { AccidentagentshbitService } from 'shared/services/accidentagentshbit.service';
import { Component, OnInit, Input } from '@angular/core';
import { Vw$accidentagentshbitService } from 'shared/services/vw$accidentagentshbit.service';
import { Vw$accidentagentshbit, Bitclass, Bit, Accidentagentshbit } from 'shared/table/table';
import { isUndefined, isNullOrUndefined } from 'util';

@Component({
  selector: 'app-accidentagentshbit',
  templateUrl: './accidentagentshbit.component.html',
  styleUrls: ['./accidentagentshbit.component.css']
})

/* interface BitStatus {
  locate: boolean;
  value: Bit;
} */

export class AccidentagentshbitComponent implements OnInit {
  @Input() iddamage: number;
  @Input() idagent:  string;
  @Input() idgrid: number;
  vw$accidentagentshbits: Vw$accidentagentshbit[];
  bitclasss: Bitclass[];
  bits: Bit[];
  a_bits: Bit[] = null;
  b_bits: Bit[] = null;
  c_bits: Bit[] = null;
  d_bits: Bit[] = null;
  // bitStatus: BitStatus;
  resultBit: Vw$accidentagentshbit;
  listBits: Bit[];
  item: Accidentagentshbit;

  constructor(private service: Vw$accidentagentshbitService,
     private accidentagentshbitService: AccidentagentshbitService, private bitclassService: BitclassService, 
     private bitService: BitService) { }

  ngOnInit() {
    this.loadDataBit();
    this.loadDataBitClass();
    this.loadData();
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

  getBitStatus(bitclass: string): boolean{
    this.resultBit = this.vw$accidentagentshbits.find(bit => bit.idbitclass === bitclass);
    switch(bitclass) {
      case 'B' : {
        this.listBits = this.b_bits;
        break;
      }
      case 'C' : {
        this.listBits = this.c_bits;
        break;
      }
      case 'D' : {
        this.listBits = this.d_bits;
        break;
      }
      case 'default' : {
        this.listBits = this.a_bits;
        break;
      }
    }
    return !isNullOrUndefined(this.resultBit);
  }


  loadDataBit() {
    this.bitService.getAll()
      .subscribe(bits => {
        this.bits = bits;
        this.a_bits = bits.filter(bit => (bit.idbitclass === 'A') && (bit.kind === 'I'));
        this.b_bits = bits.filter(bit => (bit.idbitclass === 'B') && (bit.kind === 'I'));
        this.c_bits = bits.filter(bit => (bit.idbitclass === 'C') && (bit.kind === 'I'));
        this.d_bits = bits.filter(bit => (bit.idbitclass === 'D') && (bit.kind === 'I'));
      });
  }

  displayName(item: any, args: string[]): string {
    let result = '';
    if (item !== null) {
      if (args.length > 0) {
        result = item[args[0]];
      }
      for (let i = 1; i < args.length; i++) {
        result = result + ' ' + item[args[i]];
      }
    }
    return result;
  }


  onChangeItem(item: Accidentagentshbit, field: string, event) {
    /* passe choise agent to field item on accidentagent */
    this.item = <Accidentagentshbit>event.item;
    // this.item.accidentagentshPK.idagent = (<Agent>event.item).id;
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
