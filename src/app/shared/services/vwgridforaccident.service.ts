import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { VwGridForAccident } from 'shared/table/table';

const urlService = environment.urlService;

@Injectable({
  providedIn: 'root'
})
export class VwgridforaccidentService extends DataService<VwGridForAccident> {
  constructor(http: HttpClient) {
    super(urlService + '/vwgridforaccident', http);
  }
}
