import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClgListComponent } from './clg-list.component';

describe('ClgListComponent', () => {
  let component: ClgListComponent;
  let fixture: ComponentFixture<ClgListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClgListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
