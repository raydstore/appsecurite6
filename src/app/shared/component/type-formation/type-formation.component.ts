import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-type-formation',
  templateUrl: './type-formation.component.html',
  styleUrls: ['./type-formation.component.css']
})
export class TypeFormationComponent implements OnInit {
  dialogVisible: boolean;
  constructor() { }

  ngOnInit() {
  }

  loadData() {

  }

  createItem(event) {
    /* close Dialog */
    this.dialogVisible = false;
    /* refresh data */
    if (!event.cancelDialog) {
    //  console.log('site inserted is = ' + JSON.stringify(event.newSite))
      this.loadData();
    }
  }

}
