import React from 'react';
import { Stack } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const cashFlowGraphData = [
    {
        period: 2023,
        operationProfit: -4104.0,
        accumulativeCash: -4104.0,
    },
    {
        period: 2024,
        operationProfit: 887.166,
        accumulativeCash: -3216.834,
    },
    {
        period: 2025,
        operationProfit: 887.166,
        accumulativeCash: -2329.668,
    },
    {
        period: 2026,
        operationProfit: 887.166,
        accumulativeCash: -1442.502,
    },
    {
        period: 2027,
        operationProfit: 887.166,
        accumulativeCash: -555.336,
    },
    {
        period: 2028,
        operationProfit: 887.166,
        accumulativeCash: -331.83,
    },
    {
        period: 2029,
        operationProfit: 887.166,
        accumulativeCash: 1218.996,
    },
    {
        period: 2030,
        operationProfit: 887.166,
        accumulativeCash: 2106.162,
    },
];

// const plDiagramData = [
//     {
//         from: 'supplier',
//         to: 'customer',
//         energy: 0,
//         cost: 0,
//         income: '',
//     },
//     {
//         from: 'supplier',
//         to: 'battery',
//         energy: 1.1,
//         cost: -255.99,
//         income: '',
//     },
//     {
//         from: 'battery',
//         to: 'supplier',
//         energy: 1.096,
//         cost: '',
//         income: 1143.156,
//     },
// ];

const CashFlowGraph = ({ graphData }) => {
    return (
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
    );
};

export default CashFlowGraph;
