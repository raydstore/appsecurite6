import { Vwuserauthorizationmodule } from 'shared/table/table';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const urlService = environment.urlService;

@Injectable()
export class VwuserauthorizationmoduleService  extends DataService<Vwuserauthorizationmodule> {
  constructor(http: HttpClient) {
    super(urlService + '/vwuserauthorizationmodule', http);
  }
}
