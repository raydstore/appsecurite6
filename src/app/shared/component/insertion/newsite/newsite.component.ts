import { AutoCompleteModule } from 'primeng/autocomplete';
import { Site, Label } from 'shared/table/table';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  selector: 'app-newsite',
  templateUrl: './newsite.component.html',
  styleUrls: ['./newsite.component.css']
})
export class NewsiteComponent implements OnInit {

  @Input() newSite: Site;
  @Input() dialogVisible: boolean;
  @Input() sites: Site [];
  @Input() labels: Label [];
  @Output() createItem = new EventEmitter();
  @Output() hide = new EventEmitter();
  


  constructor() { }

  ngOnInit() {
  }

  hideNewDialoge() {
    // this.dialogVisible = false;
    this.hide.emit(false);
  }

  displayName(item: any, args: string[]): string {
    console.log('enter displayname = ' + JSON.stringify(item));
    let result = '';
    if (item !== null) {
      if (args.length > 0) {
        result = item[args[0]];
      }
    }
    return result;
  }

  
  onChangeItem(item: Site, field: string, event) {
    console.log('enter on change site = ' + JSON.stringify(item));
    console.log('enter on change site event = ' + JSON.stringify(event));
    item[field] = <Site>event;
  }

  onChangeItemLabel(item: Label, field: string, event) {
    console.log('enter on change label = ' + JSON.stringify(item));
    item[field] = <Label>event;
  }

  create(event) {
    console.log('ns = ' + JSON.stringify(this.newSite));
    this.createItem.emit(this.newSite);
  }

  hideDialog(event) {
    
  }

  onHide() {
    this.hide.emit(false);
  }



}
