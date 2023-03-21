import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Typography, Stack } from '@mui/material';

import Preloader from '../../loaders/Preloader';
import BarTooltip from './BarTooltip';
import { dataFormatter } from '../../../utils/functions';

import ChartLegendIcon from '../../../assets/images/ChartLegendIcon';

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
        <Stack direction="column" spacing={1} sx={{ width: '100%', ml: '-45px' }}>
            <Typography variant="h3" sx={{ ml: '90px', textDecoration: 'underline' }}>
                Yearly contribution (NIS)
            </Typography>
            <Stack direction="column" justifyContent="center">
                <BarChart
                    width={400}
                    height={300}
                    data={[data]}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 40,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={dataFormatter} />
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
                    <Bar dataKey="pvIncome" stackId="a" fill="#556B2F" />
                    <Bar dataKey="batteryIncome" stackId="a" fill="#E5E5E5" />
                </BarChart>
                <Stack direction="row" spacing={2} sx={{ ml: '75px' }}>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ cursor: 'pointer' }}
                    >
                        <ChartLegendIcon color="#556B2F" />
                        <Typography variant="body1" style={{ color: '#556B2F' }}>
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
