import React, { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import { dataFormatter } from '../../../utils/constants';
import ChartLegendIcon from '../../../assets/images/ChartLegendIcon';

const CashFlowGraph = ({ graphData }) => {
    const [isActiveLineOP, setIsActiveLineOP] = useState(true);
    const [isActiveLineAC, setIsActiveLineAC] = useState(true);

    const handleLineVisibility = (value) => {
        if (value === 'OP') {
            setIsActiveLineOP(!isActiveLineOP);
        }
        if (value === 'AC') {
            setIsActiveLineAC(!isActiveLineAC);
        }
    };

    return (
        <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
            <Typography variant="h3">P&L Cash Flow</Typography>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                sx={{ pt: 3 }}
            >
                <LineChart
                    width={700}
                    height={400}
                    data={graphData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 40, //can cut YAxis data
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={dataFormatter} />
                    <Tooltip formatter={dataFormatter} />
                    <Line
                        type="monotone"
                        dataKey="operation profit"
                        stroke="#1665C1"
                        activeDot={{ r: 8 }}
                        style={{ opacity: isActiveLineOP ? 1 : 0 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="accumulative cash"
                        stroke="#a09b9b"
                        style={{ opacity: isActiveLineAC ? 1 : 0 }}
                    />
                </LineChart>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        onClick={() => handleLineVisibility('OP')}
                        sx={{ cursor: 'pointer' }}
                    >
                        <ChartLegendIcon color="#1665C1" />
                        <Typography variant="body1" style={{ color: '#1665C1' }}>
                            Operation profit
                        </Typography>
                    </Stack>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        onClick={() => handleLineVisibility('AC')}
                        sx={{ cursor: 'pointer' }}
                    >
                        <ChartLegendIcon color="#a09b9b" />
                        <Typography variant="body1" style={{ color: '#a09b9b' }}>
                            Accumulative cash
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default CashFlowGraph;
