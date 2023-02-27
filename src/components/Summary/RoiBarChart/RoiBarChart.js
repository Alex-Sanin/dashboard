import React from 'react';
import { Stack, Typography } from '@mui/material';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import Preloader from '../../loaders/Preloader';

const RoiBarChart = ({ bestRoi, barChartData }) => {
    const data = barChartData.map((item, index) => {
        return { roi: item, id: index };
    });

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
                    <XAxis dataKey="id" label={{ value: 'Results', offset: 0, position: 'insideBottom' }}/>
                    <YAxis label={{ value: 'Years', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="roi">
                        {data.map((entry, index) => (
                            <Cell
                                fill={entry.id === bestRoi ? '#1665C1' : '#E5E5E5'}
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
