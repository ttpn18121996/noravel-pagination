import Paginator from './Paginator';

export default class SimplePaginator extends Paginator {
  protected hasMore: boolean = false;

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
   * @returns {Record<string, unknown>}
   */
  public jsonSerialize(): Record<string, unknown> {
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
