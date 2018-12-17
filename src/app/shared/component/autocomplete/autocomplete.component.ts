import { Agent } from './../../table/table';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TFunctionName } from 'shared/table/table';
import { DataService } from 'shared/services/data.service';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked, ViewEncapsulation, OnChanges, ViewChild } from '@angular/core';
import { isUndefined, isNullOrUndefined } from 'util';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})

export class AutocompleteComponent implements OnInit, AfterViewChecked, OnChanges {
  /* private _i_item: any; */
  @Input() i_item: any;
  @Input() service: any;
  @Input() functionName: TFunctionName;
  @Input() args: string[];
  @Output() changeItem = new EventEmitter();

  _dialog: String = '<app-activity></app-activity>';
  _displayname = '_displayname';

  displayValue: '';
  //  @ViewChild('autocomplete') ac: AutoCompleteModule;


  /* get i_item() {
    return this._i_item;
  }
  @Input()
  set i_item(value: any) {
    console.log('i_item = ' + JSON.stringify(value));
    this._i_item = value;
    this.item.item = this._i_item;
    if (!isNullOrUndefined(value)) {
        this.item.name = this.functionName(this.item.item, this.args);
    } else {
      this.item.name = '';
    }
  } */
  /* _item: IItem = {
    item: null,
    name: ''
  };
  item: IItem = {
    item: null,
    name: ''
  }; */
  filteredList: any[];

  constructor() { }

  ngAfterViewChecked() {
    /*  console.log('entred = ');
     this.item.item = this.i_item;
     this.item.name = this.functionName(this.item.item, this.args); */
    /* if (!(isNullOrUndefined(this.item))) { 
      this.item.name = this.functionName(this.item.item, this.args);
    } else {
      this.item.name = '';
    } */
  }

  ngOnChanges() {
    this.displayValue = this.i_item != null ? this.functionName(this.i_item, this.args) : '';
    console.log('on change = ' + typeof this.i_item);
    if (this.i_item != null) {
      if (!(typeof this.i_item === 'string')) {
      if (!(this._displayname in this.i_item)) {
        this.i_item[this._displayname] = this.functionName(this.i_item, this.args);
      }
    } else {
      this._displayname = this.args[0];
    }
    }
    /*     console.log('enter ngOnchange = ' + JSON.stringify(this.item)) */
    //  this.item.item = this.i_item;
    /*    this.item.name = this.functionName(this.item.item, this.args);
       this.item = null; */
    // this.onClear(null);
    // this.ac.el.nativeElement.onsearch = (event) => {
    // handling model reset
    // };
  }

  public dsname(a: Agent): string {
    return a.firstname + ' ' + a.lastname;
  }

  ngOnInit() {
    // console.log('entred = ');
    // this.item = Object.assign({}, this._item);
    /*   this.item.item = this.i_item;
      this.item.name = this.functionName(this.item.item, this.args); */
  }

  /* set I_item(value: any) {
    this.item.item = this.i_item;
    this.item.name = this.functionName(this.item.item, this.args);
  }
 */
  getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
  }

  setProperty<T, K extends keyof T>(obj: T, key: K, value) {
    obj[key] = value;
  }

  onSelect(event) {
    console.log('b on select');
    console.log(event);
    
    if (event != null) {
      if ('_displayname' in event) {
        delete event._displayname;
      }
    }
    console.log('a on select');
    console.log(event);
    this.changeItem.emit(event);
  }


  onKeyUp(event) {
    if (event.key === 'Enter') {
      console.log('is entred = ');
      console.log(event);
      console.log('---entred----');
      console.log(event.target.value);
    } else {
      console.log('is not entred');
      console.log(event);
      console.log('-----is not entred------');
    }
  }


  filterItem(event) {
    console.log('filter');
    const query = event.query;
    this.filteredList = this.filter(query, this.service);
    /* this.service.getAll().subscribe(items => {
      this.filteredList = this.filter(query, items);
    }); */
  }

  clearValue() {
    this.filteredList = null;
  }


  filter<T>(query, items: T[] = this.service): T[] {
    console.log('filtered');
    const filtered: T[] = [];
    if (!isNullOrUndefined(items)) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        console.log('item = ' + JSON.stringify(item));
        const displayName = this.functionName(item, this.args);
        console.log('displayName = ' + displayName);
        if (displayName.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          /* let item: T = {
            item: item,
            name: displayName
          }; */
         /*  if (!(typeof this.i_item === 'string')) {
            if (!(this._displayname in this.i_item)) {
              this.i_item[this._displayname] = '';
            }
          } else {
            this._displayname = this.args[0];
          } */
          /* if (!('_displayname' in item)) {
            item['_displayname'] = '';
          }
          item['_displayname'] = displayName; */
          filtered.push(item);
        }
      }
    }
    return filtered;
  }

  /*  filter<T>(query, items: T[] = this.service): IItem[] {
     console.log('filtered');
     let filtered: IItem[] = [];
     if (!isNullOrUndefined(items)) {
       for (let i = 0; i < items.length; i++) {
         let item = items[i];
         let displayName = this.functionName(item, this.args);
         if (displayName.toLowerCase().indexOf(query.toLowerCase()) === 0) {
           let iitem: IItem = {
             item: item,
             name: displayName
           };
           filtered.push(iitem);
         }
       }
     }
     return filtered;
   } */

  onClear(event) {
    this.filteredList = null;
    console.log('on clear = ');
    // console.log(event);
    console.log('end clear');
  }
}


interface IItem {
  item: any;
  name: string;
}
