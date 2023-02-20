import { useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';

import Header from '../../components/Header/Header';
import Configuration from '../../components/Configuration/Configuration';
import Summary from '../../components/Summary/Summary';
import Result from '../../components/Results/Results';

const Dashboard = () => {
    const [mainTableData, setMainTableData] = useState('');
    const [detailsTableData, setDetailsTableData] = useState('');
    const [bestRoi, setBestRoi] = useState('');
    const [roiBarGraphData, setRoiBarGraphData] = useState('');
    const [plSummaryTable, setPlSummaryTable] = useState('');
    const [plCashFlowGraph, setPlCashFlowGraph] = useState('');
    const [plDetailsTable, setPlDetailsTable] = useState('');
    const [plDiagram, setPlDiagram] = useState('');
    const [plDiagramDescription, setPlDiagramDescription] = useState('');

    const getMainTableData = async () => {
        const response = await fetch('/sim1/get_all_data', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        // console.log('GET DATA RESPONSE: ', json);
        setMainTableData(Object.values(json[1]));
        setDetailsTableData(Object.values(json[3]));
        setBestRoi(json[5]);
        setRoiBarGraphData(Object.values(json[6]));
        setPlSummaryTable(Object.values(json[8]));
        setPlCashFlowGraph(Object.values(json[10]));
        setPlDetailsTable(Object.values(json[12]));
        setPlDiagram(Object.values(json[14]));
        setPlDiagramDescription(Object.values(json[16]));
        // if (!response.ok) {
        //     setError(response?.error?.message);
        //     console.log('ERROR: ', error);
        // }
    };

    useEffect(() => {
        getMainTableData();
    }, []);

    return (
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
                    <Configuration getMainTableData={getMainTableData} />
                </Grid>
                <Grid item sm={12} md={8}>
                    <Stack direction="column" spacing={3}>
                        <Summary
                            mainTableData={mainTableData}
                            detailsTableData={detailsTableData}
                            setDetailsTableData={setDetailsTableData}
                            bestRoi={bestRoi}
                            setBestRoi={setBestRoi}
                            roiBarGraphData={roiBarGraphData}
                            setRoiBarGraphData={setRoiBarGraphData}
                            setPlSummaryTable={setPlSummaryTable}
                            setPlCashFlowGraph={setPlCashFlowGraph}
                            setPlDetailsTable={setPlDetailsTable}
                            setPlDiagram={setPlDiagram}
                            getMainTableData={getMainTableData}
                        />
                        <Result
                            plSummaryTable={plSummaryTable}
                            plCashFlowGraph={plCashFlowGraph}
                            plDetailsTable={plDetailsTable}
                            plDiagram={plDiagram}
                            plDiagramDescription={plDiagramDescription}
                        />
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    );
};

export default Dashboard;
