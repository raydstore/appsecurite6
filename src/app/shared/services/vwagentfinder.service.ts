import { Vwagentfinder } from 'shared/table/table';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const urlService = environment.urlService;

@Injectable()
export class VwagentfinderService extends DataService<Vwagentfinder> {
  constructor(http: HttpClient) {
    super(urlService + '/vwagentfinder', http);
  }
}