import { Stack, Typography } from '@mui/material';

import MainTable from './MainTable/MainTable';
import DetailsTable from './DetailsTable/DetailsTable';
import RoiBarChart from './RoiBarChart/RoiBarChart';

const Summary = ({
    mainTableData,
    detailsTableData,
    setDetailsTableData,
    bestRoi,
    setBestRoi,
    roiBarGraphData,
    setRoiBarGraphData,
    setPlSummaryTable,
    setPlCashFlowGraph,
    setPlDetailsTable,
    setPlDiagram,
    setDataFileLink,
    getMainTableData,
    setExecutiveSummaryData,
                     setContributionBarGraphData,
}) => {
    const getMainTableSelectedRowData = async (mainTableId, userName) => {
        const response = await fetch(
            `/sim1/simulation_main_table_selected_row/?user_name=${userName}&simulation_main_table_id=${mainTableId}`,
            {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Content-Type': 'application/json',
                },
            }
        );
        const json = await response.json();
        // console.log('simulation_main_table_selected_row: ', json);
        setDetailsTableData(Object.values(json[0]));
        setBestRoi(json[2]);
        setRoiBarGraphData(Object.values(json[3]));
        setPlSummaryTable(Object.values(json[5]));
        setPlCashFlowGraph(Object.values(json[7]));
        setPlDetailsTable(Object.values(json[9]));
        setPlDiagram(Object.values(json[11]));
        setDataFileLink(json[17]);
        setExecutiveSummaryData({ configuration: json.configuration, results: json.results });
        setContributionBarGraphData(json.contribution_bar_graph);
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
                setDataFileLink={setDataFileLink}
                setExecutiveSummaryData={setExecutiveSummaryData}
                setContributionBarGraphData={setContributionBarGraphData}
                getMainTableSelectedRowData={getMainTableSelectedRowData}
            />
            {roiBarGraphData && <RoiBarChart bestRoi={bestRoi} barChartData={roiBarGraphData} />}
        </Stack>
    );
};
export default Summary;
