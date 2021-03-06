import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const urlService = environment.urlService;

@Injectable()
export class PostService extends DataService<any> {
   constructor(http: HttpClient) {
     super(urlService + '/posts', http);
   }

  }
