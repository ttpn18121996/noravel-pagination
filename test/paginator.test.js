const { LengthAwarePaginator, Paginator } = require('../dist/index');

test('it can set options', () => {
  Paginator.setOptions({
    baseUrl: 'http://localhost',
  });

  expect(Paginator.options.baseUrl).toEqual('http://localhost');
});

test('it can reset options', () => {
  Paginator.setOptions({
    baseUrl: 'http://example.com',
    path: '/products',
    query: { keyword: 'test' },
    pageName: 'p',
  });

  expect(Paginator.getOptions()).toEqual({
    baseUrl: 'http://example.com',
    path: '/products',
    query: { keyword: 'test' },
    pageName: 'p',
    fragment: null,
  });

  Paginator.resetOptions();

  expect(Paginator.getOptions()).toEqual({
    path: '/',
    baseUrl: '',
    query: {},
    pageName: 'page',
    fragment: null,
  });
});
