import { Agent } from './../../table/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TFunctionName } from 'shared/table/table';
import { DataService } from 'shared/services/data.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { isUndefined, isNullOrUndefined } from 'util';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AutocompleteComponent implements OnInit, OnChanges {
  @Input() i_item: any;
  @Input() service: any;
  @Input() functionName: TFunctionName;
  @Input() args: string[];
  @Output() changeItem = new EventEmitter();

  _dialog: String = '<app-activity></app-activity>';
  _displayname = '_displayname';
  item: any;

  displayValue: '';

  filteredList: any[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.displayValue = this.i_item != null ? this.functionName(this.i_item, this.args) : '';
    if (this.i_item != null) {
      const _item: any = Object.assign({}, this.i_item);
      if (!(typeof _item === 'string') && (Object.getOwnPropertyNames(_item).length > 1)) {
        if (!(_item.hasOwnProperty(this._displayname)) ? true : isUndefined(_item[this._displayname])) {
          _item[this._displayname] = this.functionName(this.i_item, this.args);
          this.i_item = Object.assign({}, _item);
        }
      }
      this.item = Object.assign({}, _item);
    }
  }

  public dsname(a: Agent): string {
    return a.firstname + ' ' + a.lastname;
  }

  ngOnInit() {
    if (typeof this.i_item === 'string') {
      this._displayname = this.args[0];
    }
    this.item = Object.assign({}, this.i_item);
  }

  getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }

  setProperty<T, K extends keyof T>(obj: T, key: K, value) {
    obj[key] = value;
  }

  onSelect(event) {
    this.changeItem.emit(event);
  }


  onKeyUp(event) {
    if (event.key === 'Enter') {
    } else {
    }
  }


  filterItem(event) {
    console.log('filter');
    const query = event.query;
    this.filteredList = this.filter(query, this.service);
  }

  clearValue() {
    this.filteredList = null;
  }


  filter<T>(query, items: T[] = this.service): T[] {
    const filtered: T[] = [];
    if (!isNullOrUndefined(items)) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const displayName = this.functionName(item, this.args);
        if (!(typeof this.item === 'string')) {
          if (!('_displayname' in item)) {
            item['_displayname'] = '';
          }
          item['_displayname'] = displayName;
        }
        if (displayName.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          filtered.push(item);
        }
      }
    }
    return filtered;
  }


  onClear(event) {
    this.filteredList = null;
    console.log('on clear = ');
    console.log('end clear');
  }
}


interface IItem {
  item: any;
  name: string;
}
