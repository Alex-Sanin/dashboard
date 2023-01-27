import React from 'react';
import styled from 'styled-components';
import MuiTextField from '@mui/material/TextField';

const TextField = ({ formik, required, disabled, name, label, placeholder, type }) => {
    return (
        <StyledTextField
            fullWidth
            // size="small"
            // type={type}
            // name={name}
            // disabled={disabled}
            // required={required}
            // error={formik.errors[name] && formik.touched[name]}
            // helperText={formik.touched[name] && formik.errors[name]}
            // onChange={formik.handleChange}
            // value={formik.values[name]}
            label={label}
            // placeholder={placeholder}
            // InputLabelProps={{ shrink: true }}
        />
    );
};

const StyledTextField = styled(MuiTextField)`
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus {
        color: red !important;
        -webkit-box-shadow: 0 0 0 40px white inset;
    }
`;

export default TextField;
