import { Stack, Typography } from '@mui/material';

import PlTable from './PlTable/PlTable';
import EnergyCirculationDiagram from './EnergyCirculationDiagram/EnergyCirculationDiagram';

const Result = ({ plSummaryTable, plDetailsTable }) => {
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
            <Typography variant="h2">Result</Typography>
            <PlTable tableData={plSummaryTable} tableName="P&L Summary" />
            <PlTable tableData={plDetailsTable} tableName="P&L Details" />
            <EnergyCirculationDiagram />
        </Stack>
    );
};
export default Result;
