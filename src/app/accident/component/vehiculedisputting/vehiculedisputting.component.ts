import { Component, OnInit, Input } from '@angular/core';
import { VehiculedisputtingService } from 'shared/services/vehiculedisputting.service';
import { VwvehiculedisputtingService } from 'shared/services/vwvehiculedisputting.service';
import { VwschemavehiculedisputtingService } from 'shared/services/vwschemavehiculedisputting.service';
import { Vehiculedisputting, Vwvehiculedisputting,  Vwschemavehiculedisputting} from 'shared/table/table';
import { AppError } from 'app/core/component/common/app-error';
import { BadInput } from 'app/core/component/common/bad-input';
import { NotFoundError } from 'app/core/component/common/not-found-error';

@Component({
  selector: 'app-vehiculedisputting',
  templateUrl: './vehiculedisputting.component.html',
  styleUrls: ['./vehiculedisputting.component.css']
})
export class VehiculedisputtingComponent implements OnInit {
  @Input() idaccident: number;
  vwvehiculedisputtings: Vwvehiculedisputting[];
  vwschemavehiculedisputtings: Vwschemavehiculedisputting[];
  selectedvwschemavehiculedisputtings: Vwschemavehiculedisputting[];
  newvehiculedisputting: Vehiculedisputting = {
  id: 0,
  idaccident: this.idaccident,
  iddamagea: null,
  idvehiculea: null,
  iddamageb: null,
  idvehiculeb: null,
  owner: '',
  lastuser: '',
  datecreate: new Date(),
  dateupdate: new Date(),
  };
  cols: any[];
  inputMode = false;
  itemCount: number;

  constructor(private service: VehiculedisputtingService, private vwvehiculedisputtingservice: VwvehiculedisputtingService,
    private vwschemavehiculedisputtingservice: VwschemavehiculedisputtingService) { }

  ngOnInit() {
    this.cols = [
      { field: 'matriculea',     header: 'matricule',   width: '7.75em' },
      { field: 'marka',          header: 'marque',      width: '7.75em' },
      { field: 'namea',          header: 'type',        width: '7.75em' },
      { field: '',               header: '',        width: '1.75em' },
      { field: 'matriculeb',     header: 'matricule',   width: '7.75em' },
      { field: 'markb',          header: 'marque',      width: '7.75em' },
      { field: 'nameb',          header: 'type',        width: '7.75em' },
    ];
    this.loadData();
  }

  loadData() {
    this.loadVehiculedisputting();
    
  }

  loadVehiculedisputting() {
    this.vwvehiculedisputtingservice.getByQueryParam({ 'idaccident': this.idaccident })
    .subscribe(vwvehiculedisputtings => {
          this.vwvehiculedisputtings = vwvehiculedisputtings;
          this.itemCount = this.vwvehiculedisputtings.length;
          this.loadSchemavehiculedisputting();
    });
  }

  loadSchemavehiculedisputting() {
    this.vwschemavehiculedisputtingservice.getByQueryParam({ 'idaccident': this.idaccident })
    .subscribe(vwschemavehiculedisputtings => {
          this.vwschemavehiculedisputtings = vwschemavehiculedisputtings;
    });
  }

  initVehiculedisputting() {
    this.newvehiculedisputting = {
      id: 0,
      idaccident: this.idaccident,
      iddamagea: null,
      idvehiculea: null,
      iddamageb: null,
      idvehiculeb: null,
      owner: '',
      lastuser: '',
      datecreate: new Date(),
      dateupdate: new Date(),
      };
  }


  initDeclaration() {
    this.selectedvwschemavehiculedisputtings = [];
    this.inputMode = !this.inputMode;
  }

  declareVehicule() {
    for (let item of this.selectedvwschemavehiculedisputtings) {
       this.initVehiculedisputting();
       this.newvehiculedisputting.iddamagea    = item.iddamagea;
       this.newvehiculedisputting.idvehiculea  = item.idvehiculea;
       this.newvehiculedisputting.iddamageb    = item.iddamageb;
       this.newvehiculedisputting.idvehiculeb  = item.idvehiculeb;
       this.service.create(this.newvehiculedisputting).
       subscribe(newActionopscard => {
        this.loadData();
       }, (error: AppError) => {
            if (error instanceof BadInput) {
            } else {
            throw error;
          }
        });
    }
    this.inputMode = !this.inputMode;
  }
  
  delete(item) {
    /* let index = this.activitys.indexOf(_activity);
    this.activitys.splice(index, 1);
    this.activitys = [...this.activitys]; */
    this.service.delete(item.id)
      .subscribe( () =>
      {
        this.loadVehiculedisputting();
      },
      (error: Response) => {
        // this.activitys.splice(index, 0, _activity);

        if (error instanceof NotFoundError) {
          alert('this post has already been deleted');
        } else {
          throw error;
        }
      }
      );
  }
}
