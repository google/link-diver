import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupHeaderComponent } from './group-header.component';

describe('GroupHeaderComponent', () => {
  let component: GroupHeaderComponent;
  let fixture: ComponentFixture<GroupHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
