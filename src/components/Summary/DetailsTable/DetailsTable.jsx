import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';

import EnhancedTableHead from '../EnhancedTableHead';

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
};

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
};

const headCells = [
    {
        id: 'simulationDetailId',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'batterySize',
        numeric: false,
        disablePadding: false,
        label: 'Battery size',
    },
    {
        id: 'batteryPower',
        numeric: false,
        disablePadding: false,
        label: 'Battery power',
    },
    {
        id: 'batteryCost',
        numeric: false,
        disablePadding: false,
        label: 'Battery cost',
    },
    {
        id: 'pvSize',
        numeric: false,
        disablePadding: false,
        label: 'PV size',
    },
    {
        id: 'pvCost',
        numeric: false,
        disablePadding: false,
        label: 'PV cost',
    },
    {
        id: 'gridConnection',
        numeric: false,
        disablePadding: false,
        label: 'Grid connection',
    },
    {
        id: 'roi',
        numeric: false,
        disablePadding: false,
        label: 'ROI',
    },
    {
        id: 'outputFile',
        numeric: false,
        disablePadding: false,
        label: 'Output file',
    },
];

const DetailsTable = ({ tableData }) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('userName');
    // const [selectedRow, setSelectedRow] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // const handleRowSelect = (row) => {
    //     selectedRow === row ? setSelectedRow('') : setSelectedRow(row);
    // };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData?.length) : 0;

    // if (!tableData) {
    //     return <Preloader />;
    // }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ maxWidth: '100%', mb: 2, px: 3 }}>
                <TableContainer>
                    <Table
                        // sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size="medium"
                    >
                        <EnhancedTableHead
                            headCells={headCells}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={tableData.length}
                        />
                        {tableData && (
                            <TableBody>
                                {stableSort(tableData, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        // const isItemSelected = selectedRow === row.simulationsDetailsId;
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                hover
                                                // onClick={() => handleRowSelect(row.simulationsDetailsId)}
                                                tabIndex={-1}
                                                key={row.simulationsDetailsId}
                                                // style={{
                                                //     backgroundColor: isItemSelected
                                                //         ? '#bfddfc'
                                                //         : 'white',
                                                //     cursor: 'pointer',
                                                // }}
                                            >
                                                <TableCell
                                                    align="left"
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                >
                                                    {row.simulationsDetailsId}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.batterySize}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.batteryPower}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.batteryCost}
                                                </TableCell>
                                                <TableCell align="left">{row.pvSize}</TableCell>
                                                <TableCell align="left">{row.pvCost}</TableCell>
                                                <TableCell align="left">{row.roi}</TableCell>
                                                <TableCell align="left">
                                                    {row.gridConnection}
                                                </TableCell>
                                                <TableCell align="left">{row.outputFile}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: 53 * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
                {!tableData && (
                    <Stack justifyContent="center" alignItems="center" sx={{p: 2}}>
                        <Typography variant="h3" style={{color: '#1665c1'}}>Please select a row in the table above</Typography>
                    </Stack>
                )}
                {tableData && (
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </Paper>
        </Box>
    );
};
export default DetailsTable;
