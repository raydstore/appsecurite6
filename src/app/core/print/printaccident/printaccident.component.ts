import { Component, OnInit } from '@angular/core';
import { ListreportofaccidentService } from 'shared/services/listreportofaccident.service';
import { Listreportofaccident } from 'shared/table/table';
import { PrintService } from 'shared/services/print.service';
import { Store } from '@ngrx/store';
import { StoreInterface } from 'app/store/store';
import { paramsSelector } from 'app/store/reducer/printcard.reducer';

@Component({
  selector: 'app-printaccident',
  templateUrl: './printaccident.component.html',
  styleUrls: ['./printaccident.component.css']
})
export class PrintaccidentComponent implements OnInit {
  /* @Input()  */
  idaccident: number;
  listrepotofaccidents: Listreportofaccident[];
  showList: boolean;
  showCard: boolean;

  urlPrint: String = 'http://10.1.0.150:8080/HseWebService/wsrv/print';

  constructor(private listrepotofaccidentService: ListreportofaccidentService, private _printService: PrintService, 
    private store: Store<StoreInterface>) { }

  ngOnInit() {
    /* this._printService.componentToPrint$.
      subscribe(componentTarget => {
        if (componentTarget.name === 'accident') {
          this.showCard = true;
          this.idaccident = componentTarget.id;
          if (componentTarget.id !== 0) {
            this.loadData(componentTarget.id);
            this.showList = true;
          } else {
            this.showList = false;
          }
        } else {
          this.showCard = false;
        }
      }); */
      this.store.select(paramsSelector).subscribe(params => {
        this.showCard = params.showcard;
        if (this.showCard) {
          this.idaccident = params.id;
          if (params.id !== 0) {
            this.loadData(params.id);
            this.showList = true;
          } else {
            this.showList = false;
          }
        }
      });
  }

  loadData(idaccident: number) {
    this.listrepotofaccidentService.getByQueryParam({ 'idaccident': idaccident }).
      subscribe(listrepotofaccidents => {
        this.listrepotofaccidents = listrepotofaccidents;
      });
  }

  getPrintUrl(reportname) {
    return this.urlPrint + '?reportname=' + reportname + '&&p=' + this.idaccident;
  }

}
