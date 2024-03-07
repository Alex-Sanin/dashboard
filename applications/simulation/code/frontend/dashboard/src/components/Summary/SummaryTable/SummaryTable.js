import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Grid } from '@mui/material';

const columns = [
    { id: 'runningId', label: 'Running ID', minWidth: 100, align: 'center' },
    { id: 'customerName', label: 'Customer name', minWidth: 170, align: 'center' },
    {
        id: 'simulationName',
        label: 'Simulation name',
        minWidth: 150,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'batterySize',
        label: 'Battery size',
        unit: '(MWh)',
        minWidth: 120,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'batteryPower',
        label: 'Battery power',
        unit: '(MW)',
        minWidth: 120,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'batteryCost',
        label: 'Battery cost',
        unit: '(USD)',
        minWidth: 120,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'pvSize',
        label: 'PV Size',
        unit: '(MW)',
        minWidth: 120,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'pvCost',
        label: 'PV cost',
        unit: '(USD)',
        minWidth: 120,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'roi',
        label: 'ROI',
        unit: '(years)',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toFixed(2),
    },
];

function createData(
    runningId,
    customerName,
    simulationName,
    batterySize,
    batteryPower,
    batteryCost,
    pvSize,
    pvCost,
    roi
) {
    return {
        runningId,
        customerName,
        simulationName,
        batterySize,
        batteryPower,
        batteryCost,
        pvSize,
        pvCost,
        roi,
    };
}

const rows = [
    createData(1, 'John', 'A', 10000, 111, 222, 333, 444, 555),
    createData(2, 'Adam', 'A', 18000, 111, 222, 333, 444, 555),
    createData(3, 'Robert', 'A', 1000, 111, 222, 333, 444, 555),
    createData(4, 'Paul', 'A', 20000, 111, 222, 333, 444, 555),
    createData(5, 'Jason', 'A', 12000, 111, 222, 333, 444, 555),
    createData(6, 'Chris', 'A', 18000, 111, 222, 333, 444, 555),
    createData(7, 'Peter', 'A', 10000, 111, 222, 333, 444, 555),
    createData(8, 'Rick', 'A', 15000, 111, 222, 333, 444, 555),
    createData(9, 'James', 'Simulation name', 12000, 111, 222, 333, 444, 555),
    createData(10, 'Greg', 'A', 18000, 111, 222, 333, 444, 555),
    createData(11, 'Bruce', 'A', 12000, 111, 222, 333, 444, 555),
    createData(12, 'George', 'A', 20000, 111, 222, 333, 444, 555),
    createData(13, 'Reggie', 'A', 18000, 111, 222, 333, 444, 555),
    createData(14, 'Ben', 'A', 12000, 111, 222, 333, 444, 555),
    createData(15, 'Tim', 'A', 20000, 111, 222, 333, 444, 555),
];

const SummaryTable = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    // style={{ minWidth: column.minWidth }}
                                >
                                    <Grid container direction="column">
                                        <Grid item>{column.label}</Grid>
                                        {column.unit && <Grid item>{column.unit}</Grid>}
                                    </Grid>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.runningId}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default SummaryTable;
