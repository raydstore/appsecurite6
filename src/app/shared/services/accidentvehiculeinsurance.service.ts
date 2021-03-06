import { Accidentvehiculeinsurance } from './../table/table';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const urlService = environment.urlService;

@Injectable()
export class AccidentvehiculeinsuranceService extends DataService<Accidentvehiculeinsurance> {
  constructor(http: HttpClient) {
    super(urlService + '/accidentvehiculeinsurance', http);
  }
}
