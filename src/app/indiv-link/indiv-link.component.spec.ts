import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndivLinkComponent } from './indiv-link.component';
import { LinkService } from '../link.service';
import { CrossComponentDataService } from '../cross-component-data.service';
import { HighlightMatchPipe } from '../highlight-match.pipe';
import { LinkData } from '../interfaces';

describe('IndivLinkComponent', () => {
  let component: IndivLinkComponent;
  let fixture: ComponentFixture<IndivLinkComponent>;
  const fakeLinkService = {
    highlightLink() {}
  };
  const ccdService = new CrossComponentDataService();

  const mockLink: LinkData = {
    href: 'https://www.mocklink.com/index.html',
    host: 'www.mocklink.com',
    domId: 25,
    visible: true,
    tagName: 'A',
    source: `<a href="https://www.mocklink.com/index.html">Home</a>`,
    highlighted: false,
    highlightId: 'link-diver-id-0-25',
    status: 200,
    statusOk: true,
    contentType: 'text/html'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IndivLinkComponent,
        HighlightMatchPipe
      ],
      providers: [
        { provide: LinkService, useValue: fakeLinkService},
        { provide: CrossComponentDataService, useValue: ccdService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndivLinkComponent);
    component = fixture.componentInstance;
    component.link = mockLink;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
    add tests with ccdService
  */
});
