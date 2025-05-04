const { LengthAwarePaginator, Paginator } = require('../dist/index');

test('it can create a paginator', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const paginator = new LengthAwarePaginator(items, 20);

  expect(paginator.items).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

describe('it can json serialize', () => {
  test('with current page in first side', () => {
    const items = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
      60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87,
      88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
    ];
    Paginator.setBaseUrl('http://localhost');

    const paginator = new LengthAwarePaginator(items, 100, 5, 1);

    expect(paginator.jsonSerialize()).toEqual({
      current_page: 1,
      data: [1, 2, 3, 4, 5],
      first_page_url: 'http://localhost/?page=1',
      from: 1,
      last_page: 20,
      last_page_url: 'http://localhost/?page=20',
      links: [
        { label: '1', url: 'http://localhost/?page=1', active: true },
        { label: '2', url: 'http://localhost/?page=2', active: false },
        { label: '3', url: 'http://localhost/?page=3', active: false },
        { label: '4', url: 'http://localhost/?page=4', active: false },
        { label: '5', url: 'http://localhost/?page=5', active: false },
        { label: '6', url: 'http://localhost/?page=6', active: false },
        { label: '7', url: 'http://localhost/?page=7', active: false },
        { label: '8', url: 'http://localhost/?page=8', active: false },
        { label: '...', url: null, active: false },
        { label: '19', url: 'http://localhost/?page=19', active: false },
        { label: '20', url: 'http://localhost/?page=20', active: false },
      ],
      next_page_url: 'http://localhost/?page=2',
      path: '/',
      per_page: 5,
      prev_page_url: null,
      to: 5,
      total: 100,
    });
  });

  test('with current page in middle side', () => {
    const items = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
      60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87,
      88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
    ];
    Paginator.setBaseUrl('http://localhost');

    const paginator = new LengthAwarePaginator(items, 100, 5, 10);

    expect(paginator.jsonSerialize()).toEqual({
      current_page: 10,
      data: [46, 47, 48, 49, 50],
      first_page_url: 'http://localhost/?page=1',
      from: 46,
      last_page: 20,
      last_page_url: 'http://localhost/?page=20',
      links: [
        { label: '1', url: 'http://localhost/?page=1', active: false },
        { label: '2', url: 'http://localhost/?page=2', active: false },
        { label: '...', url: null, active: false },
        { label: '8', url: 'http://localhost/?page=8', active: false },
        { label: '9', url: 'http://localhost/?page=9', active: false },
        { label: '10', url: 'http://localhost/?page=10', active: true },
        { label: '11', url: 'http://localhost/?page=11', active: false },
        { label: '12', url: 'http://localhost/?page=12', active: false },
        { label: '...', url: null, active: false },
        { label: '19', url: 'http://localhost/?page=19', active: false },
        { label: '20', url: 'http://localhost/?page=20', active: false },
      ],
      next_page_url: 'http://localhost/?page=11',
      path: '/',
      per_page: 5,
      prev_page_url: 'http://localhost/?page=9',
      to: 50,
      total: 100,
    });
  });

  test('with current page in last side', () => {
    const items = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    ];
    Paginator.setBaseUrl('http://localhost');

    const paginator = new LengthAwarePaginator(items, 30, 2, 15);

    expect(paginator.jsonSerialize()).toEqual({
      current_page: 15,
      data: [29, 30],
      first_page_url: 'http://localhost/?page=1',
      from: 29,
      last_page: 15,
      last_page_url: 'http://localhost/?page=15',
      links: [
        { label: '1', url: 'http://localhost/?page=1', active: false },
        { label: '2', url: 'http://localhost/?page=2', active: false },
        { label: '...', url: null, active: false },
        { label: '8', url: 'http://localhost/?page=8', active: false },
        { label: '9', url: 'http://localhost/?page=9', active: false },
        { label: '10', url: 'http://localhost/?page=10', active: false },
        { label: '11', url: 'http://localhost/?page=11', active: false },
        { label: '12', url: 'http://localhost/?page=12', active: false },
        { label: '13', url: 'http://localhost/?page=13', active: false },
        { label: '14', url: 'http://localhost/?page=14', active: false },
        { label: '15', url: 'http://localhost/?page=15', active: true },
      ],
      next_page_url: null,
      path: '/',
      per_page: 2,
      prev_page_url: 'http://localhost/?page=14',
      to: 30,
      total: 30,
    });
  });
});

test('it can covert to json', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const paginator = new LengthAwarePaginator(items, 10);

  expect(paginator.toJson()).toEqual(
    '{"current_page":1,"data":[1,2,3,4,5,6,7,8,9,10],"first_page_url":"http://localhost/?page=1","from":1,"last_page":1,"last_page_url":"http://localhost/?page=1","links":[],"next_page_url":null,"path":"/","per_page":10,"prev_page_url":null,"to":10,"total":10}',
  );
});

test('it can set onEachSide', () => {
  const items = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
    90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
  ];
  Paginator.setBaseUrl('http://localhost');

  const paginator = new LengthAwarePaginator(items, 100, 5, 10);

  expect(paginator.jsonSerialize()).toEqual({
    current_page: 10,
    data: [46, 47, 48, 49, 50],
    first_page_url: 'http://localhost/?page=1',
    from: 46,
    last_page: 20,
    last_page_url: 'http://localhost/?page=20',
    links: [
      { label: '1', url: 'http://localhost/?page=1', active: false },
      { label: '2', url: 'http://localhost/?page=2', active: false },
      { label: '...', url: null, active: false },
      { label: '8', url: 'http://localhost/?page=8', active: false },
      { label: '9', url: 'http://localhost/?page=9', active: false },
      { label: '10', url: 'http://localhost/?page=10', active: true },
      { label: '11', url: 'http://localhost/?page=11', active: false },
      { label: '12', url: 'http://localhost/?page=12', active: false },
      { label: '...', url: null, active: false },
      { label: '19', url: 'http://localhost/?page=19', active: false },
      { label: '20', url: 'http://localhost/?page=20', active: false },
    ],
    next_page_url: 'http://localhost/?page=11',
    path: '/',
    per_page: 5,
    prev_page_url: 'http://localhost/?page=9',
    to: 50,
    total: 100,
  });

  paginator.setOnEachSide(1);

  expect(paginator.jsonSerialize()).toEqual({
    current_page: 10,
    data: [46, 47, 48, 49, 50],
    first_page_url: 'http://localhost/?page=1',
    from: 46,
    last_page: 20,
    last_page_url: 'http://localhost/?page=20',
    links: [
      { label: '1', url: 'http://localhost/?page=1', active: false },
      { label: '2', url: 'http://localhost/?page=2', active: false },
      { label: '...', url: null, active: false },
      { label: '9', url: 'http://localhost/?page=9', active: false },
      { label: '10', url: 'http://localhost/?page=10', active: true },
      { label: '11', url: 'http://localhost/?page=11', active: false },
      { label: '...', url: null, active: false },
      { label: '19', url: 'http://localhost/?page=19', active: false },
      { label: '20', url: 'http://localhost/?page=20', active: false },
    ],
    next_page_url: 'http://localhost/?page=11',
    path: '/',
    per_page: 5,
    prev_page_url: 'http://localhost/?page=9',
    to: 50,
    total: 100,
  });
});

describe('it can handle page values ​​that exceed the valid range', () => {
  test('with current page is less than 1', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const paginator = new LengthAwarePaginator(items, 10);
    Paginator.setBaseUrl('http://localhost');

    expect(paginator.url(0)).toBe('http://localhost/?page=1');
  });

  test('with current page is greater than last page', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const paginator = new LengthAwarePaginator(items, 10, 5, 11);
    Paginator.setBaseUrl('http://localhost');

    expect(paginator.url(11)).toBe('http://localhost/?page=2');
  });
});
