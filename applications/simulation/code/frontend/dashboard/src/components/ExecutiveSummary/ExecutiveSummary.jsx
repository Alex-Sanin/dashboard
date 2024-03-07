import { useContext } from 'react';
import { Stack, Grid, Typography, Paper } from '@mui/material';

import ContributionBarGraph from '../ExecutiveSummary/ContributionBarGraph/ContributionBarGraph';
import ExecutiveSummaryTable from './ExecutiveSummaryTable/ExecutiveSummaryTable';
import Preloader from '../loaders/Preloader';
import { AuthContext } from '../../utils/AuthContext';
import { DescriptiveTextContext } from '../../utils/DescriptiveTextContext';
import DescriptiveText from '../DescriptiveText/DescriptiveText';

const ExecutiveSummary = ({
    executiveSummaryData,
    contributionBarGraphData,
    executiveSummaryTableData,
}) => {
    const { executiveSummaryTitle } = useContext(AuthContext);
    const { descriptiveText } = useContext(DescriptiveTextContext);
    const { configuration, results } = executiveSummaryData;

    let title = `Executive summary - Best Configuration For ${executiveSummaryTitle.customerName}`;
    if (executiveSummaryTitle.isFormsUpdate) {
        title = `Executive summary - Best Configuration For ${executiveSummaryTitle.customerName}`;
    }
    if (executiveSummaryTitle.isTablesUpdate) {
        title = `Executive summary - ${executiveSummaryTitle.customerName} ${executiveSummaryTitle.simulationName}`;
    }

    if (
        !executiveSummaryData ||
        !contributionBarGraphData ||
        !executiveSummaryTableData ||
        !descriptiveText
    ) {
        return (
            <Paper sx={{ p: 5 }}>
                <Preloader />
            </Paper>
        );
    }

    return (
        <Stack
            direction="column"
            spacing={4}
            sx={{
                posirion: 'relative',
                py: 4,
                px: 3,
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                boxShadow: '0px 1px 15px rgba(0, 0, 0, 0.04)',
            }}
        >
            <Typography variant="h2">{title}</Typography>
            <DescriptiveText
                text={descriptiveText.executiveSummaryGeneral}
                top="55px"
                left="310px"
                bl
            />
            <Grid container>
                <Grid item sm={12} md={4}>
                    <Stack direction="row" spacing={4}>
                        <Stack
                            direction="column"
                            spacing={1}
                            sx={{
                                position: 'relative',
                            }}
                        >
                            <Typography variant="h3" sx={{ textDecoration: 'underline' }}>
                                Configuration
                            </Typography>
                            <Typography variant="body1">
                                Customer name: {configuration.customer_name}
                            </Typography>
                            <Typography variant="body1">
                                Simulation name: {configuration.simulation_name}
                            </Typography>
                            <Typography variant="body1">
                                Battery size: {configuration.battery_size}
                            </Typography>
                            <Typography variant="body1">
                                Battery power: {configuration.battery_power}
                            </Typography>
                            <Typography variant="body1">
                                Battery cost: {configuration.battery_cost}
                            </Typography>
                            {!configuration.pv_size ? null : (
                                <Typography variant="body1">
                                    PV size: {configuration.pv_size}
                                </Typography>
                            )}
                            {!configuration.pv_cost ? null : (
                                <Typography variant="body1">
                                    PV cost: {configuration.pv_cost}
                                </Typography>
                            )}
                            <Typography variant="body1">
                                Grid connection: {configuration.grid_connection}
                            </Typography>
                            <DescriptiveText
                                text={descriptiveText.executiveSummaryConfiguration}
                                top="-34px"
                                left="140px"
                                width="200px"
                                l
                            />
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item sm={12} md={4}>
                    <Stack
                        direction="column"
                        spacing={1}
                        sx={{
                            position: 'relative',
                        }}
                    >
                        <Typography variant="h3" sx={{ textDecoration: 'underline' }}>
                            Results
                        </Typography>
                        <Typography variant="body1">
                            Return on Investment: {results.return_on_investment}
                        </Typography>
                        <Typography variant="body1">Investment: {results.investment}</Typography>
                        <Typography variant="body1">Yearly cost: {results.yearly_cost}</Typography>
                        <Typography variant="body1">
                            Yearly income: {results.yearly_income}
                        </Typography>
                        <Typography variant="body1">
                            Yearly p&l: {results.yearly_operation_profit}
                        </Typography>
                        <Typography variant="body1">
                            Simulation id: {results['simulation #']}
                        </Typography>
                        <DescriptiveText
                            text={descriptiveText.executiveSummaryResults}
                            top="-20px"
                            left="90px"
                            l
                        />
                    </Stack>
                </Grid>
                <Grid item sm={12} md={4}>
                    <ContributionBarGraph contributionBarGraphData={contributionBarGraphData} />
                </Grid>
            </Grid>
            <ExecutiveSummaryTable tableData={executiveSummaryTableData} />
        </Stack>
    );
};
export default ExecutiveSummary;
