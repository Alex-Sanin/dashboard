import { useEffect, useState, useContext } from 'react';
import { Grid, Stack } from '@mui/material';

import Header from '../../components/Header/Header';
import Configuration from '../../components/Configuration/Configuration';
import TheBestSimulation from '../../components/TheBestSimulation/TheBestSimulation';
import ExecutiveSummary from '../../components/ExecutiveSummary/ExecutiveSummary';
import Summary from '../../components/Summary/Summary';
import Result from '../../components/Results/Results';
import { AuthContext } from '../../utils/AuthContext';
import { DescriptiveTextContext } from '../../utils/DescriptiveTextContext';
import { combinedKeyFinancialValues } from '../../utils/functions';

const Dashboard = () => {
    const [executiveSummaryData, setExecutiveSummaryData] = useState('');
    const [contributionBarGraphData, setContributionBarGraphData] = useState('');
    const [executiveSummaryTableData, setExecutiveSummaryTableData] = useState('');
    const [mainTableData, setMainTableData] = useState('');
    const [detailsTableData, setDetailsTableData] = useState('');
    const [bestRoi, setBestRoi] = useState('');
    const [roiBarGraphData, setRoiBarGraphData] = useState('');
    const [plSummaryTable, setPlSummaryTable] = useState('');
    const [plCashFlowGraph, setPlCashFlowGraph] = useState('');
    const [plDetailsTable, setPlDetailsTable] = useState('');
    const [plDiagram, setPlDiagram] = useState('');
    const [plDiagramDescription, setPlDiagramDescription] = useState('');
    const [exampleFilePath, setExampleFilePath] = useState('');
    const [dataFilePath, setDataFilePath] = useState('');
    const [customersList, setCustomersList] = useState([]);
    const [descriptiveText, setDescriptiveText] = useState({});
    const [isDescriptiveText, setIsDescriptiveText] = useState(true);

    const { userName, token, email, setExecutiveSummaryTitle } = useContext(AuthContext);

    const getMainTableData = async () => {
        const response = await fetch(
            `/sim1/get_all_data/?authorization=${token}&username=${email}&user_name=${userName}`,
            {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Content-Type': 'application/json',
                },
            }
        );
        const json = await response.json();
        setMainTableData(Object.values(json[1]));
        setDetailsTableData(Object.values(json[3]));
        setBestRoi(json[5]);
        setRoiBarGraphData(
            combinedKeyFinancialValues(
                json.summary_graph_roi,
                json.summary_graph_npv,
                json.summary_graph_irr
            )
        );
        setPlSummaryTable(Object.values(json[8]));
        setPlCashFlowGraph(Object.values(json[10]));
        setPlDetailsTable(Object.values(json[12]));
        setPlDiagram(Object.values(json[14]));
        setPlDiagramDescription(Object.values(json[16]));
        setExampleFilePath(json[18]);
        setDataFilePath(json[20]);
        setExecutiveSummaryData({ configuration: json.configuration, results: json.results });
        setContributionBarGraphData(json.contribution_bar_graph);
        setExecutiveSummaryTableData(json.npv_irr);
        setDescriptiveText({
            executiveSummaryGeneral: json.executive_summary_general,
            executiveSummaryConfiguration: json.executive_summary_configuration,
            executiveSummaryResults: json.executive_summary_results,
            executiveSummaryYearlyContributionGraph: json.executive_summary_yearly_contribution_graph,
            executiveSummaryNpvIrrTable: json.executive_summary_npv_irr_table,
            configurationGeneral: json.configuration_general,
            configurationUploadData: json.configuration_upload_data,
            configurationRunButton: json.configuration_run_button,
            configurationMessages: json.configuration_messages,
            summaryGeneral: json.summary_general,
            summaryMainTableGeneral: json.summary_main_table_general,
            summaryMainTableClick: json.summary_main_table_click,
            summaryDetailsTableGeneral: json.summary_details_table_general,
            summaryDetailsTableClick: json.summary_details_table_click,
            summaryGraph: json.summary_summary_graph,
            resultsGeneral: json.results_general,
            resultsPlCashFlow: json.results_pl_cash_flow,
            resultsEnergyFlowDiagram: json.results_energy_flow_diagram,
            resultsPlSummary: json.results_pl_summary,
            resultsPlDetails: json.results_pl_details,
            information: json.information,
        });
    };

    const getCustomersList = async () => {
        const response = await fetch(
            `/sim1/get_customers_list/?authorization=${token}&username=${email}&user_name=${userName}`,
            {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Content-Type': 'application/json',
                },
            }
        );
        const json = await response.json();
        setCustomersList(Object.values(json['customers_list'].flat()));
    };

    useEffect(() => {
        getMainTableData();
    }, []);

    return (
        <DescriptiveTextContext.Provider value={{ descriptiveText, isDescriptiveText }}>
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
                <Header
                    isDescriptiveText={isDescriptiveText}
                    setIsDescriptiveText={setIsDescriptiveText}
                />
                <Grid container spacing={3} sx={{ px: 10 }}>
                    <Grid item sm={12} md={12}>
                        <ExecutiveSummary
                            executiveSummaryData={executiveSummaryData}
                            contributionBarGraphData={contributionBarGraphData}
                            executiveSummaryTableData={executiveSummaryTableData}
                        />
                    </Grid>
                    <Grid item sm={12} md={12}>
                        <Grid container spacing={3}>
                            <Grid item sm={12} md={4}>
                                <Stack direction="column" spacing={3}>
                                    <Configuration
                                        token={token}
                                        email={email}
                                        userName={userName}
                                        exampleFilePath={exampleFilePath}
                                        getMainTableData={getMainTableData}
                                        getCustomersList={getCustomersList}
                                    />
                                    <TheBestSimulation
                                        token={token}
                                        email={email}
                                        userName={userName}
                                        setMainTableData={setMainTableData}
                                        setDetailsTableData={setDetailsTableData}
                                        setBestRoi={setBestRoi}
                                        setRoiBarGraphData={setRoiBarGraphData}
                                        setPlSummaryTable={setPlSummaryTable}
                                        setPlCashFlowGraph={setPlCashFlowGraph}
                                        setPlDetailsTable={setPlDetailsTable}
                                        setPlDiagram={setPlDiagram}
                                        setPlDiagramDescription={setPlDiagramDescription}
                                        setExampleFilePath={setExampleFilePath}
                                        setDataFilePath={setDataFilePath}
                                        setExecutiveSummaryData={setExecutiveSummaryData}
                                        setContributionBarGraphData={setContributionBarGraphData}
                                        setExecutiveSummaryTableData={setExecutiveSummaryTableData}
                                        customersList={customersList}
                                        getCustomersList={getCustomersList}
                                    />
                                </Stack>
                            </Grid>

                            <Grid item sm={12} md={8}>
                                <Stack direction="column" spacing={3}>
                                    <Summary
                                        token={token}
                                        email={email}
                                        profileName={userName}
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
                                        setPlDiagramDescription={setPlDiagramDescription}
                                        setExampleFilePath={setExampleFilePath}
                                        setDataFilePath={setDataFilePath}
                                        setExecutiveSummaryData={setExecutiveSummaryData}
                                        setContributionBarGraphData={setContributionBarGraphData}
                                        setExecutiveSummaryTableData={setExecutiveSummaryTableData}
                                        getMainTableData={getMainTableData}
                                    />
                                    <Result
                                        token={token}
                                        email={email}
                                        userName={userName}
                                        plSummaryTable={plSummaryTable}
                                        plCashFlowGraph={plCashFlowGraph}
                                        plDetailsTable={plDetailsTable}
                                        plDiagram={plDiagram}
                                        plDiagramDescription={plDiagramDescription}
                                        dataFilePath={dataFilePath}
                                    />
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Stack>
        </DescriptiveTextContext.Provider>
    );
};

export default Dashboard;
