import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import TableColumn from '../../interface/TableColumn';
import React from 'react';

interface Props {
  columns: TableColumn[];
  content: any[];
  count: number;
  page: number;
  noContentText: string;
  handlePageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
}

const TableApp = ({ content, columns, handlePageChange, count, page, noContentText }: Props) => {

  function findColumnByField(field: string) {
    return columns.filter((column) => column.field === field)[0];
  }

  const fields: string[] = [];
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          size='small'
          aria-label='a dense table'>
          <TableHead>
            <TableRow>
              {columns.map((column, idx) => {

                fields.push(column.field);

                return (
                  <TableCell
                    key={column.field + '-' + idx}
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      width: column.width ? column.width : 80,
                      ...column.styleColumn
                    }}>
                    {column.headerName}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {content.length < 1 ? (
              <TableRow>
                <TableCell colSpan={6}>{noContentText}</TableCell>
              </TableRow>
            ) : (
              content.map((row: any|undefined, index: number) => {
                return (
                  <TableRow
                    key={row.name + '-' + index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {fields.map((fieldName, idx) => {
                      // @ts-ignore
                      return (
                        <TableCell
                          key={row[fieldName] + '-' + fieldName + '-' + idx}
                          style={{
                            textAlign: 'center',
                            maxWidth: 200, // percentage also works
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            ...findColumnByField(fieldName).styleRow
                          }}>
                          {findColumnByField(fieldName).valueGetter
                            // @ts-ignore
                            ? findColumnByField(fieldName).valueGetter(row)
                            : row[fieldName]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10]}
        component='div'
        count={count}
        rowsPerPage={10}
        page={page}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default TableApp;
