import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Jobposting } from 'shared/table/table';

const urlService = environment.urlService;

@Injectable()
export class JobpostingService extends DataService<Jobposting> {
  constructor(http: HttpClient) {
    super(urlService + '/jobposting', http);
  }

}
