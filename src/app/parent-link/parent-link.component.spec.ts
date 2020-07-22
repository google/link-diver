import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentLinkComponent } from './parent-link.component';

describe('ParentLinkComponent', () => {
  let component: ParentLinkComponent;
  let fixture: ComponentFixture<ParentLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
