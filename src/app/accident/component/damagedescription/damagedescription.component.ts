import { Damage } from './../../../shared/table/table';
import { DamageService } from 'shared/services/damage.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-damagedescription',
  templateUrl: './damagedescription.component.html',
  styleUrls: ['./damagedescription.component.css']
})
export class DamagedescriptionComponent implements OnInit {

  @Input() iddamage: number;

  damage: Damage = null;

  constructor(private service: DamageService) { }

  ngOnInit() {
    this.service.getItem(this.iddamage).
      subscribe(damage => {
        console.log('description damage = ' + JSON.stringify(damage));
        if (damage.description === undefined) {
          damage.description = '';
        }
        this.damage = damage;
        console.log('description this.damage = ' + JSON.stringify(damage));
      });
  }

  getDescription(): String {
    return this.damage.description.substring(0, 50);
  }

  update() {

  }

  cancel() {
    
  }

}
