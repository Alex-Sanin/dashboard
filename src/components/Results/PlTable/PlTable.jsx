import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';

import Preloader from '../../../components/loaders/Preloader'

const PlTable = ({ tableData, tableName }) => {
    if (!tableData) {
        return <Preloader />;
    }
    return (
        <Stack direction="column" spacing={2}>
            <Typography variant="h3">{tableName}</Typography>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ maxWidth: '100%', mb: 2, px: 3 }}>
                    <TableContainer>
                        <Table aria-labelledby="tableTitle" size="medium">
                            <TableBody>
                                {tableData.map((row, index) => (
                                    <TableRow hover key={index}>
                                        {row.map((cell, index) => (
                                            <TableCell key={index}>{cell}</TableCell>
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
