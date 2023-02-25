import { Stack, Typography, Button } from '@mui/material';

import PlTable from './PlTable/PlTable';
import CashFlowGraph from './CashFlowGraph/CashFlowGraph';
import PlDiagram from './PlDiagram/PlDiagram';

const Result = ({
    plSummaryTable,
    plCashFlowGraph,
    plDetailsTable,
    plDiagram,
    plDiagramDescription,
}) => {
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
                <PlTable tableData={plSummaryTable} tableName="P&l Summary - Yearly" />
                <CashFlowGraph graphData={plCashFlowGraph} />
                <PlTable tableData={plDetailsTable} tableName="P&L Details - Yearly" />
                {plDiagram && (
                    <PlDiagram
                        diagramData={plDiagram}
                        plDiagramDescription={plDiagramDescription}
                    />
                )}
            </Stack>
            <Stack direction="row" justifyContent="flex-end">
                <a
                    href="http://18.158.182.8:8001/sim1/download_results_file/"
                    download
                    style={{ textDecoration: 'none' }}
                >
                    <Button variant="contained" size="large" type="submit" sx={{ width: '220px' }}>
                        Download Data
                    </Button>
                </a>
            </Stack>
        </Stack>
    );
};
export default Result;
