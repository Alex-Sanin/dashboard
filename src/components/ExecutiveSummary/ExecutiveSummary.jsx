import React from 'react';
import { Stack, Grid, Typography, Paper } from '@mui/material';

import ContributionBarGraph from '../ExecutiveSummary/ContributionBarGraph/ContributionBarGraph';
import Preloader from '../loaders/Preloader';

const ExecutiveSummary = ({ executiveSummaryData, contributionBarGraphData }) => {
    const { configuration, results } = executiveSummaryData;

    if (!executiveSummaryData || !contributionBarGraphData) {
        return (
            <Paper sx={{p: 5}}>
                <Preloader />
            </Paper>
        );
    }

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
            <Typography variant="h2">Executive summary</Typography>
            <Grid container>
                <Grid item sm={12} md={4}>
                    <Stack direction="row" spacing={4}>
                        <Stack direction="column" spacing={1}>
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
                                Customer cost: {configuration.battery_cost}
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
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item sm={12} md={4}>
                    <Stack direction="column" spacing={1}>
                        <Typography variant="h3" sx={{ textDecoration: 'underline' }}>
                            Results
                        </Typography>
                        <Typography variant="body1">
                            Return on Investment: {results.return_on_investment}
                        </Typography>
                        <Typography variant="body1">
                            Investment: {results.return_on_investment}
                        </Typography>
                        <Typography variant="body1">Yearly cost: {results.yearly_cost}</Typography>
                        <Typography variant="body1">
                            Yearly income: {results.yearly_income}
                        </Typography>
                        <Typography variant="body1">
                            Yearly p&l: {results.yearly_operation_profit}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item sm={12} md={4}>
                    <ContributionBarGraph contributionBarGraphData={contributionBarGraphData} />
                </Grid>
            </Grid>
        </Stack>
    );
};
export default ExecutiveSummary;
