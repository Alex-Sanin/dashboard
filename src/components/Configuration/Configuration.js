import { useState } from 'react';
import { TextField, Typography, Tooltip, SvgIcon } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const regions = [
    {
        value: 'Israel',
        label: 'Israel',
    },
    {
        value: 'South Africa',
        label: 'South Africa',
    },
    {
        value: 'Germany',
        label: 'Germany',
    },
];

const currencies = [
    {
        value: 'USD',
        label: 'USD',
    },
    {
        value: 'EUR',
        label: 'EUR',
    },
    {
        value: 'NIS',
        label: 'NIS',
    },
];

const Configuration = () => {
    const [region, setRegion] = useState('');

    const handleChange = (event) => {
        setRegion(event.target.value);
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
            <Typography variant="h2">Configuration</Typography>
            <FormControl fullWidth>
                <Stack direction="column" spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <TextField fullWidth label="Customer name" size="small" />
                        <Tooltip title="Some tooltip" placement="right">
                            <SvgIcon component={InfoOutlinedIcon} sx={{ width: 28, height: 28 }} />
                        </Tooltip>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <TextField fullWidth label="Simulation name" size="small" />
                        <Tooltip title="Some tooltip" placement="right">
                            <SvgIcon component={InfoOutlinedIcon} sx={{ width: 28, height: 28 }} />
                        </Tooltip>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <TextField fullWidth select label="Region" size="small">
                            {regions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Tooltip title="Some tooltip" placement="right">
                            <SvgIcon component={InfoOutlinedIcon} sx={{ width: 28, height: 28 }} />
                        </Tooltip>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <TextField fullWidth select label="Currency" size="small">
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Tooltip title="Some tooltip" placement="right">
                            <SvgIcon component={InfoOutlinedIcon} sx={{ width: 28, height: 28 }} />
                        </Tooltip>
                    </Stack>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h3">Battery test</Typography>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <TextField fullWidth select label="Min size" size="small">
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </TextField>
                            <TextField fullWidth select label="Max size" size="small">
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </TextField>
                            <Tooltip title="Some tooltip" placement="right">
                                <SvgIcon
                                    component={InfoOutlinedIcon}
                                    sx={{ width: 28, height: 28 }}
                                />
                            </Tooltip>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <TextField fullWidth select label="Min power" size="small">
                                <MenuItem value={1}>0.1</MenuItem>
                                <MenuItem value={2}>0.2</MenuItem>
                                <MenuItem value={3}>0.3</MenuItem>
                            </TextField>
                            <TextField fullWidth select label="Max power" size="small">
                                <MenuItem value={1}>0.1</MenuItem>
                                <MenuItem value={2}>0.2</MenuItem>
                                <MenuItem value={3}>0.3</MenuItem>
                            </TextField>
                            <Tooltip title="Some tooltip" placement="right">
                                <SvgIcon
                                    component={InfoOutlinedIcon}
                                    sx={{ width: 28, height: 28 }}
                                />
                            </Tooltip>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <TextField fullWidth select label="Min cost" size="small">
                                <MenuItem value={1}>$250</MenuItem>
                                <MenuItem value={2}>$260</MenuItem>
                                <MenuItem value={3}>$270</MenuItem>
                            </TextField>
                            <TextField fullWidth select label="Max cost" size="small">
                                <MenuItem value={1}>$250</MenuItem>
                                <MenuItem value={2}>$260</MenuItem>
                                <MenuItem value={3}>$270</MenuItem>
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
                            <TextField fullWidth select label="Min size" size="small">
                                <MenuItem value={1}>0.5</MenuItem>
                                <MenuItem value={2}>1</MenuItem>
                                <MenuItem value={3}>1.5</MenuItem>
                            </TextField>
                            <TextField fullWidth select label="Max size" size="small">
                                <MenuItem value={1}>0.5</MenuItem>
                                <MenuItem value={2}>1</MenuItem>
                                <MenuItem value={3}>1.5</MenuItem>
                            </TextField>
                            <Tooltip title="Some tooltip" placement="right">
                                <SvgIcon
                                    component={InfoOutlinedIcon}
                                    sx={{ width: 28, height: 28 }}
                                />
                            </Tooltip>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <TextField fullWidth select label="Min cost" size="small">
                                <MenuItem value={1}>$600</MenuItem>
                                <MenuItem value={2}>$625</MenuItem>
                                <MenuItem value={3}>$650</MenuItem>
                            </TextField>
                            <TextField fullWidth select label="Max cost" size="small">
                                <MenuItem value={1}>$600</MenuItem>
                                <MenuItem value={2}>$625</MenuItem>
                                <MenuItem value={3}>$650</MenuItem>
                            </TextField>
                            <Tooltip title="Some tooltip" placement="right">
                                <SvgIcon
                                    component={InfoOutlinedIcon}
                                    sx={{ width: 28, height: 28 }}
                                />
                            </Tooltip>
                        </Stack>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <TextField fullWidth select label="Grid" size="small">
                            <MenuItem value={1}>0.1</MenuItem>
                            <MenuItem value={2}>0.2</MenuItem>
                            <MenuItem value={3}>0.3</MenuItem>
                        </TextField>
                        <Tooltip title="Some tooltip" placement="right">
                            <SvgIcon component={InfoOutlinedIcon} sx={{ width: 28, height: 28 }} />
                        </Tooltip>
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
                            <Tooltip title="Some tooltip" placement="right">
                                <SvgIcon
                                    component={InfoOutlinedIcon}
                                    sx={{ width: 28, height: 28 }}
                                />
                            </Tooltip>
                        </Stack>
                        <Stack direction="row" justifyContent="flex-end">
                            <Button variant="contained" size="large" sx={{ minWidth: '160px' }}>
                                Run
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
            </FormControl>
        </Stack>
    );
};

export default Configuration;
