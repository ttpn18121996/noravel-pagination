import {Pagination} from './Pagiantion';

export type UrlRange = {
  page: number;
  url: string;
};

export interface LengthAwarePagination<T> extends Pagination<T> {
  last_page: number;
  last_page_url: string | null;
  links: (string | UrlRange[])[];
  total: number;
}
