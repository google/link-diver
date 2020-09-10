import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupListComponent } from './group-list.component';
import { LinkData, SortOptions, GroupByKeys, GroupOrders, FilterKeys } from '../interfaces';
import { GroupSortPipe } from '../group-sort.pipe';
import { FilterPipe } from '../filter.pipe';
import { CrossComponentDataService } from '../cross-component-data.service';

describe('GroupListComponent', () => {
  let component: GroupListComponent;
  let fixture: ComponentFixture<GroupListComponent>;
  let ccdService: CrossComponentDataService;

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

  const mockOrder = {
    groupBy: GroupByKeys.Host,
    sort: GroupOrders.SizeDescend
  };

  const mockFilters = [{
    filterKey: FilterKeys.Regex,
    value: /wwww[.]mocklink[.]com/,
    isNegation: false,
    isValidInput: true,
    inputString: 'www[.]mocklink[.]com',
    isHighlightableRegex: true
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GroupListComponent,
        FilterPipe,
        GroupSortPipe
      ],
      providers: [
        CrossComponentDataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListComponent);
    ccdService = TestBed.get(CrossComponentDataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    ccdService.updateLinks(mockList);
    ccdService.updateOrder(SortOptions.LexicoAscend);
    ccdService.updateGroupingOptions(mockOrder);
    ccdService.updateFilters(mockFilters);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive the links when they are updated', () => {
    expect(component.links).toEqual(mockList);
  });

  it('should receive the sort options when they are updated', () => {
    expect(component.order).toEqual(SortOptions.LexicoAscend);
  });

  it('should receive the grouping options when they are updated', () => {
    expect(component.grouping).toEqual(mockOrder);
    expect(component.showHeader).toEqual(true);
  });

  it('should receive the filters when they are updated', () => {
    expect(component.filters).toEqual(mockFilters);
  });
});
