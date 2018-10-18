import { NotFoundError } from './../../core/component/common/not-found-error';
import { BadInput } from './../../core/component/common/bad-input';
import { AppError } from './../../core/component/common/app-error';
import { LastidService } from 'shared/services/lastid.service';
import { InspectedsiteService } from 'shared/services/Inspectedsite.service';
import { Component, OnInit } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { InspectedSite } from 'shared/table/table';
import { PanelModule } from 'primeng/primeng';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-inspectedsite',
  templateUrl: './Inspectedsite.component.html',
  styleUrls: ['./Inspectedsite.component.css']
})
export class InspectedsiteComponent implements OnInit {
  Inspectedsites: any[];
  selectedInspectedsite: InspectedSite;
  // mark: any;
  newInspectedsite: any = {
    datecreate: new Date(),
    dateupdate: new Date(),
    id: 0,
    lastuser: 'ali',
    name: '',
    owner: 'ali'
  };
  dialogVisible = false;
  newMode = false;

  lastids: any[];
  lastid: any;
  titlelist = 'Activité';

  constructor(private service: InspectedsiteService, private lastidService: LastidService) {
  }

  ngOnInit() {
    this.loadData();
    /* this.lastidService.getAll()
      .subscribe(lastids => this.lastids = lastids); */
  }

  loadData() {
    this.service.getAll()
      .subscribe(Inspectedsites => {
        this.Inspectedsites = Inspectedsites;
      });
  }

  getLastid(name) {
    let a = '';
    this.lastidService.getAll()
      .subscribe(lastids => {
        for (let lid of lastids) {
          if (lid.name === name) { a = lid.count; }
        }
      });
    return a;
  }



  createInspectedsite() {
    this.dialogVisible = false;
    this.Inspectedsites = [this.newInspectedsite, ...this.Inspectedsites];

    this.service.create(this.newInspectedsite)
      .subscribe(newInspectedsite => {
        this.loadData();
      }, (error: AppError) => {
        this.Inspectedsites.splice(0, 1);
        if (error instanceof BadInput) {
          // this.form.setErrors(originalError);
        } else {
          throw error;
        }
      });
  }

  deleteInspectedsite(_Inspectedsite: InspectedSite) {
    let index = this.Inspectedsites.indexOf(_Inspectedsite);
    this.Inspectedsites.splice(index, 1);
    this.Inspectedsites = [...this.Inspectedsites];
    this.service.delete(_Inspectedsite.idsite)
      .subscribe(
      null,
      (error: Response) => {
        this.Inspectedsites.splice(index, 0, _Inspectedsite);

        if (error instanceof NotFoundError) {
          alert('this post has already been deleted');
        } else {
          throw error;
        }
      }
      );
  }

  updateInspectedsite(_Inspectedsite, input: HTMLInputElement) {
    _Inspectedsite.name = input.value;
    this.service.update(_Inspectedsite)
      .subscribe(updateInspectedsite => {
        this.loadData();
        console.log(updateInspectedsite);
      });
    console.log('name = ' + input.value);
    console.log(_Inspectedsite);
  }

  cancelUpdate(_Inspectedsite) {
    //
  }

  showNewDialoge() {
    this.dialogVisible = true;
    this.newMode = true;
    this.newInspectedsite = {
      datecreate: new Date(),
      dateupdate: new Date(),
      id: 0,
      lastuser: 'ali',
      name: '',
      owner: 'ali'
    };
  }

  hideNewDialoge() {
    this.dialogVisible = false;
  }

  showDialogToAdd() {
    this.newMode = true;
    this.dialogVisible = true;
  }

  save() {
    let Inspectedsites = [...this.Inspectedsites];
    if (this.newMode) {
      Inspectedsites.push(this.newInspectedsite);
    } else {
      Inspectedsites[this.findSelectedInspectedsiteIndex()] = this.newInspectedsite;
    }
    this.Inspectedsites = Inspectedsites;
    this.newInspectedsite = null;
    this.dialogVisible = false;
  }

  delete() {
    let index = this.findSelectedInspectedsiteIndex();
    this.Inspectedsites = this.Inspectedsites.filter((val, i) => i !== index);
    this.newInspectedsite = null;
    this.dialogVisible = false;
  }

  onRowSelect(event) {
    /* this.newMode = false;
    this.newMark = this.cloneMark(event.data);
    this.dialogVisible = true; */
  }

  cloneActifity(c: InspectedSite): InspectedSite {
    let Inspectedsite: InspectedSite; // = new Prime();
    /* for (let prop of c) {
      mark[prop] = c[prop];
    } */
    Inspectedsite = c;
    return Inspectedsite;
  }

  findSelectedInspectedsiteIndex(): number {
    return this.Inspectedsites.indexOf(this.selectedInspectedsite);
  }
}



