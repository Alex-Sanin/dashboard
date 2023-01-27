import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

];

const PL = () => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Customer name</TableCell>
                        <TableCell align="center">Battery size</TableCell>
                        <TableCell align="center">Battery power</TableCell>
                        <TableCell align="center">Battery cost</TableCell>
                        <TableCell align="center">PV size</TableCell>
                        <TableCell align="center">PV cost</TableCell>
                        <TableCell align="center">Customer name</TableCell>
                        <TableCell align="center">Battery size</TableCell>
                        <TableCell align="center">Battery power</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">{row.customerName}</TableCell>
                            <TableCell align="center">{row.batterySize}</TableCell>
                            <TableCell align="center">{row.batteryPower}</TableCell>
                            <TableCell align="center">{row.batteryCost}</TableCell>
                            <TableCell align="center">{row.pvSize}</TableCell>
                            <TableCell align="center">{row.pvCost}</TableCell>
                            <TableCell align="center">{row.customerName}</TableCell>
                            <TableCell align="center">{row.batterySize}</TableCell>
                            <TableCell align="center">{row.batteryPower}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PL;
