import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserInfo } from './../../../shared/table/table';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin = false;

  constructor(private router: Router, private authService: AuthService) { }

  signeIn(credentials) {
   /*  this.authService.login(credentials)
    .subscribe(result => {
       if (result) {
         this.router.navigate(['/']);
       } else {
         this.invalidLogin = true;
       }
    }); */
    UserInfo.name = credentials.name;
  }

  ngOnInit() {
  }

}
