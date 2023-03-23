import React from 'react';
import { Stack, Typography } from '@mui/material';
import { ComposedChart, Bar, Cell, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import Preloader from '../../loaders/Preloader';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <Stack
                direction="column"
                sx={{ p: '10px', backgroundColor: '#ffffff', border: '1px solid #bcbaba' }}
            >
                <Typography sx={{ color: '#556b2f' }}>{`${payload[0].dataKey.toUpperCase()} : ${
                    payload[0].value
                } (years)`}</Typography>
                <Typography sx={{ color: '#bcbaba' }}>{`${payload[1].dataKey.toUpperCase()} : ${
                    payload[1].value
                } ($ in Mil.)`}</Typography>
                <Typography sx={{ color: '#8dc4b4' }}>{`${payload[2].dataKey.toUpperCase()} : ${
                    payload[2].value
                } (%)`}</Typography>
            </Stack>
        );
    }

    return null;
};

const RoiBarChart = ({ bestRoi, barChartData }) => {
    if (!barChartData.length) {
        return <Preloader />;
    }

    return (
        <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
            <Typography variant="h3">Key Financial Indicators</Typography>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{ overflowX: 'scroll' }}
            >
                {/*<BarChart*/}
                {/*    width={700}*/}
                {/*    height={350}*/}
                {/*    data={barChartData}*/}
                {/*    margin={{*/}
                {/*        top: 5,*/}
                {/*        right: 30,*/}
                {/*        left: 20,*/}
                {/*        bottom: 5,*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <CartesianGrid strokeDasharray="3 3" />*/}
                {/*    <XAxis*/}
                {/*        dataKey="id"*/}
                {/*        label={{ value: 'Results', offset: -5, position: 'insideBottom' }}*/}
                {/*    />*/}
                {/*    <YAxis />*/}
                {/*    <Tooltip content={<CustomTooltip />} />*/}
                {/*    <Bar dataKey="roi" barSize={30}>*/}
                {/*        {barChartData.map((entry, index) => (*/}
                {/*            <Cell*/}
                {/*                fill={entry.id === bestRoi ? '#556B2F' : '#bace9a'}*/}
                {/*                key={`cell-${index}`}*/}
                {/*            />*/}
                {/*        ))}*/}
                {/*    </Bar>*/}
                {/*    <Bar dataKey="npv" fill="#e5e5e5" barSize={30} />*/}
                {/*    <Bar dataKey="irr" fill="#b9f7e6" barSize={30} />*/}
                {/*</BarChart>*/}
                <ComposedChart
                    width={700}
                    height={350}
                    data={barChartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="id"
                        label={{ value: 'Results', offset: -5, position: 'insideBottom' }}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="roi" barSize={30}>
                        {barChartData.map((entry, index) => (
                            <Cell
                                fill={entry.id === bestRoi ? '#556B2F' : '#bace9a'}
                                key={`cell-${index}`}
                            />
                        ))}
                    </Bar>
                    <Line type="monotone" dataKey="npv" stroke="#e5e5e5" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="irr" stroke="#b9f7e6" activeDot={{ r: 8 }} />
                </ComposedChart>
            </Stack>
        </Stack>
    );
};

export default RoiBarChart;
