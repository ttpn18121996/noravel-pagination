import { _obj, _str } from '@noravel/supporter';
import { PaginatorOptions } from './types/Pagiantion';

export const initOptions: PaginatorOptions = {
  path: '/',
  query: {},
  fragment: null,
  pageName: 'page',
};

export default abstract class Paginator<T = any> {
  public static baseUrl: string = '';
  public items: T[] = [];
  public path: string;
  public pageName: string;
  public currentPage: number;
  public options: PaginatorOptions;

  public constructor(
    public perPage: number = 10,
    currentPage: number = 1,
    options?: PaginatorOptions,
  ) {
    this.options = options ? options : { ...initOptions };
    this.path = _obj.get(this.options, 'path', '/');
    this.pageName = _obj.get(this.options, 'pageName', 'page');
    this.currentPage = parseInt(`${currentPage}`);
  }

  /**
   * Set the items for the paginator.
   *
   * @param {T[]} items The items to set.
   */
  abstract setItems(items: T[]): void;

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
  abstract jsonSerialize(): unknown;

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
    let base = Paginator.getBaseUrl();

    if (page <= 0) {
      page = 1;
    }

    const fragment = this.getOptions('fragment');

    return _str(this.path)
      .prepend(base)
      .append(_obj.toQueryString({ ...this.getOptions('query'), [this.pageName]: page }))
      .append(fragment ? `#${fragment}` : '')
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
   * @returns {this}
   */
  public setOptions(options: PaginatorOptions): this {
    this.options = { ...this.options, ...options };
    this.path = _obj.get(this.options, 'path', '/');
    this.pageName = _obj.get(this.options, 'pageName', 'page');

    return this;
  }

  /**
   * Get the options for the paginator by key.
   * If no key is provided, return all options.
   *
   * @param {string} [key] The key to get.
   * @returns {PaginatorOptions | unknown}
   */
  public getOptions(key?: string) {
    if (key) {
      return _obj.get(this.options, key);
    }

    return this.options;
  }

  /**
   * Reset the options for the paginator.
   *
   * @returns {this}
   */
  public resetOptions(): this {
    this.setOptions(initOptions);

    return this;
  }

  /**
   * Set the base URL for the paginator.
   *
   * @param {string} baseUrl The base URL to set.
   * @returns {void}
   */
  public static setBaseUrl(baseUrl: string): void {
    Paginator.baseUrl = baseUrl;
  }

  /**
   * Get the base URL for the paginator.
   *
   * @returns {string}
   */
  public static getBaseUrl(): string {
    return Paginator.baseUrl;
  }
}
