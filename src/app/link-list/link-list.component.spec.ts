import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkListComponent } from './link-list.component';

describe('LinkListComponent', () => {
  let component: LinkListComponent;
  let fixture: ComponentFixture<LinkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkListComponent);
    component = fixture.componentInstance;
    component.group = {key: 'fake', list: [], size: 0};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
