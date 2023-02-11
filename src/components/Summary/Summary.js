import { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';

import MainTable from './MainTable/MainTable';
import DetailsTable from './DetailsTable/DetailsTable';
import SummaryBarChart from './SummaryBarChart/SummaryBarChart';

const Summary = () => {
    const [mainTableData, setMainTableData] = useState('');
    const [detailsTableData, setDetailsTableData] = useState('');
    const [barChartData, setBarChartData] = useState('');
    const [error, setError] = useState('');

    const getMainTableData = async () => {
        const response = await fetch('/sim1/run_simulation', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        // console.log('GET DATA RESPONSE: ', json);
        setMainTableData(Object.values(json[1]));
        if (!response.ok) {
            setError(response?.error?.message);
            console.log('ERROR: ', error);
        }
    };

    useEffect(() => {
        getMainTableData();
    }, []);

    console.log(barChartData);

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
            />
            <DetailsTable tableData={detailsTableData} />
            {barChartData && <SummaryBarChart barChartData={barChartData} />}
        </Stack>
    );
};
export default Summary;
