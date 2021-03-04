import { Component, OnInit } from '@angular/core';
import { ListreportofaccidentService } from 'shared/services/listreportofaccident.service';
import { Listreportofaccident } from 'shared/table/table';
import { PrintService } from 'shared/services/print.service';
import { Store } from '@ngrx/store';
import { StoreInterface } from 'app/store/store';
import { paramsSelector } from 'app/store/reducer/printcard.reducer';
import { PrintreportService } from 'shared/services/printreport.service';

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
  formatState: boolean;
  format = 'html';
  iconFormat: 'print';
  grValue: 'html'

  urlPrint: String = 'http://10.113.113.64:8080/jasperserver/rest_v2/reports/prjAccident/';
  // 'http://10.1.0.150:8080/HseWebService/wsrv/print';


  url = 'http://jasperadmin:jasperadmin@10.113.113.64:8080/jasperserver/rest_v2/reports/prjAccident/rptRapportAccident.html?p=200416080003';
  url1 = 'http://jasperadmin:jasperadmin@10.113.113.64:8080/jasperserver/rest_v2/reports/prjAccident/rptRapportAccident.pdf?p=200416080003';

  constructor(private listrepotofaccidentService: ListreportofaccidentService, private _printService: PrintService,
    private store: Store<StoreInterface>, private printreportService: PrintreportService) { }

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

  close(window) {
    window.close();
  }

  print() {
    window.open(this.url1);
  }

  getPrintUrl(reportname): String {

  //  var mywindow = window.open(this.url);

    //mywindow.onload = function(){mywindow.document.body.innerHTML += '<button type="button" onclick="close(mywindow)">Close</button>'};
    /* mywindow.document.body.innerHTML = '<button type="button" onclick="close(mywindow)">Close</button>' + mywindow.document.body.innerHTML;
    mywindow.document.body.innerHTML = '<button type="button" onclick="print()">Print</button>' + mywindow.document.body.innerHTML;
    mywindow.document.body.appendChild(mywindow.document.body); */

    //let theDoc = mywindow.document,
    //theScript = theDoc.createElement('script');
    //mywindow.focus();

// (*) about:blank, loading hasn't started yet

//mywindow.onload = function() {
 // let html = `<div style="font-size:30px">Welcome!</div>`;
 // let v = '<button type="button" onclick="print()">Print</button>';
 // mywindow.document.body.insertAdjacentHTML('afterbegin', v);
//};
/* function injectThis() {

    alert(document.body.innerHTML);
}
theScript.innerHTML = 'window.onload = ' + injectThis.toString() + ';';
theDoc.body.appendChild(theScript); */

//return ' ';
    let urlTarget = 'http://jasperadmin:jasperadmin@10.113.113.64:8080/jasperserver/rest_v2/reports/prjAccident/' + reportname + '.' + this.format + '?p=' + this.idaccident;
    return urlTarget;

   /*  this.printreportService.print(reportname, this.format, this.idaccident).
    subscribe(
      data => {
          console.log('Success: ', data);
      },
      error => {
          console.log('Error: ', error);
      }); */

   // return this.urlPrint + reportname + '.pdf?p=' + this.idaccident;
    //'?reportname=' + reportname + '&&p=' + this.idaccident;
  }

  changeFormat(event) {
    if (event.checked) {
      this.format = 'html';
    } else {
      this.format = 'pdf';
    }
  }

  addPrintBtn() {
      document.body.innerHTML = '<button type="button" onclick="myFunction1()">Try it</button>' + document.body.innerHTML;
  }

}
