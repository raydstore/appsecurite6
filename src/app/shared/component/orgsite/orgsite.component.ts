import { InfoSite } from './../../table/table';
import { Site } from 'shared/table/table';
import { NotFoundError } from './../../../core/component/common/not-found-error';
import { BadInput } from './../../../core/component/common/bad-input';
import { AppError } from './../../../core/component/common/app-error';
import { TreeNode } from 'primeng/api';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-orgsite',
  templateUrl: './orgsite.component.html',
  styleUrls: ['./orgsite.component.css']
})
export class OrgsiteComponent implements OnInit {

  @Input() sites: Site [];
  @Input() siteParent: Site;
  data: TreeNode[] = [];
  constructor() { }

  ngOnInit() {
    this.buildSites();
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
     /* const siteRoot = this.siteParent; */
     let value: any;
     const childs: TreeNode[] = this.getChilds(this.siteParent, false);
         if (childs.length !== 0) {
      value = {
       label: this.siteParent.name,
       type: 'branch',
       data: this.siteParent,
       children: childs,
       expanded: true,
       partialSelected: true,
       styleClass: 'stparent'
     };
    } else {
      value = {
       label: this.siteParent.name,
       type: 'sheet',
       data: this.siteParent,
       expanded: false,
       styleClass: 'stchild'
     };
    }
     this.data.push(value);
  }

  newSite(infoSite: InfoSite) {
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
    /* this.service.create(siteChild)
        .subscribe(nd => {
          this.data = [];
          this.sites = [];
        //  this.loadData();
      }, (error: AppError) => {
        infoSite.node.children.splice(0, 1);

        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
          throw error;
        }
      }); */
  }

  deleteSite(node: TreeNode) {
    let index = this.sites.indexOf(node.data);
    this.sites.splice(index, 1);
    /* this.service.delete((<Site> node.data).id)
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
      ); */
  }

  expandChilds(node: TreeNode) {
    node.children = node['childs'];
    node.expanded = true;
    // console.log('sites = ' + JSON.stringify(this.sites));
  }


  showNewDialoge() {

  }


}
