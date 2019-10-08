// import { AuthService } from '../../../shared/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogonService } from 'shared/services/logon.service';


@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.css']
})
export class LogonComponent {

  invalidLogin = false;
  username: '';
  password: '';

  constructor(
    private router: Router,
    private logonService: LogonService
    // private authService: AuthService
    ) { }

    singIn() {
      this.logonService.logon({'username': this.username, 'password': this.password}).
      subscribe(result => {
        if (result) {
          this.router.navigate(['/home']);
        } else {
          this.invalidLogin = true;
        }
      });
    }

  /* signIn(credentials) {
    this.authService.login(credentials)
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/']);
        } else {
          this.invalidLogin = true;
        }
      });
  } */

}
