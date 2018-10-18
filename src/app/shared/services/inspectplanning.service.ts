import { InspectPlanning } from './../table/table';
import { Grid } from 'shared/table/table';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const urlService = environment.urlService;

@Injectable({
  providedIn: 'root'
})
export class InspectplanningService extends DataService<InspectPlanning> {
  constructor(http: HttpClient) {
    super(urlService + '/inspectplanning', http);
  }
}
