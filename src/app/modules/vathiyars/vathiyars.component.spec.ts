import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VathiyarsComponent } from './vathiyars.component';

describe('VathiyarsComponent', () => {
  let component: VathiyarsComponent;
  let fixture: ComponentFixture<VathiyarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VathiyarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VathiyarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
