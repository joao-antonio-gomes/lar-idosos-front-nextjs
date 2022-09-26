import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@mui/material';

export function TableApp({ result, columns, handlePageChange, count, offset }) {
  function findColumnByField(field) {
    return columns.filter((column) => column.field === field)[0];
  }

  const columnsArray = [];
  return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                {columns.map((column, idx) => {
                  columnsArray.push(column.field);
                  return (
                      <TableCell key={column.field + '-' + idx} style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        width: column.width ? column.width : 80,
                        ...column.styleColumn,
                      }}>
                        {column.headerName}
                      </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {result.length < 1 ?
                  <TableRow>
                    <TableCell colSpan={6}>
                      Não foi encontrado nenhum paciente.
                    </TableCell>
                  </TableRow>
                  :
                  result.map((row, idx) => (
                      <TableRow
                          key={row.name + '-' + idx}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        {columnsArray.map((column, idx) => {
                          return (
                              <TableCell key={row[column] + '-' + column + '-' + idx}
                                         style={{ textAlign: 'center', ...findColumnByField(column).styleRow }}>
                                {findColumnByField(column).valueGetter ? findColumnByField(column).valueGetter(row) : row[column]}
                              </TableCell>
                          );
                        })}
                      </TableRow>
                  ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10]}
            component='div'
            count={count}
            rowsPerPage={10}
            page={offset}
            onPageChange={handlePageChange}
        />
      </>
  );
}
