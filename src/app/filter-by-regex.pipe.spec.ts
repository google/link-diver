import { FilterByRegexPipe } from './filter-by-regex.pipe';

describe('FilterByRegexPipe', () => {

  const mockTemplate = {
    href: 'https://www.mocklink.com/page',
    host: 'www.mocklink.com',
    domId: 0,
    tagName: 'A',
  };

  const mockList = [];
  for (let i = 0; i < 3; i ++) {
    mockList.push({
      href: mockTemplate.href + i.toString(),
      host: mockTemplate.host,
      domId: mockTemplate.domId + i,
      visible: i !== 0,
      tagName: mockTemplate.tagName
    });
  }

  const pipe = new FilterByRegexPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should let every link through', () => {
    const filtered = pipe.transform(mockList, '.*', {});
    expect(filtered).toEqual(mockList);
  });

  it('should only let the first link through', () => {
    const filtered = pipe.transform(mockList, 'page0', {});
    expect(filtered.length).toEqual(1);
    expect(filtered[0]).toEqual(mockList[0]);
  });

  it('should only let visible links through', () => {
    const filtered = pipe.transform(mockList, '', { visible: true });
    // only the first link is not visible
    expect(filtered.length).toEqual(2);
    expect(filtered).not.toContain(mockList[0]);
  });
});
