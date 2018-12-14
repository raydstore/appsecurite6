import { InputData } from './../../../table/table';
import { EntrepriseService } from 'shared/services/entreprise.service';
import { NewData } from './../newData';
import { Component, OnInit, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Entreprise } from 'shared/table/table';


const _newEntreprise: Entreprise = {
  datecreate: new Date(),
  dateupdate: new Date(),
  id: 0,
  lastuser: 'ali',
  name: '',
  adress: '',
  phone: '',
  fiscalenumber: '',
  owner: 'ali'
};

@Component({
  selector: 'app-newentreprise',
  templateUrl: './newentreprise.component.html',
  styleUrls: ['./newentreprise.component.css']
})
export class NewentrepriseComponent  extends NewData<Entreprise> implements OnInit, OnChanges {
  @Input() dialogVisible: boolean;
  @Output() closeDialog = new EventEmitter<InputData<Entreprise>>();

  constructor(service: EntrepriseService) {
    super(service, _newEntreprise);
    this._closeDialog = this.closeDialog;
  }

  ngOnChanges() {
    this.onChange();
  }


  ngOnInit() {
  }

}
