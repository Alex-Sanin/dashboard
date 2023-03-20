import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Stack } from '@mui/material';

import Preloader from '../../loaders/Preloader';
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
        return b[1] - a[1];
    });
    return stabilizedThis.map((el) => el[0]);
};

const headCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'userName',
        numeric: false,
        disablePadding: true,
        label: 'User name',
    },
    {
        id: 'customerName',
        numeric: false,
        disablePadding: false,
        label: 'Customer name',
    },
    {
        id: 'simulationName',
        numeric: false,
        disablePadding: false,
        label: 'Simulation name',
    },
    {
        id: 'date',
        numeric: false,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'region',
        numeric: false,
        disablePadding: false,
        label: 'Region',
    },
    {
        id: 'currency',
        numeric: false,
        disablePadding: false,
        label: 'Currency',
    },
];

const MainTable = ({ tableData, getMainTableSelectedRowData, getMainTableData }) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id');
    const [selectedRow, setSelectedRow] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleRowSelect = (simulationMainId, userName) => {
        if (selectedRow === simulationMainId) {
            setSelectedRow('');
            getMainTableData();
        } else {
            setSelectedRow(simulationMainId);
            getMainTableSelectedRowData(simulationMainId, userName);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData?.length) : 0;

    if (!tableData) {
        return <Preloader />;
    }

    return (
        <Stack direction="column" spacing={2}>
            <Typography variant="h3">Main table</Typography>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ maxWidth: '100%', mb: 2, px: 3 }}>
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                            <EnhancedTableHead
                                headCells={headCells}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={tableData.length}
                            />
                            <TableBody>
                                {stableSort(tableData, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = selectedRow === row.simulationMainId;
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={() =>
                                                    handleRowSelect(
                                                        row.simulationMainId,
                                                        row.userName
                                                    )
                                                }
                                                tabIndex={-1}
                                                key={row.simulationMainId}
                                                style={{
                                                    backgroundColor: isItemSelected
                                                        ? '#bace9a'
                                                        : 'white',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <TableCell
                                                    align="left"
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="normal"
                                                >
                                                    {row.simulationMainId}
                                                </TableCell>
                                                <TableCell align="left">{row.userName}</TableCell>
                                                <TableCell align="left">
                                                    {row.customerName}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {row.simulationName}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    style={{ minWidth: '100px' }}
                                                >
                                                    {row.createTime}
                                                </TableCell>
                                                <TableCell align="left">{row.region}</TableCell>
                                                <TableCell align="left">
                                                    {row?.currency.toUpperCase()}
                                                </TableCell>
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
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </Stack>
    );
};
export default MainTable;
