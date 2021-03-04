import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BadInput } from '../../core/component/common/bad-input';
import { NotFoundError } from '../../core/component/common/not-found-error';
import { AppError } from '../../core/component/common/app-error';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import * as _ from 'lodash';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin':'*',
    'Authorization': 'Basic amFzcGVyYWRtaW46amFzcGVyYWRtaW4='
    /*  + btoa('jasperadmin:jasperadmin') */
  }), withCredentials:
  true
}

@Injectable()
export class PrintreportService {

  baseurl = 'http://10.113.113.64:8080/jasperserver/rest_v2/reports/prjAccident/';
  username = 'jasperadmin';
  password = 'jasperadmin';
  authorizationData = 'Basic ' + btoa(this.username + ':' + this.password);
  // headers = new HttpHeaders();


  constructor(private http: HttpClient) {

  }

  print(reportname, format, param): Observable<any> {
  /*   print(reportname, format, param): void { */
    const url = this.baseurl + reportname + '.' + format + '?p=' + param;
    /* var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "http://10.113.113.64:8080/jasperserver/rest_v2/reports/prjAccident/rptRapportAccident.html?p=200416080003");
xhr.setRequestHeader("Authorization", "Basic amFzcGVyYWRtaW46amFzcGVyYWRtaW4=");


xhr.send(); */

   /*  var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic amFzcGVyYWRtaW46amFzcGVyYWRtaW4=");
    myHeaders.append("Cookie", "userLocale=fr_FR; JSESSIONID=595625A286A3D31C653A332446B040DA");

    var requestOptions :  RequestInit;
    requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(url, requestOptions)
    fetch("http://10.113.113.64:8080/jasperserver/rest_v2/reports/prjAccident/rptRapportAccident.html?p=200416080003", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
 */

    return this.http.get(url, httpOptions)
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
