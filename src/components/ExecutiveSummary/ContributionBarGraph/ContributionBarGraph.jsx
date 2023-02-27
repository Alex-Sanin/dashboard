import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Typography, Stack } from '@mui/material';

const ContributionBarGraph = ({ contributionBarGraphData }) => {
    const data = Object.values(contributionBarGraphData);


    const some = {
        batteryIncome: 100,
        batteryPercentage: 34,
        pvIncome: 200,
        pvPercentage: 66,
    };

    // console.log(contributionBarGraphData)

    return (
        <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
            <Typography variant="h3">Yearly contribution</Typography>
            <Stack direction="column" justifyContent="center" >
                <BarChart
                    width={400}
                    height={300}
                    data={data}
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
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="battery" stackId="a" fill="#8884d8" />
                    <Bar dataKey="pv" stackId="a" fill="#82ca9d" />
                </BarChart>
            </Stack>
        </Stack>
    );
};

export default ContributionBarGraph;
