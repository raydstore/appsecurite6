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


@Injectable()
export class DataService<T> {
    headers = new HttpHeaders();

    constructor(private url, private http: HttpClient) {
        this.headers.append('Content-Type', 'application/json');
     }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.url)
            .catch(this.handleError);
    }

    getItem(id): Observable<T> {
        // return this.getAll()
        console.log(this.url + '/' + id);
        return this.http.get<T>(this.url + '/' + id)
          //     .map(data => _.values(data))
       // .map(items => items.find(item => item.id === id))
            .catch(this.handleError);
    }

    getByQueryParam(listParam: any): Observable<T[]> {
        let query: String = '';
        let op: String = '?';
        for (let param in listParam) {
        query += op + param + '=' + listParam[param];
            op = op === '?' ? '&&' : '&&';
        }
        return this.http.get<T[]>(this.url + query)
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

    create(resource) {
        return this.http.post(this.url, resource, { headers: this.headers })
            .catch(this.handleError);
    }

    update(resource) {
        return this.http.put(this.url + '/' + resource.id, resource, { headers: this.headers })
            .catch(this.handleError);
    }

    updatebyid(resource, id) {
        return this.http.put(this.url + '/' + resource['' + id + ''], resource, { headers: this.headers })
            .catch(this.handleError);
    }

    delete(id) {
        return this.http.delete(this.url + '/' + id, {headers: this.headers})
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
