export default interface DataPageable {
  content: Object[];
  totalElements: number;
  pageable: {
    pageNumber: number;
  }

}
