import { Operation } from 'shared/table/table';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

const urlService = environment.urlService;

@Injectable()
export class PrintService extends DataService<any> {
  constructor(http: HttpClient) {
    super(urlService + '/printCommande', http);
  }

}
