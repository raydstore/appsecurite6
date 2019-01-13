import { Accidentvehiculedriverns } from './../../../shared/table/table';
import { AccidentvehiculedrivernsService } from './../../../shared/services/accidentvehiculedriverns.service';
import { Accidentvehiculedriver } from 'shared/table/table';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accidentvehiculedriverns',
  templateUrl: './accidentvehiculedriverns.component.html',
  styleUrls: ['./accidentvehiculedriverns.component.css']
})
export class AccidentvehiculedrivernsComponent implements OnInit {

  @Input() accidentvehiculedriverns: Accidentvehiculedriverns;
  /* accidentvehiculedriverns: Accidentvehiculedriverns; */

  constructor(private service: AccidentvehiculedrivernsService) { }

  ngOnInit() {
    /* this.loadData(); */
  }

  loadData() {
  /*   this.service.getItem(this.accidentvehiculedriver.idaccidentvehicule)
      .subscribe(accidentvehiculedriverns => {
        this.accidentvehiculedriverns = accidentvehiculedriverns;
      }); */
  }

  onChangeDate(accidentvehiculedriverns: Accidentvehiculedriverns, event) {

  }

}
