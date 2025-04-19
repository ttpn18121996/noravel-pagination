import { _obj, _str } from '@noravel/supporter';

export type PaginatorOptions = {
  path?: string;
  baseUrl?: string;
  query?: any;
  fragment?: any;
  pageName?: string;
};

export const initOptions: PaginatorOptions = {
  path: '/',
  query: null,
  fragment: null,
  pageName: 'page',
};

export default abstract class Paginator {
  private static options: PaginatorOptions = { ...initOptions };
  public items: any[] = [];
  public path: string;
  public pageName: string;
  public currentPage: number;

  public constructor(
    public perPage: number = 10,
    currentPage: number = 1,
  ) {
    this.path = Paginator.getOptions('path') ?? '/';
    this.pageName = Paginator.getOptions('pageName') ?? 'page';
    this.currentPage = parseInt(`${currentPage}`);
  }

  /**
   * Set the items for the paginator.
   *
   * @param {any[]} items The items to set.
   */
  abstract setItems(items: any[]): void;

  /**
   * Determine if the paginator has more pages.
   *
   * @returns {boolean}
   */
  abstract hasMorePages(): boolean;

  /**
   * Get the JSON representation of the paginator.
   *
   * @returns {Record<string, unknown>}
   */
  abstract jsonSerialize(): Record<string, unknown>;

  /**
   * Get the ordinal number of the first element of the current page.
   *
   * @returns {number}
   */
  public firstItem(): number {
    return this.items.length > 0 ? this.perPage * (this.currentPage - 1) + 1 : 1;
  }

  /**
   * Get the ordinal number of the last element of the current page.
   *
   * @returns {number}
   */
  public lastItem(): number {
    return this.items.length > 0 ? this.perPage * this.currentPage : 1;
  }

  /**
   * Get the URL for the next page.
   *
   * @returns {string | null}
   */
  public nextPageUrl(): string | null {
    if (this.hasMorePages()) {
      return this.url(this.currentPage + 1);
    }

    return null;
  }

  /**
   * Get the URL for the previous page.
   *
   * @returns {string | null}
   */
  public previousPageUrl(): string | null {
    if (this.currentPage > 1) {
      return this.url(this.currentPage - 1);
    }

    return null;
  }

  /**
   * Get the URL for a given page.
   *
   * @param {number} page The page number.
   * @returns {string}
   */
  public url(page: number): string {
    let base = Paginator.getOptions('baseUrl') ?? '';

    if (page <= 0) {
      page = 1;
    }

    return _str(this.path)
      .prepend(base)
      .append(_obj.toQueryString({ [this.pageName]: page }))
      .toString();
  }

  /**
   * Get a JSON string representation of the paginator.
   *
   * @returns {string}
   */
  public toJson(): string {
    return JSON.stringify(this.jsonSerialize());
  }

  /**
   * An alias of toJson method.
   *
   * @returns {string}
   */
  public toString(): string {
    return this.toJson();
  }

  /**
   * Set the options for the paginator.
   *
   * @param {PaginatorOptions} options The options to set.
   */
  public static setOptions(options: PaginatorOptions) {
    Paginator.options = { ...Paginator.options, ...options };
  }

  /**
   * Get the options for the paginator by key.
   * If no key is provided, return all options.
   *
   * @param {string} [key] The key to get.
   * @returns {PaginatorOptions | unknown}
   */
  public static getOptions(key?: string) {
    if (key) {
      return _obj.get(Paginator.options, key);
    }

    return Paginator.options;
  }

  /**
   * Reset the options for the paginator.
   */
  public static resetOptions() {
    Paginator.options = { ...initOptions };
  }
}
