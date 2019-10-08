import { BadInput } from '../../core/component/common/bad-input';
import { NotFoundError } from '../../core/component/common/not-found-error';
import { AppError } from '../../core/component/common/app-error';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import * as _ from 'lodash';
import { Users } from 'shared/table/table';


@Injectable()
export class DataService<T> {
    headers = new HttpHeaders();

    constructor(private url, private http: HttpClient) {
        this.headers.append('Content-Type', 'application/json');
     }

    getUsername(): string {
      let result = 'sys';
      const _user = localStorage.getItem('token');
      if (_user) {
        result = (JSON.parse(_user))['username'];
      }
      return result;
    }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.url, { headers: this.headers })
            .catch(this.handleError);
    }

    getItem(id): Observable<T> {
        // return this.getAll()
        console.log(this.url + '/' + id);
        return this.http.get<T>(this.url + '/' + id, { headers: this.headers })
          //     .map(data => _.values(data))
       // .map(items => items.find(item => item.id === id))
            .catch(this.handleError);
    }

    getPrimaryKey(id: string | any): string {
      let result;
      if (Object(id) !== id) {
        result = id;
      } else {
        result = 'id';
        for (const key in id) {
          if (id.hasOwnProperty(key)) {
            result = result + ';' + key + '=' + id[key];
          }
        }
      }
      return result;
    }

    getByQueryParam(listParam: any): Observable<T[]> {
        let query: String = '';
        let op: String = '?';
        for (const param in listParam) {
        query += op + param + '=' + listParam[param];
            op = op === '?' ? '&&' : '&&';
        }
        return this.http.get<T[]>(this.url + query, { headers: this.headers })
            .catch(this.handleError);
    }

    print(): Observable<any> {
        // return this.getAll()
      //  console.log(this.url + '/' + id);
        return this.http.get<any>(this.url)
          //     .map(data => _.values(data))
       // .map(items => items.find(item => item.id === id))
            .catch(this.handleError);
    }

    create(resource): Observable<T> {
        if (resource.hasOwnProperty('owner')) {
          resource.owner = this.getUsername();
        };
        return this.http.post<T>(this.url, resource, { headers: this.headers })
            .catch(this.handleError);
    }

    update(resource): Observable<T> {
       if (resource.hasOwnProperty('lastuser')) {
          resource.lastuser = this.getUsername();
       };
       return this.http.put<T>(this.url + '/' + resource.id, resource, { headers: this.headers })
            .catch(this.handleError);
    }

    updatebyid(resource, id): Observable<T> {
        if (resource.hasOwnProperty('lastuser')) {
          resource.lastuser = this.getUsername();
        };
        return this.http.put<T>(this.url + '/' + resource['' + id + ''], resource, { headers: this.headers })
            .catch(this.handleError);
    }

    delete(id): Observable<T> {
        return this.http.delete<T>(this.url + '/' + this.getPrimaryKey(id), {headers: this.headers})
            .catch(this.handleError);
    }

    /* deleteComplex(id): Observable<T> {
      return this.http.delete<T>(this.url + '/' + this.getPrimaryKey(id), {headers: this.headers})
          .catch(this.handleError);
    } */

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
