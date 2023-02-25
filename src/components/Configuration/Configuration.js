import { useState, useEffect } from 'react';
import { IconButton, SvgIcon, TextField, Tooltip, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useFormik } from 'formik';
import * as yup from 'yup';

import {
    currencies,
    regions,
    initialBatterySize,
    initialBatteryPower,
    initialBatteryCost,
    initialPvSize,
    initialPvCost,
    grid,
} from '../../utils/constants';

import TooltipIcon from './TooltipIcon';

const validationSchema = yup.object().shape({
    customerName: yup
        .string()
        .matches(/([A-Za-z]+(?: [A-Za-z]+)*)/, 'Please enter a valid name')
        .min(3, 'Customer name is too short')
        .max(100, 'Customer name is too long')
        .required('This field is required'),
    simulationName: yup
        .string()
        .min(3, 'Customer name is too short')
        .max(100, 'Simulation name is too long')
        .required('This field is required'),
    region: yup.string().required('This field is required'),
    currency: yup.string().required('This field is required'),
    batteryMinSize: yup.string().required('This field is required'),
    batteryMaxSize: yup.string().required('This field is required'),
    batteryMinPower: yup.string().required('This field is required'),
    batteryMaxPower: yup.string().required('This field is required'),
    batteryMinCost: yup.string().required('This field is required'),
    batteryMaxCost: yup.string().required('This field is required'),
    grid: yup.string().required('This field is required'),
});

const Configuration = ({ getMainTableData }) => {
    const [minBatterySize, setMinBatterySize] = useState(initialBatterySize);
    const [maxBatterySize, setMaxBatterySize] = useState(initialBatterySize);
    const [minBatteryPower, setMinBatteryPower] = useState(initialBatteryPower);
    const [maxBatteryPower, setMaxBatteryPower] = useState(initialBatteryPower);
    const [minBatteryCost, setMinBatteryCost] = useState(initialBatteryCost);
    const [maxBatteryCost, setMaxBatteryCost] = useState(initialBatteryCost);
    const [minPvSize, setMinPvSize] = useState(initialPvSize);
    const [maxPvSize, setMaxPvSize] = useState(initialPvSize);
    const [minPvCost, setMinPvCost] = useState(initialPvCost);
    const [maxPvCost, setMaxPvCost] = useState(initialPvCost);

    const formik = useFormik({
        validationSchema,
        initialValues: {
            customerName: 'customer test 1',
            simulationName: 'simulation test 1',
            region: 'Israel',
            currency: 'NIS',
            batteryMinSize: '8',
            batteryMaxSize: '8',
            batteryMinPower: '2',
            batteryMaxPower: '2',
            batteryMinCost: '300',
            batteryMaxCost: '300',
            pvMinSize: '0',
            pvMaxSize: '0',
            pvMinCost: '0',
            pvMaxCost: '0',
            grid: '1',
            file: '',
        },
        onSubmit: (values) => {
            const keys = Object.keys(values);
            const formData = new FormData();
            for (const key of keys) {
                formData.append(key, values[key]);
            }
            const requestOptions = {
                method: 'POST',
                body: formData,
            };
            fetch('/sim1/run_simulation/', requestOptions)
                .then((response) => response.text())
                .then(() => getMainTableData())
                .catch((error) => console.log('error', error));

            // formik.resetForm();
        },
    });

    useEffect(() => {
        if (formik.values.batteryMinSize) {
            setMaxBatterySize(
                initialBatterySize.filter((item) => item >= formik.values.batteryMinSize)
            );
        }
        if (formik.values.batteryMaxSize) {
            setMinBatterySize(
                initialBatterySize.filter((item) => item <= formik.values.batteryMaxSize)
            );
        }
        if (formik.values.batteryMinPower) {
            setMaxBatteryPower(
                initialBatteryPower.filter((item) => item >= formik.values.batteryMinPower)
            );
        }
        if (formik.values.batteryMaxPower) {
            setMinBatteryPower(
                initialBatteryPower.filter((item) => item <= formik.values.batteryMaxPower)
            );
        }
        if (formik.values.batteryMinCost) {
            setMaxBatteryCost(
                initialBatteryCost.filter((item) => item >= formik.values.batteryMinCost)
            );
        }
        if (formik.values.batteryMaxCost) {
            setMinBatteryCost(
                initialBatteryCost.filter((item) => item <= formik.values.batteryMaxCost)
            );
        }

        if (formik.values.pvMinSize || formik.values.pvMinSize === 0) {
            setMaxPvSize(initialPvSize.filter((item) => item >= formik.values.pvMinSize));
        }
        if (formik.values.pvMaxSize || formik.values.pvMaxSize === 0) {
            setMinPvSize(initialPvSize.filter((item) => item <= formik.values.pvMaxSize));
        }
        if (formik.values.pvMinCost || formik.values.pvMinCost === 0) {
            setMaxPvCost(initialPvCost.filter((item) => item >= formik.values.pvMinCost));
        }
        if (formik.values.pvMaxCost || formik.values.pvMaxCost === 0) {
            setMinPvCost(initialPvCost.filter((item) => item <= formik.values.pvMaxCost));
        }
    }, [formik.values]);
    const onChangeFile = (e) => {
        formik.setFieldValue('file', e.currentTarget.files[0]);
    };
    const handleDeleteFile = () => formik.setFieldValue('file', '');

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
            <Typography variant="h2">Configuration</Typography>
            <FormControl fullWidth>
                <form onSubmit={formik.handleSubmit}>
                    <Stack direction="column" spacing={2}>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                fullWidth
                                label="Customer name"
                                size="small"
                                name="customerName"
                                onChange={formik.handleChange}
                                value={formik.values.customerName}
                                error={formik.errors.customerName && formik.touched.customerName}
                                helperText={
                                    formik.touched.customerName && formik.errors.customerName
                                }
                            />
                            <TooltipIcon tooltipText="Fill in customer name" />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                fullWidth
                                label="Simulation name"
                                size="small"
                                name="simulationName"
                                onChange={formik.handleChange}
                                value={formik.values.simulationName}
                                error={
                                    formik.errors.simulationName && formik.touched.simulationName
                                }
                                helperText={
                                    formik.touched.simulationName && formik.errors.simulationName
                                }
                            />
                            <TooltipIcon tooltipText="Fill in simulation name" />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                fullWidth
                                select
                                label="Region"
                                size="small"
                                name="region"
                                onChange={formik.handleChange}
                                value={formik.values.region}
                                error={formik.errors.region && formik.touched.region}
                                helperText={formik.touched.region && formik.errors.region}
                            >
                                {regions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TooltipIcon tooltipText="Select region" />
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                fullWidth
                                select
                                label="Currency"
                                size="small"
                                name="currency"
                                onChange={formik.handleChange}
                                value={formik.values.currency}
                                error={formik.errors.currency && formik.touched.currency}
                                helperText={formik.touched.currency && formik.errors.currency}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TooltipIcon tooltipText="Select currency" />
                        </Stack>
                        <Stack direction="column" spacing={2}>
                            <Typography variant="h3">Battery</Typography>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Min size (MWh)"
                                    size="small"
                                    name="batteryMinSize"
                                    onChange={formik.handleChange}
                                    value={formik.values.batteryMinSize}
                                    error={
                                        formik.errors.batteryMinSize &&
                                        formik.touched.batteryMinSize
                                    }
                                    helperText={
                                        formik.touched.batteryMinSize &&
                                        formik.errors.batteryMinSize
                                    }
                                >
                                    {minBatterySize.map((option) => (
                                        <MenuItem key={option + '_minSize'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    fullWidth
                                    select
                                    label="Max size (MWh)"
                                    size="small"
                                    name="batteryMaxSize"
                                    onChange={formik.handleChange}
                                    value={formik.values.batteryMaxSize}
                                    error={
                                        formik.errors.batteryMaxSize &&
                                        formik.touched.batteryMaxSize
                                    }
                                    helperText={
                                        formik.touched.batteryMaxSize &&
                                        formik.errors.batteryMaxSize
                                    }
                                >
                                    {maxBatterySize.map((option) => (
                                        <MenuItem key={option + '_maxSize'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TooltipIcon tooltipText="Select battery’s minimum and maximum size" />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Min power (MW)"
                                    size="small"
                                    name="batteryMinPower"
                                    onChange={formik.handleChange}
                                    value={formik.values.batteryMinPower}
                                    error={
                                        formik.errors.batteryMinPower &&
                                        formik.touched.batteryMinPower
                                    }
                                    helperText={
                                        formik.touched.batteryMinPower &&
                                        formik.errors.batteryMinPower
                                    }
                                >
                                    {minBatteryPower.map((option) => (
                                        <MenuItem key={option + '_minPower'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    fullWidth
                                    select
                                    label="Max power (MW)"
                                    size="small"
                                    name="batteryMaxPower"
                                    onChange={formik.handleChange}
                                    value={formik.values.batteryMaxPower}
                                    error={
                                        formik.errors.batteryMaxPower &&
                                        formik.touched.batteryMaxPower
                                    }
                                    helperText={
                                        formik.touched.batteryMaxPower &&
                                        formik.errors.batteryMaxPower
                                    }
                                >
                                    {maxBatteryPower.map((option) => (
                                        <MenuItem key={option + 'maxPower'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TooltipIcon tooltipText="Select battery’s minimum and maximum power" />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Min cost ($/kWh)"
                                    size="small"
                                    name="batteryMinCost"
                                    onChange={formik.handleChange}
                                    value={formik.values.batteryMinCost}
                                    error={
                                        formik.errors.batteryMinCost &&
                                        formik.touched.batteryMinCost
                                    }
                                    helperText={
                                        formik.touched.batteryMinCost &&
                                        formik.errors.batteryMinCost
                                    }
                                >
                                    {minBatteryCost.map((option) => (
                                        <MenuItem key={option + '_minCost'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    fullWidth
                                    select
                                    label="Max cost ($/kWh)"
                                    size="small"
                                    name="batteryMaxCost"
                                    onChange={formik.handleChange}
                                    value={formik.values.batteryMaxCost}
                                    error={
                                        formik.errors.batteryMaxCost &&
                                        formik.touched.batteryMaxCost
                                    }
                                    helperText={
                                        formik.touched.batteryMaxCost &&
                                        formik.errors.batteryMaxCost
                                    }
                                >
                                    {maxBatteryCost.map((option) => (
                                        <MenuItem key={option + '_maxCost'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TooltipIcon tooltipText="Select battery’s minimum and maximum cost" />
                            </Stack>
                        </Stack>
                        <Stack direction="column" spacing={2}>
                            <Typography variant="h3">PV</Typography>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Min size (MW)"
                                    size="small"
                                    name="pvMinSize"
                                    onChange={formik.handleChange}
                                    value={formik.values.pvMinSize}
                                    error={formik.errors.pvMinSize && formik.touched.pvMinSize}
                                    helperText={formik.touched.pvMinSize && formik.errors.pvMinSize}
                                >
                                    {minPvSize.map((option) => (
                                        <MenuItem key={option + '_minPvSize'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    fullWidth
                                    select
                                    label="Max size (MW)"
                                    size="small"
                                    name="pvMaxSize"
                                    onChange={formik.handleChange}
                                    value={formik.values.pvMaxSize}
                                    error={formik.errors.pvMaxSize && formik.touched.pvMaxSize}
                                    helperText={formik.touched.pvMaxSize && formik.errors.pvMaxSize}
                                >
                                    {maxPvSize.map((option) => (
                                        <MenuItem key={option + '_maxPvSize'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TooltipIcon tooltipText="Select PV’s minimum and maximum size" />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Min cost ($/MW)"
                                    size="small"
                                    name="pvMinCost"
                                    onChange={formik.handleChange}
                                    value={formik.values.pvMinCost}
                                    error={formik.errors.pvMinCost && formik.touched.pvMinCost}
                                    helperText={formik.touched.pvMinCost && formik.errors.pvMinCost}
                                >
                                    {minPvCost.map((option) => (
                                        <MenuItem key={option + '_minPvCost'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    fullWidth
                                    select
                                    label="Max cost ($/MW)"
                                    size="small"
                                    name="pvMaxCost"
                                    onChange={formik.handleChange}
                                    value={formik.values.pvMaxCost}
                                    error={formik.errors.pvMaxCost && formik.touched.pvMaxCost}
                                    helperText={formik.touched.pvMaxCost && formik.errors.pvMaxCost}
                                >
                                    {maxPvCost.map((option) => (
                                        <MenuItem key={option + '_maxPvCost'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TooltipIcon tooltipText="Select PV’s minimum and maximum cost" />
                            </Stack>
                        </Stack>
                        <Stack direction="column" spacing={2}>
                            <Typography variant="h3">Grid</Typography>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Grid (MW)"
                                    size="small"
                                    name="grid"
                                    onChange={formik.handleChange}
                                    value={formik.values.grid}
                                    error={formik.errors.grid && formik.touched.grid}
                                    helperText={formik.touched.grid && formik.errors.grid}
                                >
                                    {grid.map((option) => (
                                        <MenuItem key={option + '_grid'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TooltipIcon tooltipText="Set up maximum grid connection" />
                            </Stack>
                        </Stack>
                        <Stack
                            width="100%"
                            direction="column"
                            // justifyContent="center"
                            // alignItems="center"
                            spacing={2}
                        >
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                spacing={2}
                            >
                                <Button variant="outlined" component="label" size="large" fullWidth>
                                    Upload Data File
                                    <input
                                        type="file"
                                        name="file"
                                        onChange={onChangeFile}
                                        style={{ display: 'none' }}
                                    />
                                    <SvgIcon
                                        component={AttachFileIcon}
                                        sx={{ width: 20, height: 20 }}
                                        style={{ marginLeft: '10px' }}
                                    />
                                    <input type="file" hidden />
                                </Button>
                                <Tooltip
                                    title={
                                        <a href="http://18.158.182.8:8001/sim1/download_example_input_file/" download>
                                            Click here to download an example data file
                                        </a>
                                    }
                                    placement="right"
                                >
                                    <SvgIcon
                                        component={InfoOutlinedIcon}
                                        sx={{ width: 28, height: 28 }}
                                        style={{ paddingTop: 2, fill: '#1665C1' }}
                                    />
                                </Tooltip>
                            </Stack>
                            {formik.values?.file && (
                                <Stack
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <Typography
                                        style={{
                                            maxWidth: '90%',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {formik.values?.file?.name}
                                    </Typography>
                                    <IconButton
                                        aria-label="delete"
                                        color="error"
                                        size="large"
                                        onClick={() => handleDeleteFile()}
                                    >
                                        <DeleteIcon component={DeleteForeverIcon} />
                                    </IconButton>
                                </Stack>
                            )}
                            <Button fullWidth variant="contained" size="large" type="submit">
                                Run Simulation
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </FormControl>
        </Stack>
    );
};

export default Configuration;
