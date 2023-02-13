import { useState } from 'react';
import { Stack, Typography } from '@mui/material';

import MainTable from './MainTable/MainTable';
import DetailsTable from './DetailsTable/DetailsTable';
import SummaryBarChart from './SummaryBarChart/SummaryBarChart';

const Summary = ({mainTableData, setPlSummaryTable}) => {
    const [detailsTableData, setDetailsTableData] = useState('');
    const [barChartData, setBarChartData] = useState('');

    return (
        <Stack
            direction="column"
            spacing={4}
            sx={{
                py: 4,
                px: 3,
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                boxShadow: '0px 1px 15px rgba(0, 0, 0, 0.04)',
            }}
        >
            <Typography variant="h2">Summary</Typography>
            <MainTable
                tableData={mainTableData}
                setDetailsTableData={setDetailsTableData}
                setBarChartData={setBarChartData}
                setPlSummaryTable={setPlSummaryTable}
            />
            <DetailsTable tableData={detailsTableData} />
            {barChartData && <SummaryBarChart barChartData={barChartData} />}
        </Stack>
    );
};
export default Summary;
