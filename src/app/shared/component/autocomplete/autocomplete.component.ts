import { TFunctionName } from 'shared/table/table';
import { DataService } from 'shared/services/data.service';
import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { isUndefined, isNullOrUndefined } from 'util';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})

export class AutocompleteComponent implements OnInit, AfterViewChecked {
  /* private _i_item: any; */
  @Input() i_item: any;
  @Input() service: any;
  @Input() functionName: TFunctionName;
  @Input() args: string[];
  @Output() changeItem = new EventEmitter();

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
  item: IItem = {
    item: null,
    name: ''
  };
  filteredList: IItem[];

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

  ngOnInit() {
    // console.log('entred = ');
    this.item.item = this.i_item;
    this.item.name = this.functionName(this.item.item, this.args);
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
    console.log(event);
    this.changeItem.emit(event);
  }



  filterItem(event) {
    console.log('filter');
    let query = event.query;
    this.filteredList = this.filter(query, this.service);
    /* this.service.getAll().subscribe(items => {
      this.filteredList = this.filter(query, items);
    }); */
  }


  filter<T>(query, items: T[] = this.service): IItem[] {
    console.log('filtered');
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
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
  }

  onClear() {
    //
  }
}


interface IItem {
  item: any;
  name: string;
}
