import Paginator from './Paginator';
import {Pagination} from './types/Pagiantion';

export default class SimplePaginator extends Paginator {
  public hasMore: boolean = false;

  constructor(
    items: any[],
    public perPage: number = 10,
    currentPage: number = 1,
  ) {
    super(perPage, currentPage);
    this.setItems(items);
  }

  /**
   * Set the items for the paginator.
   *
   * @param {any[]} items The items to set.
   * @returns {void}
   */
  public setItems(items: any[]) {
    this.hasMore = items.length > this.perPage;

    if (items.length > this.perPage) {
      this.items = items.slice(this.currentPage * this.perPage - this.perPage, this.currentPage * this.perPage);
    } else {
      this.items = items;
    }
  }

  /**
   * Determine if the paginator has more pages.
   *
   * @returns {boolean}
   */
  public hasMorePages(): boolean {
    return this.hasMore;
  }

  /**
   * Get the JSON representation of the paginator.
   *
   * @returns {Pagination<T>}
   */
  public jsonSerialize<T>(): Pagination<T> {
    return {
      current_page: this.currentPage,
      data: this.items,
      first_page_url: this.url(1),
      from: this.firstItem(),
      next_page_url: this.nextPageUrl(),
      path: this.path,
      per_page: this.perPage,
      prev_page_url: this.previousPageUrl(),
      to: this.lastItem(),
    };
  }
}
