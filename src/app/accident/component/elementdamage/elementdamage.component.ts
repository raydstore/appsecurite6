import { VwdamageService } from './../../../shared/services/vwdamage.service';
import { VwelementdamageService } from 'shared/services/vwelementdamage.service';
import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { isUndefined, isNullOrUndefined } from 'util';

@Component({
  selector: 'app-elementdamage',
  templateUrl: './elementdamage.component.html',
  styleUrls: ['./elementdamage.component.css']
})
export class ElementdamageComponent implements OnInit {
  @Input() idaccident: number;
  @Input() idnature: number;
  elementdamages: any[];
  damages: any[];

  constructor(private service: VwelementdamageService, private serviceVwdamage: VwdamageService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
 //   console.log('in ed');
    this.service.getByQueryParam({ 'idaccident': this.idaccident, 'idnature': this.idnature })
      .subscribe(elementdamages => {
        this.elementdamages = elementdamages;
    //    console.log('ed = ' + JSON.stringify(this.elementdamages));
      });
      this.serviceVwdamage.getAll()
          .subscribe(damages => {
            this.damages = damages;
          });
  //  console.log('out ed');
  }

  /* getDamages(idaccident: number, idnature: number, accidentdomain: number): any[] {
    let _damages: any[] = null;
    this.serviceVwdamage.getByQueryParam({ 'idaccident': idaccident, 'idnature': idnature,
                                   'accidentdomain': accidentdomain })
      .subscribe(damages => {
        _damages = damages;
        console.log('damages = ' + JSON.stringify(_damages));
      });
    return _damages;
    } */


    filterDamage(item, idaccident, idnature, accidentdomain, index, array) {
      return (item.idaccident === idaccident) &&
      (item.idnature === idnature) &&
      (item.accidentdomain === accidentdomain);
   }

  getDamages(idaccident: number, idnature: number, accidentdomain: number): any[] {


      if (!isNullOrUndefined(this.damages)) {

       return this.damages.filter(item => (item.idaccident === idaccident) &&
                                        (item.idnature === idnature) &&
                                        (item.accidentdomain === accidentdomain) );
     // }
    }

}
}
