import { Users } from 'shared/table/table';
import { Vwuserauthorizationmodule } from 'shared/table/table';
import { DataService } from './data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { BadInput } from '../../core/component/common/bad-input';
import { NotFoundError } from '../../core/component/common/not-found-error';
import { AppError } from '../../core/component/common/app-error';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import * as _ from 'lodash';


const urlService = environment.urlService;


@Injectable()
export class LogonService {
  // url = urlService + '/users';
  url = urlService + '/vwuserauthorizationmodule';
  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    /* super(urlService + '/users/logon', http); */
  }

  logon(listParam: any) {
    let query: String = '';
    let op: String = '?';
    for (const param in listParam) {
      if (listParam.hasOwnProperty(param)) {
        query += op + param + '=' + listParam[param];
        op = op === '?' ? '&&' : '&&';
      }
    }
    return this.http.post<Users>(this.url + '/logon' + query, { headers: this.headers }).
      map(response => {
        const result = JSON.stringify(response);
        console.log('refsult = ' + result);
        if (response != null) {
          localStorage.setItem('token', result);
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  logOut() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    } else {
      return true;
    }
  }

  checkPassword(password) {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    } else {
      return (JSON.parse(token))['password'] === password;
    }
  }

  getValueFrom(name) {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    } else {
      let session = JSON.parse(token);
      if (session.hasOwnProperty(name)) {
        return (session)[name];
      } else return null;
    }
  }

  updatePassword(newpassword) {
    const token = localStorage.getItem('token');
    let user: Users;
    if (!token) {
      return null;
    } else {
      user = <Users>(JSON.parse(token));
      user.password = newpassword;
      user.lastuser = user.username;
    }
    return this.http.put<Users>(this.url + '/' + user.id, user, { headers: this.headers })
      .map(response => {
        localStorage.removeItem('token');
        return true;
      })
      .catch(this.handleError);
  }

  private handleError(error) {
    if (error.status === 400) {
      return Observable.throw(new BadInput(error.json()));
    }

    if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }

    return Observable.throw(new AppError(error));
  }

}
