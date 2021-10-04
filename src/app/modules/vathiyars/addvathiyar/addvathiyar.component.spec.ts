import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvathiyarComponent } from './addvathiyar.component';

describe('AddvathiyarComponent', () => {
  let component: AddvathiyarComponent;
  let fixture: ComponentFixture<AddvathiyarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddvathiyarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvathiyarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
