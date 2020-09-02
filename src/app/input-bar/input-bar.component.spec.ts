import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputBarComponent } from './input-bar.component';
import { CrossComponentDataService } from '../cross-component-data.service';
import { FilterOption, FilterKeys, GroupingOptions, GroupByKeys, GroupOrders } from '../interfaces';

describe('InputBarComponent', () => {
  let component: InputBarComponent;
  let fixture: ComponentFixture<InputBarComponent>;
  let ccdService: CrossComponentDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputBarComponent
      ],
      providers: [
        CrossComponentDataService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputBarComponent);
    ccdService = TestBed.get(CrossComponentDataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly parse a simple regex filter', () => {
    component.newInput = 'www[.]mocklink[.]com';
    const expectedFilters: FilterOption<RegExp>[] = [{
      filterKey: FilterKeys.Regex,
      isNegation: false,
      isValidInput: true,
      inputString: 'www[.]mocklink[.]com',
      value: /www[.]mocklink[.]com/,
      isHighlightableRegex: true
    }];
    component.pushInput();
    ccdService.filters$.subscribe((filters) => {
      expect(filters).toEqual(expectedFilters);
    });
    ccdService.regexArr$.subscribe((regexArr) => {
      expect(regexArr).toEqual([/(www[.]mocklink[.]com)/g]);
    });
  });

  it('should properly parse a host filter', () => {
    component.newInput = 'host:www[.]mocklink[.]com';
    const expectedFilters: FilterOption<RegExp>[] = [{
      filterKey: FilterKeys.Host,
      isNegation: false,
      isValidInput: true,
      inputString: 'www[.]mocklink[.]com',
      value: /www[.]mocklink[.]com/,
      isHighlightableRegex: false
    }];
    component.pushInput();
    ccdService.filters$.subscribe((filters) => {
      expect(filters).toEqual(expectedFilters);
    });
  });

  it('should properly parse a visible filter', () => {
    component.newInput = 'visible:False';
    const expectedFilters: FilterOption<boolean>[] = [{
      filterKey: FilterKeys.Visible,
      isNegation: false,
      isValidInput: true,
      inputString: 'False',
      value: false,
      isHighlightableRegex: false
    }];
    component.pushInput();
    ccdService.filters$.subscribe((filters) => {
      expect(filters).toEqual(expectedFilters);
    });
  });

  it('should properly parse a tag filter', () => {
    component.newInput = 'tag:link';
    const expectedFilters: FilterOption<string>[] = [{
      filterKey: FilterKeys.TagName,
      isNegation: false,
      isValidInput: true,
      inputString: 'link',
      value: 'link',
      isHighlightableRegex: false
    }];
    component.pushInput();
    ccdService.filters$.subscribe((filters) => {
      expect(filters).toEqual(expectedFilters);
    });
  });

  it('should properly parse a status_code filter', () => {
    component.newInput = 'status_code:404';
    const expectedFilters: FilterOption<number>[] = [{
      filterKey: FilterKeys.StatusCode,
      isNegation: false,
      isValidInput: true,
      inputString: '404',
      value: 404,
      isHighlightableRegex: false
    }];
    component.pushInput();
    ccdService.filters$.subscribe((filters) => {
      expect(filters).toEqual(expectedFilters);
    });
  });

  it('should properly parse a status_ok filter', () => {
    component.newInput = 'status_ok:False';
    const expectedFilters: FilterOption<boolean>[] = [{
      filterKey: FilterKeys.StatusOk,
      isNegation: false,
      isValidInput: true,
      inputString: 'False',
      value: false,
      isHighlightableRegex: false
    }];
    component.pushInput();
    ccdService.filters$.subscribe((filters) => {
      expect(filters).toEqual(expectedFilters);
    });
  });

  it('should properly parse a content type filter', () => {
    component.newInput = 'content_type:text';
    const expectedFilters: FilterOption<string>[] = [{
      filterKey: FilterKeys.ContentType,
      isNegation: false,
      isValidInput: true,
      inputString: 'text',
      value: 'text',
      isHighlightableRegex: false
    }];
    component.pushInput();
    ccdService.filters$.subscribe((filters) => {
      expect(filters).toEqual(expectedFilters);
    });
  });

  it('should properly parse a couple of negation filters', () => {
    component.newInput = 'not:regexp:www[.]wronglink[.]com not:tag:IMG';
    const expectedFilters: FilterOption<any>[] = [{
      filterKey: FilterKeys.Regex,
      isNegation: true,
      isValidInput: true,
      inputString: 'www[.]wronglink[.]com',
      value: /www[.]wronglink[.]com/,
      isHighlightableRegex: false
    }, {
      filterKey: FilterKeys.TagName,
      isNegation: true,
      isValidInput: true,
      inputString: 'IMG',
      value: 'IMG',
      isHighlightableRegex: false
    }];
    component.pushInput();
    ccdService.filters$.subscribe((filters) => {
      expect(filters).toEqual(expectedFilters);
    });
  });

  it('should parse a group by attrbiute', () => {
    component.newInput = '{ host }';
    const expectedGrouping: GroupingOptions = {
      groupBy: GroupByKeys.Host,
      sort: GroupOrders.None
    };
    component.pushInput();
    ccdService.grouping$.subscribe((grouping) => {
      expect(grouping).toEqual(expectedGrouping);
    });
  });

  it('should correct an unofficial sorting syntax', () => {
    component.newInput = '{ host sort:asc }';
    component.pushInput();
    expect(component.newInput).toEqual('{ host sort:lex-asc }');
  });

  it('should parse a rewrite group', () => {
    component.newInput = '{ regexp:(www[.]mocklink[.]com)/\\w+/(\\d{5}) ' +
    'rewrite:$2 sort:size-asc }';

    const expectedGrouping: GroupingOptions = {
      groupBy: GroupByKeys.Rewrite,
      sort: GroupOrders.SizeAscend,
      regex: /(www[.]mocklink[.]com)\/\w+\/(\d{5})/,
      rewrite: '$2'
    };
    const expectedFilters: FilterOption<any>[] = [{
      filterKey: FilterKeys.Regex,
      isNegation: false,
      value: /(www[.]mocklink[.]com)\/\w+\/(\d{5})/,
      isValidInput: true,
      inputString: '',
      isHighlightableRegex: false
    }];
    component.pushInput();
    ccdService.grouping$.subscribe((grouping) => {
      expect(grouping).toEqual(expectedGrouping);
    });
    ccdService.filters$.subscribe((filters) => {
      expect(filters).toEqual(expectedFilters);
    });
  });

  it('should parse a combination of filters and a grouping', () => {
    component.newInput = 'mocklink regexp:\\d{5} ' +
        'not:tag:FORM visible:True status_ok:False ' +
        '{ regexp:(www[.]mocklink[.]com)/\\w+/(\\d{5}) }';

    const expectedFilters: FilterOption<any>[] = [{
      filterKey: FilterKeys.Regex,
      isNegation: false,
      value: /mocklink/,
      isValidInput: true,
      inputString: 'mocklink',
      isHighlightableRegex: true
    }, {
      filterKey: FilterKeys.Regex,
      isNegation: false,
      value: /\d{5}/,
      isValidInput: true,
      inputString: '\\d{5}',
      isHighlightableRegex: true
    }, {
      filterKey: FilterKeys.TagName,
      isNegation: true,
      value: 'FORM',
      isValidInput: true,
      inputString: 'FORM',
      isHighlightableRegex: false
    }, {
      filterKey: FilterKeys.Visible,
      isNegation: false,
      value: true,
      isValidInput: true,
      inputString: 'True',
      isHighlightableRegex: false
    }, {
      filterKey: FilterKeys.StatusOk,
      isNegation: false,
      value: false,
      isValidInput: true,
      inputString: 'False',
      isHighlightableRegex: false
    }, {
      filterKey: FilterKeys.Regex,
      isNegation: false,
      value: /(www[.]mocklink[.]com)\/\w+\/(\d{5})/,
      isValidInput: true,
      inputString: '',
      isHighlightableRegex: false
    }];
    const expectedGrouping: GroupingOptions = {
      groupBy: GroupByKeys.Rewrite,
      sort: GroupOrders.None,
      regex: /(www[.]mocklink[.]com)\/\w+\/(\d{5})/
    };
    const expectedRegexArr = [/(mocklink)/g, /(\d{5})/g];

    component.pushInput();

    ccdService.grouping$.subscribe((grouping) => {
      expect(grouping).toEqual(expectedGrouping);
    });
    ccdService.filters$.subscribe((filters) => {
      expect(filters).toEqual(expectedFilters);
    });
    ccdService.regexArr$.subscribe((regexArr) => {
      expect(regexArr).toEqual(expectedRegexArr);
    });
  });
});
