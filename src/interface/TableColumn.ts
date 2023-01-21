export default interface TableColumn {
  field: string;
  headerName?: string;
  type?: string;
  width?: number;
  sortable?: boolean;
  disablePadding?: boolean;
  styleColumn?: object;
  styleRow?: object;
  valueGetter?: Function;
}
