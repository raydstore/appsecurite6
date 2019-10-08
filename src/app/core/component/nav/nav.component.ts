import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { LogonService } from 'shared/services/logon.service';
import { Users } from 'shared/table/table';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userInfo: Users;

  constructor(private authservise: AuthService, private logonService: LogonService) { }

  ngOnInit() {
  }

  logOut() {
    this.logonService.logOut();
  }

  isLoggedIn() {
    const result = this.logonService.isLoggedIn();
    if (result) {
      const _user = localStorage.getItem('token');
      if (_user) {
        this.userInfo = <Users> JSON.parse(_user);
      }

    }
    return result;
  }

}
