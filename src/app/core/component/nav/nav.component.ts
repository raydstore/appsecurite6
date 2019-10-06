import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserInfo } from './../../../shared/table/table';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  username = UserInfo.name;

  constructor(private authservise: AuthService) { }

  ngOnInit() {
  }

  logOut() {
    this.authservise.logout();
  }

}
