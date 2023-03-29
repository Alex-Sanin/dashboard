import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';

import Preloader from '../../../components/loaders/Preloader';
import TableHead from '@mui/material/TableHead';
import { DescriptiveTextContext } from '../../../utils/DescriptiveTextContext';
import DescriptiveText from "../../DescriptiveText/DescriptiveText";

const ExecutiveSummaryTable = ({ tableData }) => {
    const { descriptiveText } = useContext(DescriptiveTextContext);

    const tableHead = Object.keys(tableData).map((headCell) => {
        if (headCell === 'graph_title') {
            return '';
        }
        return headCell;
    });

    const transformData = (data) => {
        const npvValues = ['NPV (NIS)'];
        const irrValues = ['IRR'];

        for (const key in data) {
            if (key === 'graph_title') {
                continue;
            }

            npvValues.push(data[key].NPV);
            irrValues.push(data[key].IRR);
        }
        return [npvValues, irrValues];
    };

    const tableBody = transformData(tableData);

    if (!tableData) {
        return <Preloader />;
    }

    return (
        <Stack direction="column" spacing={2} sx={{ position: 'relative', width: '100%'}}>
            <Typography variant="h3">{tableData.graph_title}</Typography>
            <DescriptiveText
                text={descriptiveText.executiveSummaryNpvIrrTable}
                top="-85px"
                left="80px"
                bl
            />
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ maxWidth: '100%' }}>
                    <Table aria-labelledby="tableTitle" size="medium">
                        <TableHead>
                            <TableRow>
                                {tableHead.map((headCell) => (
                                    <TableCell key={headCell + '_head_cell'}>
                                        {headCell.replace('_', ' ')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableBody.map((row, index) => (
                                <TableRow hover key={index + '_row'}>
                                    {row.map((cell, index) => (
                                        <TableCell key={index + '_body_cell'}>{cell}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Box>
        </Stack>
    );
};
export default ExecutiveSummaryTable;
