import { SiteService } from 'shared/services/site.service';
import { Component, OnInit, Input } from '@angular/core';
import { Detailopscard, Work } from 'shared/table/table';
import { DetailopscardService } from 'shared/services/detailopscard.service';
import { WorkService } from 'shared/services/work.service';

@Component({
  selector: 'app-detailopscard',
  templateUrl: './detailopscard.component.html',
  styleUrls: ['./detailopscard.component.css']
})
export class DetailopscardComponent implements OnInit {

  @Input() idopscard: number;
  detailopscard: Detailopscard;

  sites: Site[];
  works: Work[];


  constructor(private service: DetailopscardService, private siteService: SiteService, private workService: WorkService) { }

  ngOnInit() {
    this.loadData();
    this.loadSite();
    this.loadWork();
  }

  loadData() {
    this.service.getItem(this.idopscard).
    subscribe(detailopscard => {
      this.detailopscard = detailopscard;
      console.log('onChangeDate(item, $event) = ' + JSON.stringify(detailopscard));
    });
  }

  loadSite() {
    this.siteService.getAll().
    subscribe(sites => {
      this.sites = sites;
    });
 }

 loadWork() {
  this.workService.getAll().
  subscribe(works => {
    this.works = works;
  });
}

onChangeSiteOfdetailopscard(item: Detailopscard, field: string, event) {
  console.log(event);
/*
  if ('_displayname' in event) {
    console.log('123');
    const v = event._displayname; */
    this.detailopscard[field] = <Site> event;
    this.detailopscard[field]._displayname = this.displayNameSite(event, ['name']);
/*     } else {
    item[field] = event;
  } */
  console.log('------- = ' + JSON.stringify(item[field]));
}


onChangeWorkOfdetailopscard(item: Detailopscard, field: string, event) {
  console.log(event);
/*
  if ('_displayname' in event) {
    console.log('123');
    const v = event._displayname; */
    this.detailopscard[field] = <Work> event;
    this.detailopscard[field]._displayname = this.displayNameWork(event, ['name']);
/*     } else {
    item[field] = event;
  } */
  console.log('------- = ' + JSON.stringify(item[field]));
}


displayNameSite(item: any, args: string[]): string {
  let result = '';
  if (item !== null) {
    if (args.length > 0) {
      result = item[args[0]];
    }
  }
  return result;
}

displayNameWork(item: any, args: string[]): string {
  let result = '';
  if (item !== null) {
    if (args.length > 0) {
      result = item[args[0]];
    }
  }
  return result;
}

updateDetailopscard(detailopscard) {
  this.service.updatebyid(this.detailopscard, 'idopscard')
  .subscribe(updateopscard => {
    this.loadData();
    this.loadSite();
    this.loadWork();
  });
}

hideNewDialoge() {

}

}
