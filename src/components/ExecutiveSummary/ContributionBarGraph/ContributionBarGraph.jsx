import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Typography, Stack } from '@mui/material';

import Preloader from '../../loaders/Preloader';
import BarTooltip from './BarTooltip';

import ChartLegendIcon from "../../../assets/images/ChartLegendIcon";

const ContributionBarGraph = ({ contributionBarGraphData }) => {
    let data = {};

    for (let key in contributionBarGraphData) {
        if (key !== 'graph_title') {
            data[String(key + 'Income')] = contributionBarGraphData[key].income;
            data[String(key + 'Percentage')] = contributionBarGraphData[key]['%'];
        }
    }

    if (!contributionBarGraphData) {
        return <Preloader />;
    }

    return (
        <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
            <Typography variant="h3">Yearly contribution</Typography>
            <Stack direction="column" justifyContent="center">
                <BarChart
                    width={400}
                    height={300}
                    data={[data]}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                        content={
                            <BarTooltip
                                pvIncome={data.pvIncome}
                                pvPercentage={data.pvPercentage}
                                batteryIncome={data.batteryIncome}
                                batteryPercentage={data.batteryPercentage}
                            />
                        }
                    />
                    {/*<Legend />*/}
                    <Bar dataKey="pvIncome" stackId="a" fill="#1665C1" />
                    <Bar dataKey="batteryIncome" stackId="a" fill="#E5E5E5" />
                </BarChart>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ cursor: 'pointer' }}
                    >
                        <ChartLegendIcon color="#1665C1" />
                        <Typography variant="body1" style={{ color: '#1665C1' }}>
                            PV income
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ cursor: 'pointer' }}
                    >
                        <ChartLegendIcon color="#a09b9b" />
                        <Typography variant="body1" style={{ color: '#a09b9b' }}>
                            Battery income
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default ContributionBarGraph;