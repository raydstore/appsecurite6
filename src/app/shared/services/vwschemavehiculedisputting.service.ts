
import { Vwschemavehiculedisputting } from 'shared/table/table';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const urlService = environment.urlService;

@Injectable()

export class VwschemavehiculedisputtingService   extends DataService<Vwschemavehiculedisputting> {

  constructor(http: HttpClient) {
    super(urlService + '/vwschemavehiculedisputting', http);
  }

}