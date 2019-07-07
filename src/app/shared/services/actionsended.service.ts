import { Actionsended } from 'shared/table/table';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const urlService = environment.urlService;

@Injectable()
export class ActionsendedService extends DataService<Actionsended> {
  constructor(http: HttpClient) {
    super(urlService + '/actionsended', http);
  }

}
