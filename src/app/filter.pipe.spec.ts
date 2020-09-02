import { FilterPipe } from './filter.pipe';
import { FilterKeys, FilterOption, LinkData } from './interfaces';

describe('FilterPipe', () => {

  const mockList: LinkData[] = [
    {
      href: 'https://www.mocklink.com/page1',
      host: 'www.mocklink.com',
      domId: 0,
      tagName: 'A',
      visible: false,
      source: '',
      highlighted: false,
      highlightId: '',
      status: 200,
      statusOk: true,
      contentType: 'text/html'
    }, {
      href: 'https://www.mocklink.com/page2',
      host: 'www.mocklink.com',
      domId: 1,
      tagName: 'A',
      visible: true,
      source: '',
      highlighted: false,
      highlightId: '',
      status: 200,
      statusOk: true,
      contentType: 'text/html'
    }, {
      href: 'https://www.mocklink.com/page3',
      host: 'www.mocklink.com',
      domId: 2,
      tagName: 'A',
      visible: true,
      source: '',
      highlighted: false,
      highlightId: '',
      status: 200,
      statusOk: true,
      contentType: 'text/html'
    }
  ];


  const pipe = new FilterPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should let every link through, using one regex filter', () => {
    const filters: FilterOption<RegExp>[] = [{
      filterKey: FilterKeys.Regex,
      value: /.*/,
      isNegation: false,
      inputString: '.*',
      isValidInput: true,
      isHighlightableRegex: true
    }];
    const filtered = pipe.transform(mockList, filters);
    expect(filtered).toEqual(mockList);
  });

  it('should only let the first link through', () => {
    const filters: FilterOption<RegExp>[] = [{
      filterKey: FilterKeys.Regex,
      value: /page1/,
      isNegation: false,
      inputString: 'page0',
      isValidInput: true,
      isHighlightableRegex: true
    }];
    const filtered = pipe.transform(mockList, filters);
    expect(filtered.length).toEqual(1);
    expect(filtered[0]).toEqual(mockList[0]);
  });

  it('should only let visible links through', () => {
    const filters: FilterOption<boolean>[] = [{
      filterKey: FilterKeys.Visible,
      value: true,
      isNegation: false,
      inputString: '1',
      isValidInput: true,
      isHighlightableRegex: false
    }];
    const filtered = pipe.transform(mockList, filters);
    // only the first link is not visible
    expect(filtered.length).toEqual(2);
    expect(filtered).not.toContain(mockList[0]);
  });

  it('should not allow any links through using the negation', () => {
    const filters: FilterOption<RegExp>[] = [{
      filterKey: FilterKeys.Regex,
      value: /mocklink/,
      isNegation: true,
      inputString: 'mocklink',
      isValidInput: true,
      isHighlightableRegex: false
    }];
    const filtered = pipe.transform(mockList, filters);
    // only the first link is not visible
    expect(filtered.length).toEqual(0);
  });

  it('should apply multiple filers, letting all links through', () => {
    const filters: FilterOption<any>[] = [{
      filterKey: FilterKeys.Host,
      value: /mocklink/,
      isNegation: false,
      inputString: 'mocklink',
      isValidInput: true,
      isHighlightableRegex: false
    }, {
      filterKey: FilterKeys.Regex,
      value: /wronglink/,
      isNegation: true,
      inputString: 'wronglink',
      isValidInput: true,
      isHighlightableRegex: false
    }, {
      filterKey: FilterKeys.TagName,
      value: 'A',
      isNegation: false,
      inputString: 'A',
      isValidInput: true,
      isHighlightableRegex: false
    }, {
      filterKey: FilterKeys.StatusCode,
      value: 200,
      isNegation: false,
      inputString: '200',
      isValidInput: true,
      isHighlightableRegex: false
    }, {
      filterKey: FilterKeys.ContentType,
      value: 'text',
      isNegation: false,
      inputString: 'text',
      isValidInput: true,
      isHighlightableRegex: false
    }];
    const filtered = pipe.transform(mockList, filters);
    expect(filtered).toEqual(mockList);
  });
});
