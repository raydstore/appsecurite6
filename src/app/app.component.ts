import { Component } from '@angular/core';
import { LogonService } from 'shared/services/logon.service';
import { Store } from '@ngrx/store';
import { StoreInterface } from './store/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor (private logonService: LogonService) {
  }
}
