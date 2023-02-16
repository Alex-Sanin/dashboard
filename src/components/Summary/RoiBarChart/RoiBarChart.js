import React from 'react';
import { Stack, Typography } from '@mui/material';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import Preloader from '../../loaders/Preloader';

const RoiBarChart = ({ barChartData }) => {
    const data = barChartData.map((item, index) => {
        return { roi: item, id: index };
    });

    const bestRoi = barChartData.sort((a, b) => a - b)[0];

    if (!barChartData) {
        return <Preloader />;
    }

    return (
        <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
            <Typography variant="h3">ROI</Typography>
            <Stack direction="column" justifyContent="center" alignItems="center">
                <BarChart
                    width={700}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="roi">
                        {data.map((entry, index) => (
                            <Cell
                                fill={entry.roi === bestRoi ? '#1665C1' : '#E5E5E5'}
                                key={`cell-${index}`}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </Stack>
        </Stack>
    );
};

export default RoiBarChart;
