import { Actionopscard } from 'shared/table/table';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const urlService = environment.urlService;

@Injectable()
export class ActionopscardService  extends DataService<Actionopscard> {
  constructor(http: HttpClient) {
    super(urlService + '/actionopscard', http);
  }
}
