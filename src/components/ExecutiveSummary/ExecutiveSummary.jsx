import { Stack, Typography } from '@mui/material';

import ContributionBarGraph from '../ExecutiveSummary/ContributionBarGraph/ContributionBarGraph';

const ExecutiveSummary = ({ executiveSummaryData, contributionBarGraphData }) => {
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
            <Typography variant="h2">Executive summary</Typography>
            <Stack direction="column" alignItems="center" spacing={4}>
                <ContributionBarGraph contributionBarGraphData={contributionBarGraphData}/>
            </Stack>
        </Stack>
    );
};
export default ExecutiveSummary;
