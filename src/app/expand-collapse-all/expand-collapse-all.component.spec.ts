import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandCollapseAllComponent } from './expand-collapse-all.component';

describe('ExpandCollapseAllComponent', () => {
  let component: ExpandCollapseAllComponent;
  let fixture: ComponentFixture<ExpandCollapseAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandCollapseAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandCollapseAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
