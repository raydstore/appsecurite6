import { DataService } from 'shared/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Typeaccident } from 'shared/table/table';

const urlService = environment.urlService;

@Injectable()
export class TypeaccidentService  extends DataService<Typeaccident> {
  constructor(http: HttpClient) {
      super(urlService + '/typeaccident', http);
  }
}
