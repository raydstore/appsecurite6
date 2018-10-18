import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectplanningComponent } from './inspectplanning.component';

describe('InspectplanningComponent', () => {
  let component: InspectplanningComponent;
  let fixture: ComponentFixture<InspectplanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectplanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectplanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
