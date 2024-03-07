import React, { useContext, useEffect } from 'react';
import { Paper, TextField, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useFormik } from 'formik';
import * as yup from 'yup';

import TooltipIcon from '../TooltipIcon/TooltipIcon';
import Preloader from '../loaders/Preloader';
import { combinedKeyFinancialValues } from '../../utils/functions';
import { AuthContext } from '../../utils/AuthContext';

const validationSchema = yup.object().shape({
    customer: yup.string().required('This field is required'),
});

const TheBestSimulation = ({
    token,
    email,
    userName,
    setMainTableData,
    setDetailsTableData,
    setBestRoi,
    setRoiBarGraphData,
    setPlSummaryTable,
    setPlCashFlowGraph,
    setPlDetailsTable,
    setPlDiagram,
    setPlDiagramDescription,
    setExampleFilePath,
    setDataFilePath,
    setExecutiveSummaryData,
    setContributionBarGraphData,
    setExecutiveSummaryTableData,
    customersList,
    getCustomersList,
}) => {
    const { setExecutiveSummaryTitle } = useContext(AuthContext);

    const formik = useFormik({
        validationSchema,
        initialValues: {
            customer: '',
        },
        onSubmit: async () => {
            const response = await fetch(
                `/sim1/best_results/?authorization=${token}&username=${email}&user_name=${userName}&customer_name=${formik.values.customer}`,
                {
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                        'Content-Type': 'application/json',
                    },
                }
            );
            const json = await response.json();
            setMainTableData(Object.values(json[1]));
            setDetailsTableData(Object.values(json[3]));
            setBestRoi(json[5]);
            setRoiBarGraphData(
                combinedKeyFinancialValues(
                    json.summary_graph_roi,
                    json.summary_graph_npv,
                    json.summary_graph_irr
                )
            );
            setPlSummaryTable(Object.values(json[8]));
            setPlCashFlowGraph(Object.values(json[10]));
            setPlDetailsTable(Object.values(json[12]));
            setPlDiagram(Object.values(json[14]));
            setPlDiagramDescription(Object.values(json[16]));
            setExampleFilePath(json[18]);
            setDataFilePath(json[20]);
            setExecutiveSummaryData({ configuration: json.configuration, results: json.results });
            setContributionBarGraphData(json.contribution_bar_graph);
            setExecutiveSummaryTableData(json.npv_irr);
            setExecutiveSummaryTitle({ customerName: formik.values.customer, isFormsUpdate: true });
        },
    });

    useEffect(() => {
        getCustomersList();
    }, []);

    if (!customersList.length) {
        return (
            <Paper sx={{ p: 5 }}>
                <Preloader />
            </Paper>
        );
    }

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
            <Typography variant="h2">The best result</Typography>
            <FormControl fullWidth>
                <form onSubmit={formik.handleSubmit}>
                    <Stack direction="column" spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                fullWidth
                                select
                                label="Customer"
                                size="small"
                                name="customer"
                                onChange={formik.handleChange}
                                value={formik.values.customer}
                                error={formik.errors.customer && formik.touched.customer}
                                helperText={formik.touched.customer && formik.errors.customer}
                            >
                                {customersList.map((listItem) => (
                                    <MenuItem key={listItem} value={listItem}>
                                        {listItem}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TooltipIcon tooltipText="Select a customer" />
                        </Stack>
                        <Button fullWidth variant="contained" size="large" type="submit">
                            THE BEST RESULT
                        </Button>
                    </Stack>
                </form>
            </FormControl>
        </Stack>
    );
};

export default TheBestSimulation;
