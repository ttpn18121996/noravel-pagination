const { Paginator, LengthAwarePaginator } = require('../dist/index');

test('it can set base URL', () => {
  Paginator.setBaseUrl('http://localhost');

  expect(Paginator.getBaseUrl()).toEqual('http://localhost');
});

test('it can set options', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const paginator = new LengthAwarePaginator(items, 20);
  Paginator.setBaseUrl('http://localhost');

  paginator.setOptions({
    path: '/test',
    query: { keyword: 'test' },
    fragment: 'test',
    pageName: 'p',
  });

  expect(paginator.url(2)).toEqual('http://localhost/test?keyword=test&p=2#test');
});

test('it can reset options', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const paginator = new LengthAwarePaginator(items, 20);
  Paginator.setBaseUrl('http://localhost');

  paginator.setOptions({
    path: '/test',
    query: { keyword: 'test' },
    fragment: 'test',
    pageName: 'p',
  });

  paginator.resetOptions();

  expect(paginator.url(2)).toEqual('http://localhost/?page=2');
});
