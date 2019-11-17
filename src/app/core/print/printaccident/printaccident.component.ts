import { Component, OnInit, Input } from '@angular/core';
import { ListreportofaccidentService } from 'shared/services/listreportofaccident.service';
import { Listreportofaccident } from 'shared/table/table';
import { PrintService } from 'shared/services/print.service';

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

  constructor(private listrepotofaccidentService: ListreportofaccidentService, private _printService: PrintService) { }

  ngOnInit() {
    this._printService.componentToPrint$.
      subscribe(componentTarget => {
        if (componentTarget.name === 'accident') {
          this.showCard = true;
          this.idaccident = componentTarget.id;
          /* console.log('tr =' + JSON.stringify(componentTarget)); */
          if (componentTarget.id !== 0) {
            this.loadData(componentTarget.id);
            this.showList = true;
          } else {
            this.showList = false;
          }
        } else {
          this.showCard = false;
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
