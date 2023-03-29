import { useContext } from 'react';
import { Stack, Typography } from '@mui/material';

import MainTable from './MainTable/MainTable';
import DetailsTable from './DetailsTable/DetailsTable';
import RoiBarChart from './RoiBarChart/RoiBarChart';
import { combinedKeyFinancialValues } from '../../utils/functions';
import { AuthContext } from '../../utils/AuthContext';
import {DescriptiveTextContext} from "../../utils/DescriptiveTextContext";
import DescriptiveText from "../DescriptiveText/DescriptiveText";

const Summary = ({
    token,
    email,
    profileName,
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
    setExampleFilePath,
    setDataFilePath,
    getMainTableData,
    setExecutiveSummaryData,
    setContributionBarGraphData,
    setExecutiveSummaryTableData,
}) => {
    const { setExecutiveSummaryTitle } = useContext(AuthContext);
    const { descriptiveText } = useContext(DescriptiveTextContext);

    const getMainTableSelectedRowData = async (
        mainTableId,
        userName,
        customerName,
    ) => {
        const response = await fetch(
            `/sim1/simulation_main_table_selected_row/?user_name=${profileName}&simulation_main_table_id=${mainTableId}&authorization=${token}&username=${email}&selected_row_name=${userName}`,
            {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Content-Type': 'application/json',
                },
            }
        );
        const json = await response.json();
        setDetailsTableData(Object.values(json[0]));
        setBestRoi(json[2]);
        setRoiBarGraphData(
            combinedKeyFinancialValues(
                json.summary_graph_roi,
                json.summary_graph_npv,
                json.summary_graph_irr
            )
        );
        setPlSummaryTable(Object.values(json[5]));
        setPlCashFlowGraph(Object.values(json[7]));
        setPlDetailsTable(Object.values(json[9]));
        setPlDiagram(Object.values(json[11]));
        setExampleFilePath(json[15]);
        setDataFilePath(json[17]);
        setExecutiveSummaryData({ configuration: json.configuration, results: json.results });
        setContributionBarGraphData(json.contribution_bar_graph);
        setExecutiveSummaryTableData(json.npv_irr);
        setExecutiveSummaryTitle({ customerName, isFormsUpdate: true });
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
                position: 'relative',
            }}
        >
            <Typography variant="h2">Summary</Typography>
            <DescriptiveText
                text={descriptiveText.summaryGeneral}
                top="-95px"
                left="120px"
                bl
            />
            <MainTable
                tableData={mainTableData}
                getMainTableSelectedRowData={getMainTableSelectedRowData}
                getMainTableData={getMainTableData}
            />
            <DetailsTable
                token={token}
                email={email}
                profileName={profileName}
                tableData={detailsTableData}
                setPlSummaryTable={setPlSummaryTable}
                setPlCashFlowGraph={setPlCashFlowGraph}
                setPlDetailsTable={setPlDetailsTable}
                setPlDiagram={setPlDiagram}
                setExampleFilePath={setExampleFilePath}
                setDataFilePath={setDataFilePath}
                setExecutiveSummaryData={setExecutiveSummaryData}
                setContributionBarGraphData={setContributionBarGraphData}
                setExecutiveSummaryTableData={setExecutiveSummaryTableData}
                getMainTableSelectedRowData={getMainTableSelectedRowData}
            />
            {roiBarGraphData && <RoiBarChart bestRoi={bestRoi} barChartData={roiBarGraphData} />}
        </Stack>
    );
};
export default Summary;
