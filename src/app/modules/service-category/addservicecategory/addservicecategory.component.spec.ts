import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddservicecategoryComponent } from './addservicecategory.component';

describe('AddservicecategoryComponent', () => {
  let component: AddservicecategoryComponent;
  let fixture: ComponentFixture<AddservicecategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddservicecategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddservicecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
