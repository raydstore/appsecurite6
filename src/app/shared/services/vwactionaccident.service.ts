import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { VwactionAccident } from 'shared/table/table';

const urlService = environment.urlService;

@Injectable()
export class VwactionaccidentService extends DataService<VwactionAccident> {
  constructor(http: HttpClient) {
    super(urlService + '/vwactionaccident', http);
  }
}
