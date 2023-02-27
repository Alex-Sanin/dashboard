import React from 'react';
import { Stack, Typography } from '@mui/material';

const BarTooltip = ({ pvIncome, pvPercentage, batteryIncome, batteryPercentage }) => {
    return (
        <Stack
            direction="column"
            sx={{
                p: 1,
                backgroundColor: '#ffffff',
            }}
        >
            <Typography variant="body3">
                Battery income: {batteryIncome} ({batteryPercentage}%)
            </Typography>
            <Typography variant="body3">
                PV income: {pvIncome} ({pvPercentage}%)
            </Typography>
        </Stack>
    );
};

export default BarTooltip;
