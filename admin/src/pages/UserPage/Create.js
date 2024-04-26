import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const CreateForm = () => {
    const [values, setValues] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = validate(values);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            // Submit the form
        }
    };

    const validate = (values) => {
        let errors = {};
        if (!values.name) errors.name = 'Name is required';
        if (!values.email) errors.email = 'Email is required';
        if (!values.password) errors.password = 'Password is required';
        return errors;
    };

    return (
        <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '100ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField name="name" label="Name" variant="standard" value={values.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} />
            <TextField name="email" label="Email" variant="standard" value={values.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
            <TextField name="password" label="Password" variant="standard" type="password" value={values.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} />
            <Divider style={{marginTop: 5, marginBottom: 5}} />
            <Button variant="contained" color="primary" type='submit'>Submit</Button>
        </Box>
    );
};

export default CreateForm;