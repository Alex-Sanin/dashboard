import { useState, useEffect } from 'react';
import { TextField, Typography, Tooltip, SvgIcon } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useFormik } from 'formik';

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

const Configuration = () => {
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
        // validationSchema,
        initialValues: {
            customerName: '',
            simulationName: '',
            region: '',
            currency: '',
            minSize: '',
            battery: {
                minSize: '',
                maxSize: '',
                minPower: '',
                maxPower: '',
                minCost: '',
                maxCost: '',
            },
            pv: {
                minSize: '',
                maxSize: '',
                minCost: '',
                maxCost: '',
            },
            grid: '',
        },
        onSubmit: () => {
            fetch('/sim1/validate_user_configuration111/', requestOptions)
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.log('error', error));
            formik.resetForm();
        },
    });

    const raw = JSON.stringify({
        customerName: formik.values.customerName,
        simulationName: formik.values.simulationName,
        region: formik.values.region,
        currency: formik.values.currency,
        battery: {
            minSize: formik.values.battery.minSize,
            maxSize: formik.values.battery.maxSize,
            minPower: formik.values.battery.minPower,
            maxPower: formik.values.battery.maxPower,
            minCost: formik.values.battery.minCost,
            maxCost: formik.values.battery.maxCost,
        },
        pv: {
            minSize: formik.values.pv.minSize,
            maxSize: formik.values.pv.maxSize,
            minCost: formik.values.pv.minCost,
            maxCost: formik.values.pv.maxCost,
        },
        grid: formik.values.grid,
    });

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: raw,
    };

    useEffect(() => {
        if (formik.values.battery.minSize) {
            setMaxBatterySize(
                initialBatterySize.filter((item) => item >= formik.values.battery.minSize)
            );
        }
        if (formik.values.battery.maxSize) {
            setMinBatterySize(
                initialBatterySize.filter((item) => item <= formik.values.battery.maxSize)
            );
        }
        if (formik.values.battery.minPower) {
            setMaxBatteryPower(
                initialBatteryPower.filter((item) => item >= formik.values.battery.minPower)
            );
        }
        if (formik.values.battery.maxPower) {
            setMinBatteryPower(
                initialBatteryPower.filter((item) => item <= formik.values.battery.maxPower)
            );
        }
        if (formik.values.battery.minCost) {
            setMaxBatteryCost(
                initialBatteryCost.filter((item) => item >= formik.values.battery.minCost)
            );
        }
        if (formik.values.battery.maxCost) {
            setMinBatteryCost(
                initialBatteryCost.filter((item) => item <= formik.values.battery.maxCost)
            );
        }

        if (formik.values.pv.minSize) {
            setMaxPvSize(initialPvSize.filter((item) => item >= formik.values.pv.minSize));
        }
        if (formik.values.pv.maxSize) {
            setMinPvSize(initialPvSize.filter((item) => item <= formik.values.pv.maxSize));
        }
        if (formik.values.pv.minCost) {
            setMaxPvCost(initialPvCost.filter((item) => item >= formik.values.pv.minCost));
        }
        if (formik.values.pv.maxCost) {
            setMinPvCost(initialPvCost.filter((item) => item <= formik.values.pv.maxCost));
        }
    }, [formik.values]);

    console.log(formik.values)

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
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <TextField
                                fullWidth
                                label="Customer name"
                                size="small"
                                name="customerName"
                                onChange={formik.handleChange}
                                value={formik.values.customerName}
                            />
                            <Tooltip title="Some tooltip" placement="right">
                                <SvgIcon
                                    component={InfoOutlinedIcon}
                                    sx={{ width: 28, height: 28 }}
                                />
                            </Tooltip>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <TextField
                                fullWidth
                                label="Simulation name"
                                size="small"
                                name="simulationName"
                                onChange={formik.handleChange}
                                value={formik.values.simulationName}
                            />
                            <Tooltip title="Some tooltip" placement="right">
                                <SvgIcon
                                    component={InfoOutlinedIcon}
                                    sx={{ width: 28, height: 28 }}
                                />
                            </Tooltip>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <TextField
                                fullWidth
                                select
                                label="Region"
                                size="small"
                                name="region"
                                onChange={formik.handleChange}
                                value={formik.values.region}
                            >
                                {regions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Tooltip title="Some tooltip" placement="right">
                                <SvgIcon
                                    component={InfoOutlinedIcon}
                                    sx={{ width: 28, height: 28 }}
                                />
                            </Tooltip>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <TextField
                                fullWidth
                                select
                                label="Currency"
                                size="small"
                                name="currency"
                                onChange={formik.handleChange}
                                value={formik.values.currency}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Tooltip title="Some tooltip" placement="right">
                                <SvgIcon
                                    component={InfoOutlinedIcon}
                                    sx={{ width: 28, height: 28 }}
                                />
                            </Tooltip>
                        </Stack>
                        <Stack direction="column" spacing={2}>
                            <Typography variant="h3">Battery</Typography>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Min size"
                                    size="small"
                                    name="battery.minSize"
                                    onChange={formik.handleChange}
                                    value={formik.values.battery.minSize}
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
                                    label="Max size"
                                    size="small"
                                    name="battery.maxSize"
                                    onChange={formik.handleChange}
                                    value={formik.values.battery.maxSize}
                                >
                                    {maxBatterySize.map((option) => (
                                        <MenuItem key={option + '_maxSize'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Tooltip title="Some tooltip" placement="right">
                                    <SvgIcon
                                        component={InfoOutlinedIcon}
                                        sx={{ width: 28, height: 28 }}
                                    />
                                </Tooltip>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Min power"
                                    size="small"
                                    name="battery.minPower"
                                    onChange={formik.handleChange}
                                    value={formik.values.battery.minPower}
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
                                    label="Max power"
                                    size="small"
                                    name="battery.maxPower"
                                    onChange={formik.handleChange}
                                    value={formik.values.battery.maxPower}
                                >
                                    {maxBatteryPower.map((option) => (
                                        <MenuItem key={option + 'maxPower'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Tooltip title="Some tooltip" placement="right">
                                    <SvgIcon
                                        component={InfoOutlinedIcon}
                                        sx={{ width: 28, height: 28 }}
                                    />
                                </Tooltip>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Min cost"
                                    size="small"
                                    name="battery.minCost"
                                    onChange={formik.handleChange}
                                    value={formik.values.battery.minCost}
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
                                    label="Max cost"
                                    size="small"
                                    name="battery.maxCost"
                                    onChange={formik.handleChange}
                                    value={formik.values.battery.maxCost}
                                >
                                    {maxBatteryCost.map((option) => (
                                        <MenuItem key={option + '_maxCost'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Tooltip title="Some tooltip" placement="right">
                                    <SvgIcon
                                        component={InfoOutlinedIcon}
                                        sx={{ width: 28, height: 28 }}
                                    />
                                </Tooltip>
                            </Stack>
                        </Stack>
                        <Stack direction="column" spacing={2}>
                            <Typography variant="h3">PV</Typography>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Min size"
                                    size="small"
                                    name="pv.minSize"
                                    onChange={formik.handleChange}
                                    value={formik.values.pv.minSize}
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
                                    label="Max size"
                                    size="small"
                                    name="pv.maxSize"
                                    onChange={formik.handleChange}
                                    value={formik.values.pv.maxSize}
                                >
                                    {maxPvSize.map((option) => (
                                        <MenuItem key={option + '_maxPvSize'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Tooltip title="Some tooltip" placement="right">
                                    <SvgIcon
                                        component={InfoOutlinedIcon}
                                        sx={{ width: 28, height: 28 }}
                                    />
                                </Tooltip>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Min cost"
                                    size="small"
                                    name="pv.minCost"
                                    onChange={formik.handleChange}
                                    value={formik.values.pv.minCost}
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
                                    label="Max cost"
                                    size="small"
                                    name="pv.maxCost"
                                    onChange={formik.handleChange}
                                    value={formik.values.pv.maxCost}
                                >
                                    {maxPvCost.map((option) => (
                                        <MenuItem key={option + '_maxPvCost'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Tooltip title="Some tooltip" placement="right">
                                    <SvgIcon
                                        component={InfoOutlinedIcon}
                                        sx={{ width: 28, height: 28 }}
                                    />
                                </Tooltip>
                            </Stack>
                        </Stack>
                        <Stack direction="column" spacing={2}>
                            <Typography variant="h3">Grid</Typography>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Grid"
                                    size="small"
                                    name="grid"
                                    onChange={formik.handleChange}
                                    value={formik.values.grid}
                                >
                                    {grid.map((option) => (
                                        <MenuItem key={option + '_grid'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Tooltip title="Some tooltip" placement="right">
                                    <SvgIcon
                                        component={InfoOutlinedIcon}
                                        sx={{ width: 28, height: 28 }}
                                    />
                                </Tooltip>
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
                                <Button variant="outlined" size="large" sx={{ minWidth: '160px' }}>
                                    Upload file
                                </Button>
                                <Tooltip title="download example input file" placement="right">
                                    <SvgIcon
                                        component={InfoOutlinedIcon}
                                        sx={{ width: 28, height: 28 }}
                                    />
                                </Tooltip>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <Button
                                    variant="contained"
                                    size="large"
                                    type="submit"
                                    sx={{ minWidth: '160px' }}
                                >
                                    Run
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </form>
            </FormControl>
        </Stack>
    );
};

export default Configuration;
