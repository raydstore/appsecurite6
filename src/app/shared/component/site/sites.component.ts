import { NotFoundError } from '../../../core/component/common/not-found-error';
/* import { Label } from './../../table/label'; */
import { LabelService } from 'shared/services/label.service';
import { AppError } from '../../../core/component/common/app-error';
import { BadInput } from '../../../core/component/common/bad-input';
/* import { Site } from './../../table/site'; */
import { SiteService } from 'shared/services/site.service';
import { TreeNode } from 'primeng/api';
import { PanelModule } from 'primeng/primeng';
import {OrganizationChartModule} from 'primeng/organizationchart';
import { Component, OnInit, ViewEncapsulation, Attribute } from '@angular/core';
import { DataGridModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';

import {Site} from 'shared/table/table';
import { LastidService } from 'shared/services/lastid.service';
import { InfoSite } from 'shared/component/dialog-modal/dialog-modal.component';

@Component({
  selector: 'app-site',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SitesComponent implements OnInit {
  sites: Site[] = [];
  selectedSite: Site;
  data: TreeNode[] = [];
  lastids: any[];
  lastid: any;
  titlelist = 'Site';
  cols: any[];
 /*  ltLabels: Label[] = [];
  labels: any[] = [{ label: 'Select Label', value: null }];
  selectedLabel: Label;
  display = false;
  nodec: TreeNode; */

  
  constructor(private service: SiteService, private lbService: LabelService, private lastidService: LastidService) {
  }

  ngOnInit() {
    this.loadData();
    this.cols = [
      { field: 'id',               header: 'id' },
      { field: 'name',             header: 'name' },
      { field: 'idlabel.name',     header: 'nature' },
      { field: 'idparent.name',    header: 'localisation' },
      { field: 'datecreate',       header: 'datecreate' },
      { field: 'dateupdate',       header: 'dateupdate' },
      { field: 'owner',            header: 'owner' },
      { field: 'lastuser',         header: 'lastuser' }
  ];
  }

  loadData() {
    this.service.getAll()
      .subscribe(sites => {
        this.sites = sites;
        this.buildSites();
      });
  }

  loadLastId() {
    this.lastidService.getAll()
      .subscribe(lastids => this.lastids = lastids);
  }

  getLastid(name) {
    let lts: any[];
    this.loadLastId();
    for (let lid of this.lastids) {
      if (lid.id === name) {
        return lid['count'];
      }
    }
    return 0;
  }


  getSiteRoot(): Site {
     for (let site of this.sites) {
      if (site.idparent == null) {
           return site;
         }
     }
  }

  getChilds(siteParent: Site, _expanded: boolean): TreeNode[] {
    let result: TreeNode[] = [];
    for (let site of this.sites) {
      if (site.idparent !== undefined) {
       if (site.idparent['id'] === siteParent['id']) {
        let value: any;
        let childs: TreeNode[] = this.getChilds(site, false);
         if (childs.length !== 0) {
         value = {
          label: site.name,
          type: 'branch',
          data: site,
          children: null,
          childs: childs,
          expanded: _expanded,
          styleClass: 'stparent'
        };
      } else {
           value = {
            label: site.name,
            type: 'sheet',
            data: site,
            expanded: false,
            styleClass: 'stchild'
          };
      }
        result.push(value);
       }
      }
     }
     return result;
  }

  buildSites() {
     let siteRoot = this.getSiteRoot();
      let value: any = {
       label: siteRoot.name,
       type: 'branch',
       data: siteRoot,
       children: this.getChilds(siteRoot, false),
       expanded: true,
       partialSelected: true,
       styleClass: 'stparent'
     };
     this.data.push(value);
  }

  newSite(infoSite: InfoSite) {
    let siteChild = {
      id: 0,
      name: infoSite.name,
      idlabel: infoSite.label,
      idparent: infoSite.node.data,
      datecreate: new Date(),
      dateupdate: new Date(),
      owner: 'ali',
      lastuser: 'ali'
    };
    let nd: TreeNode = {
      label: infoSite.name,
      type: 'sheet',
      data: siteChild,
      styleClass: 'stchild'
    };
    if (!('children' in infoSite.node)) {
      infoSite.node.children = [];
      infoSite.node.type = 'branch';
      infoSite.node.styleClass = 'stparent';
    }
    infoSite.node.children.splice(0, 0, nd);
    this.service.create(siteChild)
        .subscribe(nd => {
          this.data = [];
          this.sites = [];
          this.loadData();
      }, (error: AppError) => {
        infoSite.node.children.splice(0, 1);

        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
          throw error;
        }
      });
  }

  deleteSite(node: TreeNode) {
    let index = this.sites.indexOf(node.data);
    this.sites.splice(index, 1);
    this.service.delete((<Site> node.data).id)
      .subscribe(
      () => { this.loadData(); },
      (error: Response) => {
        this.sites.splice(index, 0, node.data);
        if (error instanceof NotFoundError) {
          alert('se site est deja supprimer !');
        } else {
          throw error;
        }
      }
      );
  }

  expandChilds(node: TreeNode) {
    node.children = node['childs'];
    node.expanded = true;
    console.log('sites = ' + JSON.stringify(this.sites));
  }


  showNewDialoge() {

  }

  updateSite(item, name) {

  }

  cancelUpdate() {

  }


}
