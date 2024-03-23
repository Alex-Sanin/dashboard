import { useContext, useState } from 'react';
import { Stack, Paper, Typography, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';

import { AuthContext } from '../../utils/AuthContext';

import { ReactComponent as ShowIcon } from '../../assets/images/Show.svg';
import { ReactComponent as HideIcon } from '../../assets/images/Hide.svg';
import logo from '../../assets/images/logo.jpeg';
import {backend_netloc} from '../../utils/constants';

const validationSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required('This field is required'),
    password: yup.string().min(8, 'Password is too short').required('This field is required'),
});

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [type, setType] = useState('password');
    const { setIsAuth, setUserName, setToken, setEmail } = useContext(AuthContext);
    const formik = useFormik({
        validationSchema,
        initialValues: { email: '', password: '' },
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: () => {
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    email: formik.values.email,
                    password: formik.values.password,
                }),
            };
            fetch(`${backend_netloc}/simulation/user_authentication/`, requestOptions)
                .then((response) => response.json())
                .then((data) => handleAuth(data))
                .catch((error) => console.log('error', error));

            formik.resetForm();
        },
    });

    const handleAuth = (data) => {
        if (data.message === 'Login successful') {
            data['auth'] = true;
            setIsAuth(true);
            setUserName(data['user first name'] + '_' + data['user last name']);
            setToken(data.token);
            if (!('email' in data)){
                data['email'] = formik.values.email;
            }
            setEmail(formik.values.email);
            window.localStorage.setItem('auth',JSON.stringify(data));
        } else {
            setErrorMessage('The email address or password is incorrect');
        }
    };

    const handleClickToggle = () => setType(type === 'password' ? 'text' : 'password');

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
                height: '100vh',
                backgroundColor: '#E5E5E5',
            }}
        >
            <Paper sx={{ width: '380px', pt: 4, px: 3.5, pb: 5 }}>
                <Stack direction="column" spacing={2}>
                    <Stack direction="column" alignItems="center" spacing={3}>
                        <img src={logo} alt="pic" style={{ width: '70%' }} />
                        <Typography variant="body3">Please sign-in to your account</Typography>
                    </Stack>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack direction="column" alignItems="center" spacing={3}>
                            <TextField
                                fullWidth
                                label="Email"
                                size="small"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                error={formik.errors.email && formik.touched.email}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                size="small"
                                name="password"
                                type={type}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                error={formik.errors.password && formik.touched.password}
                                helperText={formik.touched.password && formik.errors.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickToggle}>
                                                <SvgIcon
                                                    inheritViewBox
                                                    component={
                                                        type === 'password' ? HideIcon : ShowIcon
                                                    }
                                                    sx={{ width: 18, height: 18 }}
                                                />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button fullWidth variant="contained" size="large" type="submit">
                                Log in
                            </Button>
                            {errorMessage && (
                                <Typography variant="body1" color="#d32f2f">
                                    {errorMessage}
                                </Typography>
                            )}
                        </Stack>
                    </form>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default Login;
