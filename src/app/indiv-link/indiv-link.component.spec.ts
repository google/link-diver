import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndivLinkComponent } from './indiv-link.component';

describe('IndivLinkComponent', () => {
  let component: IndivLinkComponent;
  let fixture: ComponentFixture<IndivLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndivLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndivLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
