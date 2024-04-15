import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';

import Preloader from '../../../components/loaders/Preloader';
import { dataFormatter } from '../../../utils/functions';
import DescriptiveText from '../../DescriptiveText/DescriptiveText';
import React from 'react';

const PlTable = ({ tableData, tableName, descriptiveText }) => {
    const isCellsName = (cell) => {
        return (
            cell.toLowerCase().includes('cost') ||
            cell.toLowerCase().includes('investment') ||
            cell.toLowerCase().includes('revenue') ||
            cell.toLowerCase().includes('profit') ||
            cell.toLowerCase().includes('income') ||
            cell.toLowerCase().includes('cash')
        );
    };

    const cellFormatter = (cell) => {
        if (cell === '') {
            return cell;
        }
        if (isCellsName(cell)) {
            return cell + ' ($)';
        }
        if (cell.toLowerCase().includes('roi')) {
            return cell + ' (year)';
        }
        if (cell.match(/[a-zA-Z]/)) {
            return cell;
        }
        if (
            cell.length === 4 &&
            (cell.startsWith('202') ||
                cell.startsWith('203') ||
                cell.startsWith('204') ||
                cell.startsWith('205'))
        ) {
            return cell;
        }
        return dataFormatter(cell);
    };

    if (!tableData) {
        return <Paper sx={{ p: 5 }}>No PI table to display</Paper>;
    }
    return (
        <Stack direction="column" spacing={2} sx={{ width: '100%', position: 'relative' }}>
            <Typography variant="h3">{tableName}</Typography>
            <DescriptiveText text={descriptiveText} top="-25px" left="200px" l />
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ maxWidth: '100%', mb: 2, px: 3 }}>
                    <TableContainer>
                        <Table aria-labelledby="tableTitle" size="medium">
                            <TableBody>
                                {tableData.map((row, index) => (
                                    <TableRow hover key={index}>
                                        {row.map((cell, index) => (
                                            <TableCell key={index}>{cellFormatter(cell)}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </Stack>
    );
};
export default PlTable;
