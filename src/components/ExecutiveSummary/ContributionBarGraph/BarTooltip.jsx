import React from 'react';
import { Stack, Typography } from '@mui/material';

import { dataFormatter } from '../../../utils/constants';

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
                Battery income: {dataFormatter(batteryIncome)} ({batteryPercentage}%)
            </Typography>
            <Typography variant="body3">
                PV income: {dataFormatter(pvIncome)} ({pvPercentage}%)
            </Typography>
        </Stack>
    );
};

export default BarTooltip;
