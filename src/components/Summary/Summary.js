import { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';

import MainTable from './MainTable/MainTable';
import DetailsTable from "./DetailsTable/DetailsTable";

const Summary = () => {
    const [simulationTableData, setSimulationTableData] = useState('');
    const [detailsTableData, setDetailsTableData] = useState('');
    const [error, setError] = useState('');

    const getMainSimulationTableData = async () => {
        const response = await fetch('/sim1/get_simulation_main_table', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        // console.log('GET DATA RESPONSE: ', json);
        setSimulationTableData(Object.values(json));
        if (!response.ok) {
            setError(response?.error?.message);
            console.log('ERROR: ', error);
        }
    };

    useEffect(() => {
        getMainSimulationTableData();
    }, []);

    console.log(detailsTableData)

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
                tableData={simulationTableData}
                setDetailsTableData={setDetailsTableData}
            />
            {/*<DetailsTable tableData={detailsTableData}/>*/}
        </Stack>
    );
};
export default Summary;
