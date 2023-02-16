import { Stack, Typography } from '@mui/material';

import MainTable from './MainTable/MainTable';
import DetailsTable from './DetailsTable/DetailsTable';
import RoiBarChart from './RoiBarChart/RoiBarChart';

const Summary = ({
    mainTableData,
    detailsTableData,
    setDetailsTableData,
    roiBarGraphData,
    setRoiBarGraphData,
    setPlSummaryTable,
    setPlCashFlowGraph,
    setPlDetailsTable,
    setPlDiagram,
    getMainTableData,
}) => {
    const getMainTableSelectedRowData = async () => {
        const response = await fetch('/sim1/simulation_main_table_selected_row', {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        // console.log('simulation_main_table_selected_row: ', json);
        setDetailsTableData(Object.values(json[0]));
        setRoiBarGraphData(Object.values(json[3]));
        setPlSummaryTable(Object.values(json[5]));
        setPlCashFlowGraph(Object.values(json[7]));
        setPlDetailsTable(Object.values(json[9]));
        setPlDiagram(Object.values(json[11]));
        // if (!response.ok) {
        //     setError(response?.error?.message);
        //     console.log('ERROR: ', error);
        // }
    };



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
                getMainTableSelectedRowData={getMainTableSelectedRowData}
                getMainTableData={getMainTableData}
            />
            <DetailsTable
                tableData={detailsTableData}
                // setRoiBarGraphData={setRoiBarGraphData}
                setPlSummaryTable={setPlSummaryTable}
                setPlCashFlowGraph={setPlCashFlowGraph}
                setPlDetailsTable={setPlDetailsTable}
                setPlDiagram={setPlDiagram}
                getMainTableSelectedRowData={getMainTableSelectedRowData}
            />
            {roiBarGraphData && <RoiBarChart barChartData={roiBarGraphData} />}
        </Stack>
    );
};
export default Summary;
