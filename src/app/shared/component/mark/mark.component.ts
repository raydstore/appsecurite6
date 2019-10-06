import { TreeNode } from 'primeng/components/common/api';
import { LastidService } from 'shared/services/lastid.service';
import { NotFoundError } from '../../../core/component/common/not-found-error';
import { AppError } from '../../../core/component/common/app-error';
import { BadInput } from '../../../core/component/common/bad-input';
import { MarkService } from 'shared/services/mark.service';
import { Component, OnInit } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { Mark, UserInfo } from 'shared/table/table';
import { PanelModule } from 'primeng/primeng';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-mark',
  templateUrl: 'mark.component.html',
  styleUrls: ['./mark.component.css']
})
export class MarkComponent implements OnInit {
  marks: any[];
  selectedMark: Mark;
  selectedNode: TreeNode;

  newMark: Mark = {
    datecreate: new Date(),
    dateupdate: new Date(),
    id: 0,
    lastuser: 'ali',
    name: '',
    owner: 'ali'
  };
  dialogVisible = false;
  newMode = false;

  titlelist = 'Marque';

  constructor(private service: MarkService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service.getAll()
      .subscribe(marks => {
        this.marks = marks;
      });
  }

  nodeExpand(event) {
    this.selectedNode = event.node;
  }

  isSelected(event) {
    return this.selectedNode === event.node ? true : false;
  }

  createItem(event) {
    /* close Dialog */
    this.dialogVisible = false;
    /* refresh data */
    if (!event.cancelDialog) {
      this.loadData();
    }
  }


  deleteMark(_mark: Mark) {
    const index = this.marks.indexOf(_mark);
    this.marks.splice(index, 1);
    this.marks = [...this.marks] ;
    this.service.delete(_mark.id)
      .subscribe(
      () => { this.loadData(); } ,
      (error: Response) => {
        this.marks.splice(index, 0, _mark);

        if (error instanceof NotFoundError) {
          alert('this post has already been deleted');
        } else {
          throw error;
        }
      }
      );
  }

  updateMark(_mark, input: HTMLInputElement) {
    _mark.name = input.value;
    this.service.update(_mark)
      .subscribe(updatemark => {
        this.loadData();
      });
  }

  cancelUpdate(_mark) {
    //
  }

  showDialogToAdd() {
    this.newMode = true;
    this.dialogVisible = true;
  }


}



