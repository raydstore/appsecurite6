import { InfoSite } from './../../table/table';
import { NotFoundError } from '../../../core/component/common/not-found-error';
import { LabelService } from 'shared/services/label.service';
import { AppError } from '../../../core/component/common/app-error';
import { BadInput } from '../../../core/component/common/bad-input';
import { SiteService } from 'shared/services/site.service';
import { TreeNode } from 'primeng/api';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Site, Label } from 'shared/table/table';


@Component({
  selector: 'app-site',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SitesComponent implements OnInit {
  sites: Site[] = [];
  labels: Label[] = [];
  selectedSite: Site;
  data: TreeNode[] = [];
  lastids: any[];
  lastid: any;
  titlelist = 'Site';
  cols: any[];
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

  dialogVisible = false;
  newMode = false;
  /*  ltLabels: Label[] = [];
   labels: any[] = [{ label: 'Select Label', value: null }];
   selectedLabel: Label;
   display = false;
   nodec: TreeNode; */


  constructor(private service: SiteService, private labelService: LabelService) {
  }

  ngOnInit() {
    this.newSite = Object.assign({}, this._newSite);
    this.loadData();
    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'name', header: 'name' },
      { field: 'idlabel.name', header: 'nature' },
      { field: 'idparent', header: 'localisation' },
      { field: 'datecreate', header: 'datecreate' },
      { field: 'dateupdate', header: 'dateupdate' },
      { field: 'owner', header: 'owner' },
      { field: 'lastuser', header: 'lastuser' }
    ];
  }

  loadData() {
    this.service.getAll()
      .subscribe(sites => {
        this.sites = sites;
        /* this.buildSites(); */
      });
  }


  getSiteRoot(): Site {
    for (const site of this.sites) {
      if (site.idparent == null) {
        return site;
      }
    }
  }

  getChilds(siteParent: Site, _expanded: boolean): TreeNode[] {
    const result: TreeNode[] = [];
    for (const site of this.sites) {
      if (site.idparent !== undefined) {
        if (site.idparent['id'] === siteParent['id']) {
          let value: any;
          const childs: TreeNode[] = this.getChilds(site, false);
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
    const siteRoot = this.getSiteRoot();
    const value: any = {
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

  newSiteNode(infoSite: InfoSite) {
    const siteChild = {
      id: 0,
      name: infoSite.name,
      idlabel: infoSite.label,
      idparent: infoSite.node.data,
      datecreate: new Date(),
      dateupdate: new Date(),
      owner: 'ali',
      lastuser: 'ali'
    };
    const nd: TreeNode = {
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

  createSite(event) {
    /* close Dialog */
    this.dialogVisible = false;
    /* refresh data */
    if (!event.cancelDialog) {
      console.log('site inserted is = ' + JSON.stringify(event.newSite))
      this.loadData();
    }
  }

  setIdSiteParentToSite(item: Site, field: string, event) {
    item[field] = <Site>event;
  }

  setIdLabelToSite(item: Site, field: string, event) {
    item[field] = <Label>event;
  }

  /*
  const nsite = Object.assign({}, <Site>event);
      this.newSite = Object.assign({}, this._newSite);
      this.sites = [nsite, ...this.sites];
      this.service.create(nsite)
        .subscribe(newSite => {
          this.loadData();
        }, (error: AppError) => {
          this.sites.splice(0, 1);
          if (error instanceof BadInput) {
            // this.form.setErrors(originalError);
          } else {
            throw error;
          }
        });
  */

  hideNewDialog() {

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

  deleteSite(node: TreeNode) {
    const index = this.sites.indexOf(node.data);
    this.sites.splice(index, 1);
    this.service.delete((<Site>node.data).id)
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


  hideNewDialoge() {
    this.dialogVisible = false;
  }

  showDialogToAdd() {
    this.newSite = Object.assign({}, this._newSite);
    this.newMode = true;
    this.dialogVisible = true;
  }

  updateSite(item, name) {

  }

  cancelUpdate() {

  }

  onChangeItem(item: Site, field: string, event) {
    console.log('enter on change site = ' + JSON.stringify(item));
    item[field] = <Site>event;
  }

  onChangeItemLabel(item: Site, field: string, event) {
    console.log('enter on change label = ' + JSON.stringify(item));
    item[field] = <Label>event;
  }


}
