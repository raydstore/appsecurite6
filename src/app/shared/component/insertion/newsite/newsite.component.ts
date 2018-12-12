import { LabelService } from 'shared/services/label.service';
import { BadInput } from './../../../../core/component/common/bad-input';
import { AppError } from './../../../../core/component/common/app-error';
import { SiteService } from 'shared/services/site.service';
import { Site, Label } from 'shared/table/table';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';

@Component({
  selector: 'app-newsite',
  templateUrl: './newsite.component.html',
  styleUrls: ['./newsite.component.css']
})
export class NewsiteComponent implements OnInit, OnChanges {

 /*  @Input() newSite: Site; */
  @Input() dialogVisible: boolean;
  @Output() closeDialog = new EventEmitter();
  /* @Output() createItem = new EventEmitter();
  @Output() hide = new EventEmitter(); */

  sites: Site [];
  labels: Label [];

  _newSite: Site = {
    datecreate: new Date(),
    dateupdate: new Date(),
    id: 0,
    name: '',
    idparent: null,
    idlabel: null,
    lastuser: 'ali',
    owner: 'ali'
  };
  newSite: Site;

  constructor(private service: SiteService, private labelService: LabelService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.newSite = Object.assign({}, this._newSite);
    this.loadData();
  }

  loadData() {
    this.service.getAll().subscribe(
      sites => {
        this.sites = sites;
      }
    );
    this.labelService.getAll()
      .subscribe(labels => {
        this.labels = labels;
      }
    );
  }

  create() {
    const nsite = Object.assign({}, this.newSite);
    this.newSite = Object.assign({}, this._newSite);
    this.service.create(nsite)
      .subscribe(newSite => {
        this.closeDialog.emit({newSite: nsite, cancelDialog: false});
      }, (error: AppError) => {
        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
          throw error;
        }
      });
  }

  hideNewDialoge() {
    this.closeDialog.emit({newSite: null, cancelDialog: true});
  }

  displayName(item: any, args: string[]): string {
    let result = '';
    if (item !== null) {
      if (args.length > 0) {
        result = item[args[0]];
      }
    }
    return result;
  }

  setIdSiteParentToSite(item: Site, field: string, event) {
    item[field] = <Site>event;
  }

  setIdLabelToSite(item: Site, field: string, event) {
    item[field] = <Label>event;
  }

  /* when dialog is close with X button */
  onHide() {
    this.closeDialog.emit({newSite: null, cancelDialog: true});
  }

}
