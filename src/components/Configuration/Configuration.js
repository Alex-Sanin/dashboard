import { useState, useEffect, useContext } from 'react';
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
    // currencies,
    // regions,
    discount,
    interestRate,
    time,
    dieselGenerator,
    initialBatterySize,
    initialBatteryPower,
    initialBatteryCost,
    initialPvSize,
    initialPvCost,
    grid,
} from '../../utils/constants';

import TooltipIcon from '../TooltipIcon/TooltipIcon';
import ProgressBar from './ProgressBar/ProgressBar';
import { timeFormatter } from '../../utils/functions';
import { AuthContext } from '../../utils/AuthContext';
import { DescriptiveTextContext } from '../../utils/DescriptiveTextContext';
import DescriptiveText from '../DescriptiveText/DescriptiveText';

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
    // region: yup.string().required('This field is required'),
    // currency: yup.string().required('This field is required'),
    batteryMinSize: yup.string().required('This field is required'),
    batteryMaxSize: yup.string().required('This field is required'),
    batteryMinPower: yup.string().required('This field is required'),
    batteryMaxPower: yup.string().required('This field is required'),
    batteryMinCost: yup.string().required('This field is required'),
    batteryMaxCost: yup.string().required('This field is required'),
    grid: yup.string().required('This field is required'),
});

const initialValues = {
    customerName: 'customer test 1',
    simulationName: 'simulation test 1',
    // region: 'Israel',
    // currency: 'NIS',
    discountToConsumer: '0',
    discountToGrid: '0',
    interestRate: '0',
    time: '1',
    dieselGenerator: '0',
    batteryMinSize: '8',
    batteryMaxSize: '8',
    batteryMinPower: '2',
    batteryMaxPower: '2',
    batteryMinCost: '300',
    batteryMaxCost: '300',
    pvMinSize: '1',
    pvMaxSize: '1',
    pvMinCost: '800',
    pvMaxCost: '800',
    grid: '1',
    file: '',
};

const Configuration = ({
    exampleFilePath,
    getMainTableData,
    getCustomersList,
    token,
    email,
    userName,
}) => {
    const { setExecutiveSummaryTitle } = useContext(AuthContext);
    const { descriptiveText } = useContext(DescriptiveTextContext);

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
    const [runSimulationsTime, setRunSimulationsTime] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [simulationProgress, setSimulationProgress] = useState(0);

    const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit: (values) => {
            setSimulationProgress(0);
            handleProgressBar();
            const keys = Object.keys(values);
            const formData = new FormData();
            for (const key of keys) {
                formData.append(key, values[key]);
            }
            const requestOptions = {
                method: 'POST',
                body: formData,
            };
            fetch(
                `/sim1/run_simulation/?authorization=${token}&username=${email}&user_name=${userName}`,
                requestOptions
            )
                .then((response) => response.json())
                .then((data) => handleErrorMessage(data))
                // .then(() => errorMessage ? null : handleProgressBar())
                .then()
                .catch((error) => console.log('error', error));
        },
    });

    const getExampleFile = async () => {
        fetch(
            `/sim1/download_file?file=${exampleFilePath}&authorization=${token}&username=${email}&user_name=${userName}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/csv',
                },
            }
        )
            .then((response) => response.blob())
            .then((blob) => {
                // Create blob link to download
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `exampe_file.csv`);

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);
            });
    };

    const getSimulationRunTime = async (values) => {
        const keys = Object.keys(values);
        const formData = new FormData();
        for (const key of keys) {
            formData.append(key, values[key]);
        }
        const requestOptions = {
            method: 'POST',
            body: formData,
        };
        fetch(
            `/sim1/get_simulation_run_time/?authorization=${token}&username=${email}&user_name=${userName}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => setRunSimulationsTime(data))
            .catch((error) => console.log('error', error));
    };

    const getProgressRequest = async () => {
        // const response = await fetch(
        //     `/sim1/progress_bar/?authorization=${token}&username=${email}&user_name=${userName}&total_number_of_simulations=${runSimulationsTime.total_number_of_simulations}&customer_name=${formik.values.customerName}&simulation_name=${formik.values.simulationName}`,
        //     {
        //         method: 'GET',
        //         headers: {
        //             'Access-Control-Allow-Credentials': true,
        //             'Content-Type': 'application/json',
        //         },
        //     }
        // );
        //
        // const json = await response.json();
        // setSimulationProgress(json['current_%_of_simulations']);
        // if (
        //     json['current_%_of_simulations'] === simulationProgress &&
        //     simulationProgress >= 0 &&
        //     simulationProgress < 100 &&
        //     !errorMessage
        // ) {
        //     setTimeout(getProgressRequest, 100);
        // }
        // if (errorMessage) {
        //     setSimulationProgress(0)
        // }

        fetch(
            `/sim1/progress_bar/?authorization=${token}&username=${email}&user_name=${userName}&total_number_of_simulations=${runSimulationsTime.total_number_of_simulations}&customer_name=${formik.values.customerName}&simulation_name=${formik.values.simulationName}`,
            {
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((response) => response.json())
            // .then((data) => console.log('DATA-1', data))
            // .then((data) => {
            //     console.log('DATA-GLOBAL', data)
            //         console.log('ERROR-GLOBAL', errorMessage)
            //
            //     if (errorMessage) {
            //         console.log('DATA-2', data)
            //         console.log('ERROR-1', errorMessage)
            //         setSimulationProgress(0)
            //     }
            //     if (
            //         // data['current_%_of_simulations'] === simulationProgress &&
            //         simulationProgress >= 0 &&
            //         simulationProgress < 100
            //     ) {
            //         console.log('DATA-3', data)
            //         console.log('ERROR-2', errorMessage)
            //         setSimulationProgress(data['current_%_of_simulations']);
            //         setTimeout(getProgressRequest, 100);
            //     }
            // });
    };

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
        getSimulationRunTime(formik.values);
    }, [
        formik.values.batteryMinSize,
        formik.values.batteryMaxSize,
        formik.values.batteryMinPower,
        formik.values.batteryMaxPower,
        formik.values.batteryMinCost,
        formik.values.batteryMaxCost,
        formik.values.pvMinSize,
        formik.values.pvMaxSize,
        formik.values.pvMinCost,
        formik.values.pvMaxCost,
    ]);

    useEffect(() => {
        setErrorMessage('');
    }, [formik.values.simulationName]);

    useEffect(() => {
        if (simulationProgress > 0 && simulationProgress < 100) {
            handleProgressBar();
        }
    }, [simulationProgress]);

    const onChangeFile = (e) => {
        formik.setFieldValue('file', e.currentTarget.files[0]);
    };
    const handleDeleteFile = () => formik.setFieldValue('file', '');

    const handleProgressBar = () => {
        setTimeout(getProgressRequest, 1000);
    };

    const handleErrorMessage = (response) => {
        if (response.message === 'Simulation did NOT run as simulation name already exists') {
            setErrorMessage(response.message);
        } else {
            setErrorMessage('');
            getMainTableData();
            getCustomersList();
            setExecutiveSummaryTitle({
                customerName: formik.values.customerName,
                isFormsUpdate: true,
            });
        }
    };

    return (
        <Stack
            direction="column"
            spacing={4}
            sx={{
                position: 'relative',
                py: 4,
                px: 3,
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                boxShadow: '0px 1px 15px rgba(0, 0, 0, 0.04)',
            }}
        >
            <Typography variant="h2">Configuration</Typography>
            <DescriptiveText
                text={descriptiveText.configurationGeneral}
                top="-60px"
                left="160px"
                bl
            />
            <DescriptiveText
                text={descriptiveText.configurationUploadData}
                top="930px"
                left="390px"
                width="180px"
                bl
            />
            <DescriptiveText
                text={descriptiveText.configurationRunButton}
                top="1140px"
                left="-70px"
                width="100px"
                tr
            />
            <DescriptiveText
                text={descriptiveText.configurationMessages}
                top="1230px"
                left="200px"
                maxWidth="200px"
                tl
            />
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
                                    (formik.errors.simulationName &&
                                        formik.touched.simulationName) ||
                                    errorMessage
                                }
                                helperText={
                                    formik.touched.simulationName && formik.errors.simulationName
                                }
                            />
                            <TooltipIcon tooltipText="Fill in simulation name" />
                        </Stack>
                        {/*<Stack direction="row" spacing={2}>*/}
                        {/*    <TextField*/}
                        {/*        fullWidth*/}
                        {/*        select*/}
                        {/*        label="Region"*/}
                        {/*        size="small"*/}
                        {/*        name="region"*/}
                        {/*        onChange={formik.handleChange}*/}
                        {/*        value={formik.values.region}*/}
                        {/*        error={formik.errors.region && formik.touched.region}*/}
                        {/*        helperText={formik.touched.region && formik.errors.region}*/}
                        {/*    >*/}
                        {/*        {regions.map((option) => (*/}
                        {/*            <MenuItem key={option.value} value={option.value}>*/}
                        {/*                {option.label}*/}
                        {/*            </MenuItem>*/}
                        {/*        ))}*/}
                        {/*    </TextField>*/}
                        {/*    <TooltipIcon tooltipText="Select region" />*/}
                        {/*</Stack>*/}
                        {/*<Stack direction="row" spacing={2}>*/}
                        {/*    <TextField*/}
                        {/*        fullWidth*/}
                        {/*        select*/}
                        {/*        label="Currency"*/}
                        {/*        size="small"*/}
                        {/*        name="currency"*/}
                        {/*        onChange={formik.handleChange}*/}
                        {/*        value={formik.values.currency}*/}
                        {/*        error={formik.errors.currency && formik.touched.currency}*/}
                        {/*        helperText={formik.touched.currency && formik.errors.currency}*/}
                        {/*    >*/}
                        {/*        {currencies.map((option) => (*/}
                        {/*            <MenuItem key={option.value} value={option.value}>*/}
                        {/*                {option.label}*/}
                        {/*            </MenuItem>*/}
                        {/*        ))}*/}
                        {/*    </TextField>*/}
                        {/*    <TooltipIcon tooltipText="Select currency" />*/}
                        {/*</Stack>*/}
                        <Stack direction="column" spacing={2}>
                            <Typography variant="h3">Cost of Doing Business</Typography>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Discount to consumer"
                                    size="small"
                                    name="discountToConsumer"
                                    onChange={formik.handleChange}
                                    value={formik.values.discountToConsumer}
                                    error={
                                        formik.errors.discountToConsumer &&
                                        formik.touched.discountToConsumer
                                    }
                                    helperText={
                                        formik.touched.discountToConsumer &&
                                        formik.errors.discountToConsumer
                                    }
                                >
                                    {discount.map((option) => (
                                        <MenuItem
                                            key={option + '_discount_to_consumer'}
                                            value={option}
                                        >
                                            {option}%
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TooltipIcon tooltipText="Consumer % discount out of the (from the grid) delivered electricity" />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Discount to grid"
                                    size="small"
                                    name="discountToGrid"
                                    onChange={formik.handleChange}
                                    value={formik.values.discountToGrid}
                                    error={
                                        formik.errors.discountToGrid &&
                                        formik.touched.discountToGrid
                                    }
                                    helperText={
                                        formik.touched.discountToGrid &&
                                        formik.errors.discountToGrid
                                    }
                                >
                                    {discount.map((option) => (
                                        <MenuItem key={option + '_discount_to_grid'} value={option}>
                                            {option}%
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TooltipIcon tooltipText="Supplier % discount out of the (to the grid) delivered electricity" />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Interest rate"
                                    size="small"
                                    name="interestRate"
                                    onChange={formik.handleChange}
                                    value={formik.values.interestRate}
                                    error={
                                        formik.errors.interestRate && formik.touched.interestRate
                                    }
                                    helperText={
                                        formik.touched.interestRate && formik.errors.interestRate
                                    }
                                >
                                    {interestRate.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}%
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TooltipIcon tooltipText="Interest rate" />
                            </Stack>
                        </Stack>
                        <Stack direction="column" spacing={2}>
                            <Typography variant="h3">Load Shedding</Typography>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Time (h)"
                                    size="small"
                                    name="time"
                                    onChange={formik.handleChange}
                                    value={formik.values.time}
                                    error={formik.errors.time && formik.touched.time}
                                    helperText={formik.touched.time && formik.errors.time}
                                >
                                    {time.map((option) => (
                                        <MenuItem key={option + '_time'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TooltipIcon tooltipText="The number of hours, per day, of electricity outage" />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    fullWidth
                                    select
                                    label="Diesel generator ($/kW)"
                                    size="small"
                                    name="dieselGenerator"
                                    onChange={formik.handleChange}
                                    value={formik.values.dieselGenerator}
                                    error={
                                        formik.errors.dieselGenerator &&
                                        formik.touched.dieselGenerator
                                    }
                                    helperText={
                                        formik.touched.dieselGenerator &&
                                        formik.errors.dieselGenerator
                                    }
                                >
                                    {dieselGenerator.map((option) => (
                                        <MenuItem key={option + '_dieselGenerator'} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TooltipIcon tooltipText="Cost of running the diesel generator to compensate the electricity outage" />
                            </Stack>
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
                        <Stack width="100%" direction="column" spacing={2}>
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
                                        <Typography
                                            variant="body2"
                                            display="inline"
                                            onClick={() => getExampleFile()}
                                            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                            Click here to download an example data file
                                        </Typography>
                                    }
                                    placement="right"
                                >
                                    <SvgIcon
                                        component={InfoOutlinedIcon}
                                        sx={{ width: 28, height: 28 }}
                                        style={{ paddingTop: 2, fill: '#556B2F' }}
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
                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                type="submit"
                                disabled={simulationProgress > 0 && simulationProgress < 100}
                            >
                                Run Simulation
                            </Button>
                            {errorMessage && (
                                <Typography
                                    variant="body1"
                                    color="#d32f2f"
                                    sx={{ textAlign: 'center' }}
                                >
                                    {errorMessage}
                                </Typography>
                            )}
                            {runSimulationsTime && (
                                <Stack direction="column" spacing={1}>
                                    <Typography variant="h3" sx={{ textAlign: 'center' }}>
                                        {`Total number of simulations: ${runSimulationsTime.total_number_of_simulations}`}
                                    </Typography>
                                    <Typography variant="h3" sx={{ textAlign: 'center' }}>
                                        {`Total time to run all simulations: ${timeFormatter(
                                            runSimulationsTime.total_time_to_run_all_simulations_in_seconds
                                        )}`}
                                    </Typography>
                                </Stack>
                            )}
                            <ProgressBar progress={simulationProgress} />
                        </Stack>
                    </Stack>
                </form>
            </FormControl>
        </Stack>
    );
};

export default Configuration;
