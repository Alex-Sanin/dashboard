import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';

const createData = (
    userName,
    customerName,
    simulationName,
    date,
    region,
    currency
    // batterySize,
    // batteryPower,
    // batteryCost,
    // pvSize,
    // pvCost,
    // roi
) => {
    return {
        userName,
        customerName,
        simulationName,
        date,
        region,
        currency,
        // batterySize,
        // batteryPower,
        // batteryCost,
        // pvSize,
        // pvCost,
        // roi,
    };
};

const rows = [
    createData('John', 'John', 'A', '2022-02-03', 'Israel', 'NIS'),
    createData('Adam', 'Adam', 'A', '2021-11-22', 'South Africa', 'USD'),
    createData('Robert', 'Robert', 'A', '2023-02-01', 'Israel', 'NIS'),
    createData('Paul', 'Paul', 'A', '2022-06-29', 'Germany', 'EUR'),
    createData('Jason', 'Jason', 'A', '2021-04-18', 'Israel', 'NIS'),
    createData('Chris', 'Chris', 'A', '2023-01-12', 'South Africa', 'USD'),
    createData('Peter', 'Peter', 'A', '2022-04-20', 'Israel', 'NIS'),
    createData('Rick', 'Rick', 'A', '2020-10-11', 'Germany', 'EUR'),
    createData('James', 'James', 'Simulation name', '2022-08-23', 'Israel', 'NIS'),
    createData('Greg', 'Greg', 'A', '2023-01-04', 'Germany', 'EUR'),
    createData('Bruce', 'Bruce', 'A', '2022-09-09', 'South Africa', 'USD'),
    createData('George', 'George', 'A', '2021-12-31', 'South Africa', 'USD'),
    createData('Reggie', 'Reggie', 'A', '2019-05-14', 'Israel', 'NIS'),
    createData('Ben', 'Ben', 'A', '2023-01-31', 'Germany', 'EUR'),
    createData('Tim', 'Tim', 'A', '2020-07-01', 'South Africa', 'USD'),
];

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

const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align="left"
                        padding="normal"
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

const SimulationTable = () => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('userName');
    const [selectedRow, setSelectedRow] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleRowSelect = (row) => {
        selectedRow === row ? setSelectedRow('') : setSelectedRow(row);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    console.log('selected', selectedRow);

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = selectedRow === row.customerName;
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={() => handleRowSelect(row.customerName)}
                                            tabIndex={-1}
                                            key={row.customerName}
                                            style={{
                                                backgroundColor: isItemSelected
                                                    ? '#bfddfc'
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
                                                {row.userName}
                                            </TableCell>
                                            <TableCell align="left">{row.customerName}</TableCell>
                                            <TableCell align="left">{row.simulationName}</TableCell>
                                            <TableCell align="left" style={{ minWidth: '120px' }}>
                                                {row.date}
                                            </TableCell>
                                            <TableCell align="left" style={{ minWidth: '120px' }}>
                                                {row.region}
                                            </TableCell>
                                            <TableCell align="left">{row.currency}</TableCell>
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
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};
export default SimulationTable;
