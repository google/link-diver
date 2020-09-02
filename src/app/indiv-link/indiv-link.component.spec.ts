import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndivLinkComponent } from './indiv-link.component';
import { CrossComponentDataService } from '../cross-component-data.service';
import { HighlightMatchPipe } from '../highlight-match.pipe';
import { LinkData } from '../interfaces';
import { ChromeLinkService } from '../chrome-link.service';

describe('IndivLinkComponent', () => {
  let component: IndivLinkComponent;
  let fixture: ComponentFixture<IndivLinkComponent>;
  const fakeChromeLinkService = {
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
        { provide: ChromeLinkService, useValue: fakeChromeLinkService},
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

  it('should listen for new regular expressions to highlight', ()=> {
    const fakeRegexArr = [/(fakeRegex)/g, /(highlightThis)/g];
    ccdService.updateRegex(fakeRegexArr);
    expect(component.regexArr).toEqual(fakeRegexArr);
  });

  it('should expand and collapse properly', () => {
    expect(component.expand).toEqual(false);
    ccdService.expandCollapseAll(true);
    expect(component.expand).toEqual(true);
    component.toggle();
    expect(component.expand).toEqual(false);
    ccdService.expandCollapseAll(false);
    expect(component.expand).toEqual(false);
    component.toggle();
    expect(component.expand).toEqual(true);
  });

  it('should respond to a toggle in showElementSource', () => {
    ccdService.updateShowElementSource(true);
    expect(component.showElementSource).toEqual(true);
    ccdService.updateShowElementSource(false);
    expect(component.showElementSource).toEqual(false);
  });
});
