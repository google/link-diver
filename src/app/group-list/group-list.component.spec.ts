import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListComponent } from './group-list.component';
import { BehaviorSubject } from 'rxjs';
import { LinkData } from '../interfaces';
import { LinkService } from '../link.service';
import { FilterByRegexPipe } from '../filter-by-regex.pipe';
import { GroupSortPipe } from '../group-sort.pipe';

describe('GroupListComponent', () => {
  let component: GroupListComponent;
  let fixture: ComponentFixture<GroupListComponent>;

  const mockTemplate = {
    href: 'https://www.mocklink.com/page',
    host: 'www.mocklink.com',
    domId: 25,
    visible: true,
    tagName: 'A',
  };

  const mockList = [];
  for (let i = 0; i < 3; i ++) {
    mockList.push({
      href: mockTemplate.href + i.toString(),
      host: mockTemplate,
      domId: mockTemplate.domId + i,
      visible: mockTemplate.visible,
      tagName: mockTemplate.tagName
    });
  }

  const fakeLinkService = {
    linkList$: new BehaviorSubject<LinkData[]>([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GroupListComponent,
        FilterByRegexPipe,
        GroupSortPipe
      ],
      providers: [
        { provide: LinkService, useValue: fakeLinkService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add tests to confirm we have proper group components
});
