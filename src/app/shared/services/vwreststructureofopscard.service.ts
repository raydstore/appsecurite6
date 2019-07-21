
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { environment } from '../../../environments/environment';
import { Vwreststructureofopscard } from 'shared/table/table';

const urlService = environment.urlService;

@Injectable()
export class VwreststructureofopscardService  extends DataService<Vwreststructureofopscard> {
  constructor(http: HttpClient) {
    super(urlService + '/vwreststructureofopscard', http);
  }
}
