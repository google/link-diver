import { HighlightMatchPipe } from './highlight-match.pipe';

describe('highlightMatchPipe', () => {
  const pipe = new HighlightMatchPipe();
  const mockUrl = 'https://www.mockurl.com/highlightMe12345';

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should highlight a simple regex with only text', () => {
    const regexArr = [/(highlightMe)/];
    const result = pipe.transform(mockUrl, regexArr);
    expect(result).toContain('<span class="red">highlightMe</span>');
  });

  it('should highlight a simple digit based regex', () => {
    const regexArr = [/(\d{5})/];
    const result = pipe.transform(mockUrl, regexArr);
    expect(result).toContain('<span class="red">12345</span>');
  });

  it('should highlight the whole link with a full regex', () => {
    const regexArr = [/(https?:[/][/]www[.]mockurl[.]com[/][a-zA-Z\d]+)/];
    const result = pipe.transform(mockUrl, regexArr);
    expect(result).toContain('<span class="red">https:');
    expect(result).toContain('12345</span>');
  });

  it('should not highlight anything', () => {
    const regexArr = [/(https?:[/][/]www[.]wrongurl[.]com[/][a-zA-Z\d]+)/];
    const result = pipe.transform(mockUrl, regexArr);
    expect(result).not.toContain('<span class="red">');
  });

  it('should highlight both regexs in the array', () => {
    const regexArr = [/(highlightMe)/, /(\d{5})/];
    const result = pipe.transform(mockUrl, regexArr);
    expect(result).toContain('<span class="red">highlightMe</span>');
    expect(result).toContain('<span class="red">12345</span>');
  });
});
