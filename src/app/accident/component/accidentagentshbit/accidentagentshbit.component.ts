import { BadInput } from './../../../core/component/common/bad-input';
import { AppError } from './../../../core/component/common/app-error';
import { BitService } from './../../../shared/services/bit.service';
import { BitclassService } from 'shared/services/bitclass.service';
import { AccidentagentshbitService } from 'shared/services/accidentagentshbit.service';
import { Component, OnInit, Input } from '@angular/core';
import { Vw$accidentagentshbitService } from 'shared/services/vw$accidentagentshbit.service';
import { Vw$accidentagentshbit, Bitclass, Bit, Accidentagentshbit, Accidentagentsh } from 'shared/table/table';
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
  /* @Input() iddamage: number;
  @Input() idagent: string; */
  @Input() idgrid: number;
  @Input() accidentagentsh: Accidentagentsh;
  vw$accidentagentshbits: Vw$accidentagentshbit[];
  bitclasss: Bitclass[];
  bits: Bit[];
  a_bits: Bit[] = null;
  b_bits: Bit[] = null;
  c_bits: Bit[] = null;
  d_bits: Bit[] = null;
  filteredBitsMultiple: Bit[];
  rBits: Bit[];
  // bitStatus: BitStatus;
  resultBit: Vw$accidentagentshbit;
  listBits: Bit[];
  item: Accidentagentshbit;


  constructor(private service: Vw$accidentagentshbitService,
    private accidentagentshbitService: AccidentagentshbitService, private bitclassService: BitclassService,
    private bitService: BitService) { }

  ngOnInit() {
    this.loadDataBitClass();
    this.loadData();
    this.loadDataBit();
  }

  loadData() {
    this.service.getByQueryParam({ 'iddamage': this.accidentagentsh.accidentagentshPK.iddamage,
                                   'idagent': this.accidentagentsh.accidentagentshPK.idagent, 'idgrid': this.idgrid })
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

  loadDataBit() {
    this.bitService.getAll()
      .subscribe(bits => {
        this.bits = this.getBitNotClassAssigned(bits);
        this.a_bits = bits.filter(bit => (bit.idbitclass === 'A') && (bit.kind === 'I'));
        this.b_bits = bits.filter(bit => (bit.idbitclass === 'B') && (bit.kind === 'I'));
        this.c_bits = bits.filter(bit => (bit.idbitclass === 'C') && (bit.kind === 'I'));
        this.d_bits = bits.filter(bit => (bit.idbitclass === 'D') && (bit.kind === 'I'));
      });
  }

  getBitStatus(bitclass: string): boolean {
    this.resultBit = this.vw$accidentagentshbits.find(bit => bit.idbitclass === bitclass);
    switch (bitclass) {
      case 'B': {
        this.listBits = this.b_bits;
        break;
      }
      case 'C': {
        this.listBits = this.c_bits;
        break;
      }
      case 'D': {
        this.listBits = this.d_bits;
        break;
      }
      case 'default': {
        this.listBits = this.a_bits;
        break;
      }
    }
    return !isNullOrUndefined(this.resultBit);
  }

  getFullName(value): string {
    return value.idbitclass + ' - ' + value.classname + ' : ' + value.name + `     `;
  }

  filterBitMultiple(event) {
    const query = event.query;
    this.filteredBitsMultiple = this.filterBit(query, this.bits);
  }

  onSelect(value: Bit) {
    console.log('value onSelect = ' + JSON.stringify(value));
    const newAccidentagentshbit: Accidentagentshbit = {
      id: 0,
      accidentagentsh: this.accidentagentsh,
      idgrid: this.idgrid,
      idbit: '',
      idbitclass: '',
      kind: '',
      owner: 'ali',
      lastuser: 'ali',
      datecreate: new Date(),
      dateupdate: new Date()
    };
    /* this.rBits = [value, ...this.rBits]; */
    newAccidentagentshbit.idbit = value.id;
    newAccidentagentshbit.idbitclass = value.idbitclass;
    newAccidentagentshbit.kind = value.kind;
    console.log('newAccidentagentshbit onSelect = ' + JSON.stringify(newAccidentagentshbit));
    this.accidentagentshbitService.create(newAccidentagentshbit)
      .subscribe(accidentagentshbit => {
        this.rBits = [];
        this.loadData();
        this.bits = this.getBitNotClassAssigned(this.bits);
      }, (error: AppError) => {
       // this.rBits.splice(0, 1);
        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
        }
      });
  }

  onUnselect(value) {
    console.log('value onUnselect = ' + JSON.stringify(value));
  }


  filterBit(query, bits: Bit[]): Bit[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: Bit[] = [];
    for (let i = 0; i < bits.length; i++) {
      let bit = bits[i];
      if (bit.id.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        filtered.push(bit);
      }
    }
    return filtered;
  }

  getBitNotClassAssigned(bits: Bit[]): Bit[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: Bit[] = [];
    for (let i = 0; i < bits.length; i++) {
      let bit = bits[i];
      if (!this.isAssignedBitclass(bit) && (bit.kind === 'I')) {
        filtered.push(bit);
      }
    }
    return filtered;
  }

  isAssignedBitclassold(bit: Bit): boolean {
    let result = false;
    for (let i = 0; i < this.rBits.length; i++) {
      result = this.rBits[i].idbitclass === bit.idbitclass;
      if (result) { break; }
    }
    return result;
  }

  isAssignedBitclass(bit: Bit): boolean {
    let result = false;
    for (let i = 0; i < this.vw$accidentagentshbits.length; i++) {
      result = this.vw$accidentagentshbits[i].idbitclass === bit.idbitclass;
      if (result) { break; }
    }
    return result;
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
