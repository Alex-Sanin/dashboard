import {useState} from 'react';
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

import Preloader from "../../loaders/Preloader";

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

const EnhancedTableHead = ({order, orderBy, onRequestSort}) => {
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

const MainTable = ({tableData, setDetailsTableData}) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('userName');
    const [selectedRow, setSelectedRow] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [error, setError] = useState('');

    const getDetailsSimulationTableData = async () => {
        const response = await fetch('/sim1/simulation_main_table_selected_row', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        // console.log('GET DATA RESPONSE: ', json);
        setDetailsTableData(Object.values(json));
        if (!response.ok) {
            setError(response?.error?.message);
            console.log('ERROR: ', error);
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleRowSelect = (row) => {
        selectedRow === row ? setSelectedRow('') : setSelectedRow(row);
        getDetailsSimulationTableData();
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
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <TableContainer>
                    <Table sx={{minWidth: 750}} aria-labelledby="tableTitle" size="medium">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={tableData.length}
                        />
                        <TableBody>
                            {stableSort(tableData, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = selectedRow === row.id;
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    return (
                                        <TableRow
                                            hover
                                            onClick={() => handleRowSelect(row.id)}
                                            tabIndex={-1}
                                            key={row['customer name']}
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
                                                {row['user name']}
                                            </TableCell>
                                            <TableCell align="left">{row['customer name']}</TableCell>
                                            <TableCell align="left">{row['simulation name']}</TableCell>
                                            <TableCell align="left" style={{minWidth: '120px'}}>
                                                {row['create time']}
                                            </TableCell>
                                            <TableCell align="left" style={{minWidth: '120px'}}>
                                                {row.region}
                                            </TableCell>
                                            <TableCell align="left">{row?.currency.toUpperCase()}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6}/>
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
    );
};
export default MainTable;
