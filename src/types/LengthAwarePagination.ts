import { Pagination } from './Pagiantion';

export type UrlRange = {
  label: string;
  url: string | null;
  active?: boolean;
};

export interface LengthAwarePagination<T> extends Pagination<T> {
  last_page: number;
  last_page_url: string | null;
  links: (string | UrlRange[])[];
  total: number;
}
