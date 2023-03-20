import React, { useState, useEffect } from 'react';
import { Paper, TextField, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useFormik } from 'formik';
import * as yup from 'yup';

import TooltipIcon from '../TooltipIcon/TooltipIcon';
import Preloader from '../loaders/Preloader';

const validationSchema = yup.object().shape({
    customer: yup.string().required('This field is required'),
});

const TheBestSimulation = ({ token, email, userName }) => {
    const [customersList, setCustomersList] = useState([]);

    const formik = useFormik({
        validationSchema,
        initialValues: {
            customer: '',
        },
        onSubmit: (values) => {
            const requestOptions = {
                method: 'POST',
                body: values,
            };
            fetch(
                `/sim1/best_results/?authorization=${token}&username=${email}&user_name=${userName}`,
                requestOptions
            )
                .then((response) => response.json())
                // .then(() => getMainTableData())
                .catch((error) => console.log('error', error));
            // formik.resetForm();
        },
    });

    const getCustomersList = async () => {
        const response = await fetch(
            `/sim1/get_customers_list/?authorization=${token}&username=${email}&user_name=${userName}`,
            {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Content-Type': 'application/json',
                },
            }
        );
        const json = await response.json();
        setCustomersList(Object.values(json['customers_list'].flat()));
    };

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
