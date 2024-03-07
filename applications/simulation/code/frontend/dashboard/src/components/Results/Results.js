import React, { useContext } from 'react';
import { Stack, Typography, Button } from '@mui/material';

import PlTable from './PlTable/PlTable';
import CashFlowGraph from './CashFlowGraph/CashFlowGraph';
import PlDiagram from './PlDiagram/PlDiagram';
import DescriptiveText from '../DescriptiveText/DescriptiveText';
import { DescriptiveTextContext } from '../../utils/DescriptiveTextContext';

const Result = ({
    token,
    email,
    userName,
    plSummaryTable,
    plCashFlowGraph,
    plDetailsTable,
    plDiagram,
    plDiagramDescription,
    dataFilePath,
}) => {
    const { descriptiveText } = useContext(DescriptiveTextContext);

    const resultFileLink = `http://18.158.182.8:8001/sim1/download_file?file=${dataFilePath}&authorization=${token}&username=${email}&user_name=${userName}`;

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
                position: 'relative',
            }}
        >
            <Typography variant="h2">Result</Typography>
            <DescriptiveText text={descriptiveText.resultsGeneral} top="-65px" left="80px" bl />
            <Stack direction="column" alignItems="center" spacing={4}>
                <CashFlowGraph graphData={plCashFlowGraph} />
                {plDiagram && (
                    <Stack sx={{position: 'relative',}}>
                        <Typography variant="h3" width="100%">
                            Energy Flow
                        </Typography>
                        <DescriptiveText
                            text={descriptiveText.resultsEnergyFlowDiagram}
                            top="-15px"
                            left="130px"
                            l
                        />

                        <PlDiagram
                            diagramData={plDiagram}
                            plDiagramDescription={plDiagramDescription}
                        />
                    </Stack>
                )}
                <PlTable
                    tableData={plSummaryTable}
                    tableName="P&l Summary - Yearly"
                    descriptiveText={descriptiveText.resultsPlSummary}
                />
                <PlTable
                    tableData={plDetailsTable}
                    tableName="P&L Details - Yearly"
                    descriptiveText={descriptiveText.resultsPlDetails}
                />
            </Stack>
            {dataFilePath && (
                <Stack direction="row" justifyContent="flex-end">
                    <a href={resultFileLink} download style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            size="large"
                            type="submit"
                            sx={{ width: '220px' }}
                        >
                            Download Data
                        </Button>
                    </a>
                </Stack>
            )}
        </Stack>
    );
};
export default Result;
