import { _arr } from '@noravel/supporter';
import { UrlRange } from './types/LengthAwarePagination';
import LengthAwarePaginator from './LengthAwarePaginator';

export default class UrlWindow {
  public first: UrlRange[] | null = null;
  public slider: UrlRange[] | null = null;
  public last: UrlRange[] | null = null;

  private constructor(public paginator: LengthAwarePaginator) {}

  public static make(paginator: LengthAwarePaginator) {
    return new UrlWindow(paginator).get();
  }

  /**
   * Get the URL window.
   *
   * @returns {UrlWindow}
   */
  public get() {
    const onEachSide = this.paginator.onEachSide;

    if (this.paginator.lastPage < onEachSide * 2 + 8) {
      return this.getSmallSlider();
    }

    return this.getUrlSlider(onEachSide);
  }

  /**
   * Get the small slider.
   *
   * @returns {UrlWindow}
   */
  public getSmallSlider() {
    return {
      first: this.paginator.getUrlRange(1, this.paginator.lastPage),
      slider: null,
      last: null,
    };
  }

  /**
   * Get the URL slider.
   *
   * @param {number} onEachSide The number of items to show on each side.
   * @returns {UrlWindow}
   */
  public getUrlSlider(onEachSide: number) {
    const window = onEachSide + 4;
    const total = this.paginator.lastPage;
    const currentPage: number = this.paginator.currentPage;

    if (total <= 1) {
      return this;
    }

    this.first = _arr().range(1, total);

    const first = this.paginator.getUrlRange(1, 2);
    const last = this.paginator.getUrlRange(total - 1, total);

    if (currentPage <= window) {
      this.first = this.paginator.getUrlRange(1, window + onEachSide);
      this.last = last;
    } else if (currentPage > total - window) {
      this.first = first;
      this.last = this.paginator.getUrlRange(total - window - onEachSide + 1, total);
    } else {
      this.first = first;
      this.slider = this.paginator.getUrlRange(currentPage - onEachSide, currentPage + onEachSide);
      this.last = last;
    }

    return this;
  }
}
