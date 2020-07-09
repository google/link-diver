import { FilterByRegexPipe } from './filter-by-regex.pipe';

describe('FilterByRegexPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByRegexPipe();
    expect(pipe).toBeTruthy();
  });
});
