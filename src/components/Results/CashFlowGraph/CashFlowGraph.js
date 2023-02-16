import React from 'react';
import { Stack, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CashFlowGraph = ({ graphData }) => {
    return (
        <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
            <Typography variant="h3">P&L Cash Flow</Typography>
            <Stack direction="row" justifyContent="center" alignItems="flex-start" sx={{ pt: 3 }}>
                <LineChart
                    width={700}
                    height={400}
                    data={graphData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="operation profit"
                        stroke="#1665C1"
                        activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="accumulative cash" stroke="#a09b9b" />
                </LineChart>
            </Stack>
        </Stack>
    );
};

export default CashFlowGraph;
