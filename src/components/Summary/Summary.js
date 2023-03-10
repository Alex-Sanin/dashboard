import { Stack, Typography } from '@mui/material';

import SummaryTable from './SummaryTable/SummaryTable';

const Summary = () => {
    return (
        <Stack
            direction="column"
            spacing={4}
            sx={{
                py: 4,
                px: 3,
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                boxShadow: '0px 1px 15px rgba(0, 0, 0, 0.04)',
            }}
        >
            <Typography variant="h2">Summary</Typography>
            <SummaryTable />
        </Stack>
    );
};
export default Summary;
