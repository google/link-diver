import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkListComponent } from './link-list.component';
import { LinkData } from '../interfaces';

describe('LinkListComponent', () => {
  let component: LinkListComponent;
  let fixture: ComponentFixture<LinkListComponent>;

  const mockList: LinkData[] = [
    {
      href: 'https://www.mocklink.com/page1',
      host: 'www.mocklink.com',
      domId: 0,
      tagName: 'A',
      visible: false,
      source: '',
      highlighted: false,
      highlightId: ''
    }, {
      href: 'https://www.mocklink.com/page2',
      host: 'www.mocklink.com',
      domId: 1,
      tagName: 'A',
      visible: true,
      source: '',
      highlighted: false,
      highlightId: ''
    }, {
      href: 'https://www.mocklink.com/page3',
      host: 'www.mocklink.com',
      domId: 2,
      tagName: 'A',
      visible: true,
      source: '',
      highlighted: false,
      highlightId: ''
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkListComponent);
    component = fixture.componentInstance;
    component.group = {
      key: 'fake',
      list: mockList,
      size: 3,
      sizeProportion: 0.5
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain three indiv link components', () => {
    const subComponents = fixture.nativeElement
        .querySelectorAll('app-indiv-link');
    expect(subComponents.length).toEqual(3);
  });
});
