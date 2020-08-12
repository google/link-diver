import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCountComponent } from './group-count.component';

describe('GroupCountComponent', () => {
  let component: GroupCountComponent;
  let fixture: ComponentFixture<GroupCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
