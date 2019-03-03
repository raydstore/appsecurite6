import { Actionaccident } from 'shared/table/table';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const urlService = environment.urlService;

@Injectable()
export class ActionaccidentService extends DataService<Actionaccident> {
  constructor(http: HttpClient) {
    super(urlService + '/actionaccident', http);
  }
}
