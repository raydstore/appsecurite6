import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()

export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(credentials) {
   return this.http.post('/api/authenticate', JSON.stringify(credentials))
      .map(response => {
        const result = response; // = response.json();
        if (result && result['token']) {
          localStorage.setItem('token', result['token']);
          return true;
        }
        return false;
      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return false;
  }
}
