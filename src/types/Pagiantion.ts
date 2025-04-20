export interface Pagination<T> {
  current_page: number;
  data: T[];
  first_page_url: string | null;
  from: number;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
}
