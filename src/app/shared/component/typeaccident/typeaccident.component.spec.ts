import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeaccidentComponent } from './typeaccident.component';

describe('TypeaccidentComponent', () => {
  let component: TypeaccidentComponent;
  let fixture: ComponentFixture<TypeaccidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeaccidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeaccidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
