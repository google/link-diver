import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandCollapseAllComponent } from './expand-collapse-all.component';
import { LinkService } from '../link.service';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

describe('ExpandCollapseAllComponent', () => {
  let component: ExpandCollapseAllComponent;
  let fixture: ComponentFixture<ExpandCollapseAllComponent>;

  const fakeLinkService = {
    requestLinkData() {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        MatFormFieldModule,
        MatButtonModule
      ],
      declarations: [
        ExpandCollapseAllComponent,
        MatMenu
      ],
      providers: [
        { provide: LinkService, useValue: fakeLinkService}
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
