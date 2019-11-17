import { ComponentTarget } from 'shared/table/table';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const urlService = environment.urlService;

@Injectable()
export class PrintService {
  private _componentToPrintSource = new Subject<ComponentTarget>();
  componentToPrint$ = this._componentToPrintSource.asObservable();

  constructor() { }
  sendTargetToPrint(componentTarget: ComponentTarget) {
    this._componentToPrintSource.next(componentTarget);
  }

}
