import { _arr, typeOf } from '@noravel/supporter';
import Paginator from './Paginator';
import UrlWindow from './UrlWindow';
import { LengthAwarePagination, UrlRange } from './types/LengthAwarePagination';
import { PaginatorOptions } from './types';

export default class LengthAwarePaginator<T = any> extends Paginator {
  public onEachSide: number = 2;
  public lastPage: number = 1;

  public constructor(
    items: T[],
    public total: number = 0,
    public perPage: number = 10,
    currentPage: number = 1,
    options?: PaginatorOptions,
  ) {
    super(perPage, currentPage, options);
    this.lastPage = Math.ceil(total / perPage);
    this.setItems(items);
  }

  /**
   * Set the items for the paginator.
   *
   * @param {T[]} items The items to set.
   * @returns {void}
   */
  public setItems(items: T[]): void {
    if (items.length > this.perPage) {
      this.items = items.slice(this.currentPage * this.perPage - this.perPage, this.currentPage * this.perPage);
    } else {
      this.items = items;
    }
  }

  /**
   * Set the number of items to show on each side.
   *
   * @param {number} value The number of items to show on each side.
   * @returns {this}
   */
  public setOnEachSide(value: number): this {
    this.onEachSide = value;
    return this;
  }

  /**
   * Get the elements for the paginator.
   *
   * @returns {(string | UrlRange[])[]}
   */
  public elements(): (string | UrlRange[])[] {
    const elements = UrlWindow.make(this);

    return [
      elements.first,
      Array.isArray(elements.slider) ? '...' : null,
      elements.slider,
      Array.isArray(elements.last) ? '...' : null,
      elements.last,
    ].filter(item => item !== null);
  }

  /**
   * Determine if the paginator has more pages.
   *
   * @returns {boolean}
   */
  public hasMorePages(): boolean {
    return this.currentPage < this.lastPage;
  }

  /**
   * Get the URL range for the given start and end.
   *
   * @param {number} start The start of the range.
   * @param {number} end The end of the range.
   * @returns {UrlRange[] | null}
   */
  public getUrlRange(start: number, end: number): UrlRange[] | null {
    if (end <= start) {
      return null;
    }

    return _arr()
      .range(start, end)
      .map(page => {
        return {
          label: `${page}`,
          url: this.url(page),
          active: page == this.currentPage,
        };
      });
  }

  /**
   * Get the JSON representation of the paginator.
   *
   * @returns {LengthAwarePagination<T>}
   */
  public jsonSerialize(): LengthAwarePagination<T> {
    return {
      current_page: this.currentPage,
      data: this.items,
      first_page_url: this.url(1),
      from: this.firstItem(),
      last_page: this.lastPage,
      last_page_url: this.url(this.lastPage),
      links: _arr(this.elements()).reduce((pre: UrlRange[], cur: string | UrlRange[]) => {
        if (typeOf(cur) === 'string') {
          return [...pre, { label: cur, url: null, active: false }];
        }

        return [...pre, ...cur];
      }, [] as UrlRange[]),
      next_page_url: this.nextPageUrl(),
      path: this.path,
      per_page: this.perPage,
      prev_page_url: this.previousPageUrl(),
      to: this.lastItem(),
      total: this.total,
    };
  }

  /**
   * Get the URL for a given page.
   *
   * @param {number} page The page number.
   * @returns {string}
   */
  public url(page: number): string {
    if (this.lastPage < page) {
      page = this.lastPage;
    }

    return super.url(page);
  }
}
