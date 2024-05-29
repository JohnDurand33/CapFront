import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, Box, Typography } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';
import { useLayout } from '../contexts/LayoutContext';
import { useLogin } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const { setLoggedIn } = useLogin();
    const { isNavOpen } = useLayout();
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedIn(false);
        localStorage.removeItem('token');
    }, [setLoggedIn]);

    const initialValues = {
        email: '',
        password: '',
        verifyPassword: '',
        zipCode: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
        verifyPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
        zipCode: Yup.string().required('Required'),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors, setStatus }) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/signup', {
                email: values.email,
                password: values.password,
                zip_code: values.zipCode,
            });
            setStatus({ success: 'Sign up successful! Please log in.', error: null });
            setErrors({});
            navigate('/login');
        } catch (error) {
            console.error('Sign Up Failed:', error);
            setStatus({ success: null, error: error.response?.data?.message || 'Sign up failed. Please try again.' });
        }
        setSubmitting(false);
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, status }) => (
                    <Form>
                        <Box>
                            <Typography variant="h4" gutterBottom>Sign Up</Typography>
                            {status?.success && <Typography color="success">{status.success}</Typography>}
                            {status?.error && <Typography color="error">{status.error}</Typography>}
                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    label="Email"
                                    name="email"
                                    type="email"
                                    fullWidth
                                    required
                                    helperText={<ErrorMessage name="email" />}
                                    autoComplete="email"
                                />
                            </Box>
                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    label="Password"
                                    name="password"
                                    type="password"
                                    fullWidth
                                    required
                                    helperText={<ErrorMessage name="password" />}
                                    autoComplete="new-password"
                                />
                            </Box>
                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    label="Verify Password"
                                    name="verifyPassword"
                                    type="password"
                                    fullWidth
                                    required
                                    helperText={<ErrorMessage name="verifyPassword" />}
                                    autoComplete="new-password"
                                />
                            </Box>
                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    label="Zip Code"
                                    name="zipCode"
                                    type="text"
                                    fullWidth
                                    required
                                    helperText={<ErrorMessage name="zipCode" />}
                                    autoComplete="postal-code"
                                />
                            </Box>
                            <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                                Sign Up
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default SignUpForm;