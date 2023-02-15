import { Stack, Typography } from '@mui/material';

import PlTable from './PlTable/PlTable';
import CashFlowGraph from './CashFlowGraph/CashFlowGraph';
import PlDiagram from './PlDiagram/PlDiagram';

const Result = ({ plSummaryTable, plCashFlowGraph, plDetailsTable, plDiagram }) => {
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
            <Stack direction="column" alignItems="center" spacing={4}>
                <PlTable tableData={plSummaryTable} tableName="P&L Summary" />
                <CashFlowGraph graphData={plCashFlowGraph} />
                <PlTable tableData={plDetailsTable} tableName="P&L Details" />
                {plDiagram && <PlDiagram diagramData={plDiagram} />}
            </Stack>
        </Stack>
    );
};
export default Result;
