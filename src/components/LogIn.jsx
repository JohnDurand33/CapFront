import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, Box, Typography, useTheme } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';
import { useLogin } from '../contexts/LoginContext';
import { useLayout } from '../contexts/LayoutContext';


const Login = () => {
    const { setLoggedIn, login } = useLogin();
    const { isNavOpen } = useLayout();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/login') {
            // Should run only if /login route is valid
            setLoggedIn(false);
            localStorage.removeItem('token');
        }
    }, [location.pathname]);

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors, setStatus }) => {
        const success = await login(values.email, values.password);
        if (success) {
            setStatus({ success: 'Login successful', error: null });
            setErrors({});
            navigate('/MainView');
        } else {
            setStatus({ success: null, error: 'Login failed. Please try again.' });
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
                    <Form >
                        <Box >
                        <Typography variant="h4" gutterBottom>Log In</Typography>
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
                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                            Log In
                        </Button>
                    </Box>
                </Form>
            )}
            </Formik>
            <Box>
                <Typography
                    pt='10px'
                    sx={{ml:isNavOpen ? '240px' : 3}}
                    fontSize={'12px'}>Not a member?{' '}
                        <Link
                        to="/signup"
                        style={{ color: 'blue', textDecoration: 'underline' }}
                        >Click here to Sign Up!</Link>
                </Typography>
            </Box>
            </>);
}

export default Login;