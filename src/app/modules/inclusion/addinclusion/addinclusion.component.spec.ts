import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinclusionComponent } from './addinclusion.component';

describe('AddinclusionComponent', () => {
  let component: AddinclusionComponent;
  let fixture: ComponentFixture<AddinclusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddinclusionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddinclusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
