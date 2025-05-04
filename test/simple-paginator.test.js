const { Paginator, SimplePaginator } = require('../dist/index');

test('it can create a paginator', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const paginator = new SimplePaginator(items, 10);

  expect(paginator.items).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

describe('it can json serialize', () => {
  test('with current page in first page', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    Paginator.setBaseUrl('http://localhost');

    const paginator = new SimplePaginator(items, 10);

    expect(paginator.jsonSerialize()).toEqual({
      current_page: 1,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      first_page_url: 'http://localhost/?page=1',
      from: 1,
      next_page_url: 'http://localhost/?page=2',
      path: '/',
      per_page: 10,
      prev_page_url: null,
      to: 10,
    });
  });

  test('with current page in second page', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    Paginator.setBaseUrl('http://localhost');

    const paginator = new SimplePaginator(items, 10, 2);

    expect(paginator.jsonSerialize()).toEqual({
      current_page: 2,
      data: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      first_page_url: 'http://localhost/?page=1',
      from: 11,
      next_page_url: 'http://localhost/?page=3',
      path: '/',
      per_page: 10,
      prev_page_url: 'http://localhost/?page=1',
      to: 20,
    });
  });
});
