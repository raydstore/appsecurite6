import { NotFoundError } from './../../../core/component/common/not-found-error';
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
  @Input() idgrid: number;
  @Input() accidentagentsh: Accidentagentsh;
  accidentagentshbits: Accidentagentshbit[];
  bits: Bit[] = [];
  vwaccidentagentshbits: Vw$accidentagentshbit[];
  selectedVwaccidentagentshbit: Vw$accidentagentshbit;
  titlelist = 'Accident agent sh bit';
  cols: any[];
  _accidentagentshbit: Accidentagentshbit = {
    accidentagentsh: this.accidentagentsh,
    datecreate: new Date(),
    dateupdate: new Date(),
    id: 0,
    kind: '',
    idgrid: this.idgrid,
    name: '',
    idbitclass: '',
    idbit: '',
    lastuser: 'ali',
    owner: 'ali'
  };
  newSite: Site;

  dialogVisible = false;
  newMode = false;


  constructor(private service: AccidentagentshbitService,
    private vwaccidentagentshbitService: Vw$accidentagentshbitService, private bitService: BitService) { }


  ngOnInit() {
    this.loadData();
    this.loadDataBit();
    this.bits = this.getBitNotClassAssigned(this.bits);
  }

  loadData() {
    this.vwaccidentagentshbitService.getByQueryParam({
      'iddamage': this.accidentagentsh.accidentagentshPK.iddamage,
      'idagent': this.accidentagentsh.accidentagentshPK.idagent, 'idgrid': this.idgrid
    })
      .subscribe(vwaccidentagentshbits => {
        this.vwaccidentagentshbits = vwaccidentagentshbits;
        for (const item of this.vwaccidentagentshbits) {
          if (!('name' in item)) {
            item.name = '';
          }
        }
      });
  }

  loadDataBit() {
    this.bitService.getAll()
      .subscribe(bits => {
        this.bits = bits;
      });
  }

  getBitNotClassAssigned(bits: Bit[]): Bit[] {
    console.log('enter b n a =');
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: Bit[] = [];
    if (bits != null) {
      for (let i = 0; i < bits.length; i++) {
        const bit = bits[i];
        if (!this.isAssignedBitclass(bit) && (bit.kind === 'I')) {
          filtered.push(bit);
        }
      }
      console.log('b n a =' + JSON.stringify(filtered));
    }
    return filtered;
  }

  isAssignedBitclass(bit: Bit): boolean {
    let result = false;
    for (let i = 0; i < this.vwaccidentagentshbits.length; i++) {
      result = this.vwaccidentagentshbits[i].idbitclass === bit.idbitclass;
      if (result) { break; }
    }
    return result;
  }

  createItem(event) {
    /* close Dialog */
    this.dialogVisible = false;
    /* refresh data */
    if (!event.cancelDialog) {
      console.log('accidentagentshbit inserted is = ' + JSON.stringify(event.newAccidentshbit))
      this.loadData();
    }
  }

  /*   setIdSiteParentToSite(item: Site, field: string, event) {
      item[field] = <Site>event;
    }

    setIdLabelToSite(item: Site, field: string, event) {
      item[field] = <Label>event;
    }
 */
  /*
  const nsite = Object.assign({}, <Site>event);
      this.newSite = Object.assign({}, this._newSite);
      this.sites = [nsite, ...this.sites];
      this.service.create(nsite)
        .subscribe(newSite => {
          this.loadData();
        }, (error: AppError) => {
          this.sites.splice(0, 1);
          if (error instanceof BadInput) {
            // this.form.setErrors(originalError);
          } else {
            throw error;
          }
        });
  */

  gdisplayName(item: any, args: string[]): string {
    console.log('enter displayname = ' + JSON.stringify(item));
    let result = '';
    if (item !== null) {
      if (args.length > 0) {
        result = item[args[0]];
      }
    }
    return result;
  }

  deleteAccidentagentshbit(_vwaccidentagentshbit: Vw$accidentagentshbit) {
    const index = this.vwaccidentagentshbits.indexOf(_vwaccidentagentshbit);
    this.vwaccidentagentshbits.splice(index, 1);
    this.vwaccidentagentshbits = [...this.vwaccidentagentshbits];
    const accidentagentshbit: Accidentagentshbit = this.cloneAccidentagentshbit(_vwaccidentagentshbit);
    this.service.delete(accidentagentshbit.id)
      .subscribe(
        () => { this.loadData(); },
        (error: Response) => {
          this.vwaccidentagentshbits.splice(index, 0, _vwaccidentagentshbit);

          if (error instanceof NotFoundError) {
            alert('this post has already been deleted');
          } else {
            throw error;
          }
        }
      );
  }

  cloneAccidentagentshbit(_vwaccidentagentshbit: Vw$accidentagentshbit): Accidentagentshbit {
    const accidentagentshbit: Accidentagentshbit = Object.assign({}, this._accidentagentshbit);
    accidentagentshbit.idbitclass = _vwaccidentagentshbit.idbitclass;
    accidentagentshbit.idbit = _vwaccidentagentshbit.idbit;
    accidentagentshbit.kind = _vwaccidentagentshbit.kind;
    accidentagentshbit.name = _vwaccidentagentshbit.name;
    return accidentagentshbit;
  }

  updateAccidentagentshbit(_vwaccidentagentshbit: Vw$accidentagentshbit) {
    const accidentagentshbit: Accidentagentshbit = this.cloneAccidentagentshbit(_vwaccidentagentshbit);
    this.service.update(accidentagentshbit)
      .subscribe(() => {
        this.loadData();
      });
  }

  cancelUpdate(_accidentagentshbit) {
    //
  }

  showDialogToAdd() {
    // this.newSite = Object.assign({}, this._newSite);
    this.newMode = true;
    this.dialogVisible = true;
  }

  onChangeItemLabel(item: Site, field: string, event) {
    console.log('enter on change label = ' + JSON.stringify(item));
    item[field] = <Label>event;
  }

}
