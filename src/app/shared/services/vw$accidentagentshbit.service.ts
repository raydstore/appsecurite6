import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const urlService = environment.urlService;

@Injectable()
export class Vw$accidentagentshbitService extends DataService<any> {
  constructor(http: HttpClient) {
    super(urlService + '/vwaccidentagentshbit', http);
  }

}
