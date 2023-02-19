import { Stack, Paper, Typography, TextField } from '@mui/material';
// import { useFormik } from 'formik';
// import * as yup from 'yup';

import backgroundImage from '../../assets/images/login_background.png';
import Button from "@mui/material/Button";

const Login = () => {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
                height: '100vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Paper sx={{ width: '380px', pt: 4, px: 3.5, pb: 5 }}>
                <Stack direction="column" spacing={3}>
                    <Stack direction="column" alignItems="center" spacing={1}>
                        <Typography variant="h1">Welcome</Typography>
                        <Typography variant="body3">Please sign-in to your account</Typography>
                    </Stack>
                    <form>
                        <Stack direction="column" alignItems="center" spacing={3}>
                            <TextField fullWidth label="Email" size="small" name="customerName" />
                            <TextField
                                fullWidth
                                label="Password"
                                size="small"
                                name="customerName"
                            />
                            <Button fullWidth variant="contained" size="large" type="submit">
                                Log in
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default Login;
