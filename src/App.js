// Global imports
import { useEffect, useState } from 'react';
import { ThemeProvider as MaterialThemeProvider } from '@mui/material/styles';
import { Grid, Stack } from '@mui/material';

// Local imports
import Header from './components/Header/Header';
import Configuration from './components/Configuration/Configuration';
import Summary from './components/Summary/Summary';
import Result from './components/Results/Results';
import { materialTheme } from './theme';

import './App.css';

const App = () => {
    const [mainTableData, setMainTableData] = useState('');
    const [plSummaryTable, setPlSummaryTable] = useState('');
    const [plCashFlowGraph, setPlCashFlowGraph] = useState('');
    const [plDetailsTable, setPlDetailsTable] = useState('');
    const [plDiagram, setPlDiagram] = useState('');

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
        setPlSummaryTable(Object.values(json[8]));
        setPlCashFlowGraph(Object.values(json[10]));
        setPlDetailsTable(Object.values(json[12]));
        setPlDiagram(Object.values(json[14]));
        // if (!response.ok) {
        //     setError(response?.error?.message);
        //     console.log('ERROR: ', error);
        // }
    };

    useEffect(() => {
        getMainTableData();

    }, []);

    return (
        <MaterialThemeProvider theme={materialTheme}>
            <Stack
                direction="column"
                sx={{
                    width: '100%',
                    minHeight: '100vh',
                    pb: 10,
                    backgroundColor: '#E5E5E5',
                    gap: '40px',
                }}
            >
                <Header />
                <Grid container spacing={3} sx={{ px: 10 }}>
                    <Grid item sm={12} md={4}>
                        <Configuration />
                    </Grid>
                    <Grid item sm={12} md={8}>
                        <Stack direction="column" spacing={3}>
                            <Summary
                                mainTableData={mainTableData}
                                setPlSummaryTable={setPlSummaryTable}
                            />
                            <Result
                                plSummaryTable={plSummaryTable}
                                plCashFlowGraph={plCashFlowGraph}
                                plDetailsTable={plDetailsTable}
                                plDiagram={plDiagram}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        </MaterialThemeProvider>
    );
};

export default App;
