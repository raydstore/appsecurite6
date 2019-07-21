import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Vwactionopscard } from 'shared/table/table';

const urlService = environment.urlService;

@Injectable()
export class VwactionopscardService  extends DataService<Vwactionopscard> {
  constructor(http: HttpClient) {
    super(urlService + '/vwactionopscard', http);
  }
}
