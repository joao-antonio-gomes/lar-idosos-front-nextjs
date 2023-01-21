export default interface Pageable {
  content: Object[];
  totalElements: number;
  pageable: {
    pageNumber: number;
  }

}
