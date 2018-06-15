export class Page<T> {
  results: T[];
  resultPerPage: number;
  currentPage: number;
  maxPage: number;
  numberOfElements: number;
}
