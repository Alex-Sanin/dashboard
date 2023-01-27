import { useState } from 'react';
import { Stack, Typography, Box, Tab, Tabs } from '@mui/material';

import EnergyCirculationDiagram from './EnergyCirculationDiagram/EnergyCirculationDiagram';
import PL from './PL/PL';
import DerailedResults from './DerailedResults/DerailedResults';
import LineChartResults from './LineChartResults/LineChartResults';
import BarChartResult from './BarChartResults/BarChartResults';

const TabPanel = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};
const Result = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="P&L" {...a11yProps(0)} />
                        <Tab label="Derailed results" {...a11yProps(1)} />
                        <Tab label="Diagram" {...a11yProps(2)} />
                        <Tab label="Line chart" {...a11yProps(3)} />
                        <Tab label="Bar chart" {...a11yProps(4)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <PL />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DerailedResults />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        sx={{ pt: 3 }}
                    >
                        <EnergyCirculationDiagram />
                    </Stack>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <LineChartResults />
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <BarChartResult />
                </TabPanel>
            </Box>
        </Stack>
    );
};
export default Result;
