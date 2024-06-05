import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, Box, Typography } from '@mui/material';
import * as Yup from 'yup';
import api from '../contexts/api.jsx';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
        verifyPassword: '',
        state: '',
        zipCode: '',
    };

    const stateAbbreviations = [
        'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
        verifyPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
        state: Yup.string().oneOf(stateAbbreviations, 'Invalid state abbreviation').required('Required'),
        zipCode: Yup.string().required('Required'),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors, setStatus }) => {
        try {
            const response = await api.post('auth/signup', {
                email: values.email,
                password: values.password,
                state: values.state,
                zip_code: values.zipCode,
            })
            console.log('Sign Up Successful:', response.data);
            setStatus({ success: 'Sign up successful! Please log in.', error: null });
            setErrors({});
            navigate('/login');
        } catch (error) {
            // Handle error during the API call
            console.error('Sign Up Failed:', error);
            setStatus({ success: null, error: error.response?.data?.message || 'Sign up failed. Please try again.' });
        } finally {
            // Ensure that setSubmitting is called to finish the form submission process
            setSubmitting(false);
        }
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
                                    label="State Abbreviation"
                                    name="state"
                                    type="text"
                                    fullWidth
                                    required
                                    helperText={<ErrorMessage name="state" />}
                                    autoComplete="state-abbreviation"
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