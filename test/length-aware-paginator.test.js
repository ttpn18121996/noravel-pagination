const { LengthAwarePaginator, Paginator } = require('../dist/index');

test('it can create a paginator', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const paginator = new LengthAwarePaginator(items, 20);

  expect(paginator.items).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

describe('it can json serialize', () => {
  test('with current page in first side', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    Paginator.setOptions({
      baseUrl: 'http://localhost',
    });

    const paginator = new LengthAwarePaginator(items, 20);

    expect(paginator.jsonSerialize()).toEqual({
      current_page: 1,
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      first_page_url: 'http://localhost/?page=1',
      from: 1,
      last_page: 2,
      last_page_url: 'http://localhost/?page=2',
      links: [
        [
          { page: 1, url: 'http://localhost/?page=1', active: true },
          { page: 2, url: 'http://localhost/?page=2', active: false },
        ],
      ],
      next_page_url: 'http://localhost/?page=2',
      path: '/',
      per_page: 10,
      prev_page_url: null,
      to: 10,
      total: 20,
    });
  });

  test('with current page in middle side', () => {
    const items = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
      60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87,
      88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
    ];
    Paginator.setOptions({
      baseUrl: 'http://localhost',
    });

    const paginator = new LengthAwarePaginator(items, 100, 5, 10);

    expect(paginator.jsonSerialize()).toEqual({
      current_page: 10,
      data: [46, 47, 48, 49, 50],
      first_page_url: 'http://localhost/?page=1',
      from: 46,
      last_page: 20,
      last_page_url: 'http://localhost/?page=20',
      links: [
        [
          { page: 1, url: 'http://localhost/?page=1', active: false },
          { page: 2, url: 'http://localhost/?page=2', active: false },
        ],
        '...',
        [
          { page: 8, url: 'http://localhost/?page=8', active: false },
          { page: 9, url: 'http://localhost/?page=9', active: false },
          { page: 10, url: 'http://localhost/?page=10', active: true },
          { page: 11, url: 'http://localhost/?page=11', active: false },
          { page: 12, url: 'http://localhost/?page=12', active: false },
        ],
        '...',
        [
          { page: 19, url: 'http://localhost/?page=19', active: false },
          { page: 20, url: 'http://localhost/?page=20', active: false },
        ],
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
    Paginator.setOptions({
      baseUrl: 'http://localhost',
    });

    const paginator = new LengthAwarePaginator(items, 30, 2, 15);

    expect(paginator.jsonSerialize()).toEqual({
      current_page: 15,
      data: [29, 30],
      first_page_url: 'http://localhost/?page=1',
      from: 29,
      last_page: 15,
      last_page_url: 'http://localhost/?page=15',
      links: [
        [
          { page: 1, url: 'http://localhost/?page=1', active: false },
          { page: 2, url: 'http://localhost/?page=2', active: false },
        ],
        '...',
        [
          { page: 8, url: 'http://localhost/?page=8', active: false },
          { page: 9, url: 'http://localhost/?page=9', active: false },
          { page: 10, url: 'http://localhost/?page=10', active: false },
          { page: 11, url: 'http://localhost/?page=11', active: false },
          { page: 12, url: 'http://localhost/?page=12', active: false },
          { page: 13, url: 'http://localhost/?page=13', active: false },
          { page: 14, url: 'http://localhost/?page=14', active: false },
          { page: 15, url: 'http://localhost/?page=15', active: true },
        ],
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
  Paginator.resetOptions();

  expect(paginator.toJson()).toEqual(
    '{"current_page":1,"data":[1,2,3,4,5,6,7,8,9,10],"first_page_url":"/?page=1","from":1,"last_page":1,"last_page_url":"/?page=1","links":[],"next_page_url":null,"path":"/","per_page":10,"prev_page_url":null,"to":10,"total":10}',
  );
});

test('it can set onEachSide', () => {
  const items = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
    90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
  ];
  Paginator.setOptions({
    baseUrl: 'http://localhost',
  });

  const paginator = new LengthAwarePaginator(items, 100, 5, 10);

  expect(paginator.jsonSerialize()).toEqual({
    current_page: 10,
    data: [46, 47, 48, 49, 50],
    first_page_url: 'http://localhost/?page=1',
    from: 46,
    last_page: 20,
    last_page_url: 'http://localhost/?page=20',
    links: [
      [
        { page: 1, url: 'http://localhost/?page=1', active: false },
        { page: 2, url: 'http://localhost/?page=2', active: false },
      ],
      '...',
      [
        { page: 8, url: 'http://localhost/?page=8', active: false },
        { page: 9, url: 'http://localhost/?page=9', active: false },
        { page: 10, url: 'http://localhost/?page=10', active: true },
        { page: 11, url: 'http://localhost/?page=11', active: false },
        { page: 12, url: 'http://localhost/?page=12', active: false },
      ],
      '...',
      [
        { page: 19, url: 'http://localhost/?page=19', active: false },
        { page: 20, url: 'http://localhost/?page=20', active: false },
      ],
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
      [
        { page: 1, url: 'http://localhost/?page=1', active: false },
        { page: 2, url: 'http://localhost/?page=2', active: false },
      ],
      '...',
      [
        { page: 9, url: 'http://localhost/?page=9', active: false },
        { page: 10, url: 'http://localhost/?page=10', active: true },
        { page: 11, url: 'http://localhost/?page=11', active: false },
      ],
      '...',
      [
        { page: 19, url: 'http://localhost/?page=19', active: false },
        { page: 20, url: 'http://localhost/?page=20', active: false },
      ],
    ],
    next_page_url: 'http://localhost/?page=11',
    path: '/',
    per_page: 5,
    prev_page_url: 'http://localhost/?page=9',
    to: 50,
    total: 100,
  });
});
