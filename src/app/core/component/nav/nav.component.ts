import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LogonService } from 'shared/services/logon.service';
import { Users } from 'shared/table/table';
import { AccidentComponent } from 'app/accident/component/accident/accident.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userInfo: Users;
  activeChangePassword: boolean = false;
  oldPassword = '';
  firstPassword = '';
  secondPassword = '';
  labelChangePassword: string = 'Changer mot de passe';
  /* @ViewChild(AccidentComponent, { static: false }) accidentComponentRef: AccidentComponent; */
  idaccident;

  constructor(private authservise: AuthService, private logonService: LogonService) { }

  ngOnInit() {
    this.init();
  }

 /*  ngAfterViewInit() {
    this.idaccident = this.accidentComponentRef.selectedAccident.id;
    console.log('idacc = ' + this.idaccident);
  }
 */

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

  initPassword() {
    this.oldPassword    = '';
    this.firstPassword  = '';
    this.secondPassword = '';
  }

  init() {
    this.initPassword();
    this.activeChangePassword = false;
    this.labelChangePassword = 'Changer mot de passe';

  }

  passwordSetting() {
    if (this.activeChangePassword) {
       this.initPassword();
       this.labelChangePassword = 'Changer mot de passe';

    } else {
      this.labelChangePassword = 'Annuler';
    }
    this.activeChangePassword = !this.activeChangePassword;
  }

  updatePassword() {
    this.logonService.updatePassword(this.firstPassword)
       .subscribe(() => {
        this.init();
       });
  }

  checkPassword(password) {
    return this.logonService.checkPassword(password);
  }

  conditionChecked() {
    return !(this.checkPassword(this.oldPassword) && this.firstPassword !== '' && this.secondPassword !== '' &&
           this.firstPassword === this.secondPassword);
  }

}
