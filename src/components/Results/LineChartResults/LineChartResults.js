import React from 'react';
import { Stack } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    {
        name: 'January',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'February',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'March',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'April',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'May',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'June',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'July',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const LineChartResults = () => {
    return (
        <Stack direction="row" justifyContent="center" alignItems="flex-start" sx={{ pt: 3 }}>
            <LineChart
                width={700}
                height={400}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#1665C1" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#a09b9b" />
            </LineChart>
        </Stack>
    );
};

export default LineChartResults;
