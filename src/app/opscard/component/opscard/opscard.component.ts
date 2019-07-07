import { OpscardService } from 'shared/services/opscard.service';
import { Component, OnInit } from '@angular/core';
import { Opscard } from 'shared/table/table';
import { TreeNode } from 'primeng/api';
import { NotFoundError } from 'app/core/component/common/not-found-error';
import { AppError } from 'app/core/component/common/app-error';
import { BadInput } from 'app/core/component/common/bad-input';

@Component({
  selector: 'app-opscard',
  templateUrl: './opscard.component.html',
  styleUrls: ['./opscard.component.css']
})
export class OpscardComponent implements OnInit {
  opscards: any[];
  cols: any[];
  selectedOpscard: Opscard;
  selectedNode: TreeNode;

  newOpscard: Opscard = {
    datecreate: new Date(),
    dateupdate: new Date(),
    id: 0,
    observer: '',
    curdate: new Date(),
    site: '',
    measure: '',
    description: '',
    kind: 'S',
    degree: 'L',
    state: 'C',
    jobsite: 'L',
    lastuser: 'ali',
    owner: 'ali'
  };
  dialogVisible = false;
  newMode = false;

  titlelist = 'Marque';

  constructor(private service: OpscardService) {
  }

  ngOnInit() {
    this.loadData();
    this.cols = [
      { field: 'id',             header: 'id',          width: '7.75em' },
      { field: 'site',           header: 'site',        width: 'auto' },
      /* { field: 'Classification', header: 'Type',        width: '2.25em' }, */
      { field: 'curdate',        header: 'curdate',     width: '5em' },
      /* { field: 'time',           header: 'time',        width: '3.25em' }, */
      { field: 'observer',       header: 'lieu',        width: 'auto' },
      { field: 'description',    header: 'description', width: 'auto' }
    ];
  }

  loadData() {
    this.service.getAll()
      .subscribe(opscards => {
        this.opscards = opscards;
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


  deleteOpscard(_opscard: Opscard) {
    const index = this.opscards.indexOf(_opscard);
    this.opscards.splice(index, 1);
    this.opscards = [...this.opscards] ;
    this.service.delete(_opscard.id)
      .subscribe(
      () => { this.loadData(); } ,
      (error: Response) => {
        this.opscards.splice(index, 0, _opscard);

        if (error instanceof NotFoundError) {
          alert('this post has already been deleted');
        } else {
          throw error;
        }
      }
      );
  }

  updateOpscard(_opscard, input: HTMLInputElement) {
    _opscard.name = input.value;
    this.service.update(_opscard)
      .subscribe(updateopscard => {
        this.loadData();
      });
  }

  cancelUpdate(_opscard) {
    //
  }

  showDialogToAdd() {
    this.newMode = true;
    this.dialogVisible = true;
  }

  showNewDialoge() {
    this.dialogVisible = true;
    this.newMode = true;
    this.newOpscard = {
      datecreate: new Date(),
      dateupdate: new Date(),
      id: 0,
      observer: '',
      curdate: new Date(),
      site: '',
      measure: '',
      description: '',
      kind: 'S',
      degree: 'L',
      state: 'C',
      jobsite: 'L',
      lastuser: 'ali',
      owner: 'ali'
    };
  }

  hideNewDialoge() {
    this.dialogVisible = false;
  }

  create() {
    this.service.create(this.newOpscard)
    .subscribe(newOpscard => {
      this.loadData();
    }, (error: AppError) => {
      this.opscards.splice(0, 1);
      if (error instanceof BadInput) {
      } else {
        throw error;
      }
    });
  }

}
