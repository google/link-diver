import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandCollapseAllComponent } from './expand-collapse-all.component';
import { LinkService } from '../link.service';
import { MatMenuModule } from '@angular/material/menu';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ExpandCollapseAllComponent', () => {
  let component: ExpandCollapseAllComponent;
  let fixture: ComponentFixture<ExpandCollapseAllComponent>;

  const fakeLinkService = {
    requestLinkData() {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatMenuModule
      ],
      declarations: [
        ExpandCollapseAllComponent
      ],
      providers: [
        { provide: LinkService, useValue: fakeLinkService}
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
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
