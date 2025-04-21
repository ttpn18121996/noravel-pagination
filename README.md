# Noravel pagination

This is a support library for Nam's projects.

# Content

- [Installation](#installation)
- [Usage](#usage)
  - [SimplePaginator](#simplepaginator)
  - [LengthAwarePaginator](#lengthawarepaginator)

## Installation

```bash
npm install @noravel/pagination
```

## Usage

```js
const { LengthAwarePaginator } = require('@noravel/pagination');
const items = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
  81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
];

const paginator = new LengthAwarePaginator(items, 100, 5, 1);

console.log(paginator.jsonSerialize());

/*
{
    current_page: 1,
    data: [1, 2, 3, 4, 5],
    first_page_url: '/?page=1',
    from: 1,
    last_page: 20,
    last_page_url: '/?page=20',
    links: [
        [
            { page: 1, url: '/?page=1', active: true },
            { page: 2, url: '/?page=2', active: false },
            { page: 3, url: '/?page=3', active: false },
            { page: 4, url: '/?page=4', active: false },
        ],
        '...',
        [
            { page: 19, url: '/?page=19', active: false },
            { page: 20, url: '/?page=20', active: false },
        ],
    ],
    next_page_url: '/?page=2',
    path: '/',
    per_page: 5,
    prev_page_url: null,
    to: 5,
    total: 100,
}
*/
```

Sometimes you may wish to create a pagination instance manually,
passing it an array of items that you already have in memory.
You may do so by creating either an `SimplePaginator` or `LengthAwarePaginator` depending on your needs.

### SimplePaginator

The `SimplePaginator` class does not need to know the total number of items in the result set; however, because of this,
this class does not have methods for retrieving the index of the last page.

```ts
new SimplePaginator<T>(items: T[], perPage: number = 10, currentPage: number = 1)
```

Description:
- items: The items to set.
- perPage: The number of items per page.
- currentPage: The current page number.

```js
const { SimplePaginator } = require('@noravel/pagination');
const items = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
  81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
];

const paginator = new SimplePaginator(items, 5, 1);

console.log(paginator.jsonSerialize());

/*
{
  current_page: 1,
  data: [1, 2, 3, 4, 5],
  first_page_url: '/?page=1',
  from: 1,
  next_page_url: '/?page=2',
  path: '/',
  per_page: 5,
  prev_page_url: null,
  to: 5
}
*/
```

### LengthAwarePaginator

The `LengthAwarePaginator` accepts almost the same arguments as the `SimplePaginator`;
however, it requires a count of the total number of items in the result set.

```ts
new LengthAwarePaginator<T>(items: T[], total: number, perPage: number = 10, currentPage: number = 1)
```

Description:
- items: The items to set.
- total: The total number of items in the result set.
- perPage: The number of items per page.
- currentPage: The current page number.

```js
const { LengthAwarePaginator } = require('@noravel/pagination');
const items = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
  81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
];

const paginator = new LengthAwarePaginator(items, 100, 5, 7);

console.log(paginator.jsonSerialize());

/*
{
    current_page: 7,
    data: [31, 32, 33, 34, 35],
    first_page_url: '/?page=1',
    from: 31,
    last_page: 20,
    last_page_url: '/?page=20',
    links: [
        [
            { page: 1, url: '/?page=1', active: false },
            { page: 2, url: '/?page=2', active: false },
        ],
        '...',
        [
            { page: 5, url: '/?page=5', active: false },
            { page: 6, url: '/?page=6', active: false },
            { page: 7, url: '/?page=7', active: true },
            { page: 8, url: '/?page=8', active: false },
            { page: 9, url: '/?page=9', active: false },
        ],
        '...',
        [
            { page: 19, url: '/?page=19', active: false },
            { page: 20, url: '/?page=20', active: false },
        ],
    ],
    next_page_url: '/?page=8',
    path: '/',
    per_page: 5,
    prev_page_url: '/?page=6',
    to: 35,
    total: 100,
}
*/
```

## Configuration

```ts
export type PaginatorOptions = {
  path?: string;
  baseUrl?: string;
  query?: Record<string, unknown>;
  fragment?: any;
  pageName?: string;
};
```
