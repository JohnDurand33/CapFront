import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, Button, Box, Typography, useTheme } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';
import { useLayout } from '../contexts/LayoutContext';


const SignUpForm = () => {
    const theme = useTheme();
    const { isNavOpen } = useLayout();

    const initialValues = {
        email: '',
        password: '',
        verifyPassword: '',
        zipCode: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(8, 'password must be at least 8 characters').required('Required'),
        verifyPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
        zipCode: Yup.string().required('Required')
    });

    const onSubmit = async (values, { setSubmitting, setErrors, setStatus }) => {
        console.log('1) Trying to sign up')
        try {
            const response = await axios.post('http://localhost:5000/auth/signup', {
                email: values.email,
                password: values.password,
                zipCode: values.zipCode,
            });
            console.log('2) response:', response);

            setStatus({ success: 'Sign up successful! Please log in.' });
            setErrors({});
            setSubmitting(false);
        } catch (error) {
            console.error('Error:', error);  
            setErrors({ submit: error.response?.data?.message || 'Sign up failed. Please try again.' });
            setStatus({ success: '' });
            setSubmitting(false);
        }
        console.log(`3) Sign up complete', success: ${success}`);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            >
            {({ isSubmitting, status, errors, }) => (
                <Form>
                    <Box sx={{ mt: 3, ml: isNavOpen ? '240px':'0px', transition: 'margin-left 0.3s ease-in-out'}}>
                        <Typography variant="h4" gutterBottom>Sign Up</Typography>
                        {status?.success && <Typography color="success">{status.success}</Typography>}
                        {errors.submit && <Typography color="error">{errors.submit}</Typography>}
                        <Box mb={2}>
                            <Field
                                as={TextField}
                                label="Email"
                                name="email"
                                type="email"
                                fullWidth
                                required
                                helperText={<ErrorMessage name="email" />}
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
                            />
                        </Box>
                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
                            Sign Up
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default SignUpForm;










// class SignUp extends Component {
//     handleClick = async (e) => {
//         e.preventDefault();
//         const username = e.target.username.value;
//         const email = e.target.email.value;
//         const password = e.target.password.value;
//         const confirmPassword = e.target.confirmPassword.value;

//         const body = {
//             username,
//             email,
//             password
//         }

//         const url = BACKEND_URL + '/api/signup'
//         const options = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(body),
//         }

//         if (password !== confirmPassword) {
//             //THROW AN ERROR MESSAGE
//             console.log("Passwords do not match")
//             return
//         }

//         const request = await fetch(url, options);
//         console.log(`request: ${request}`);
//         const data = await request.json();
//         console.log(`data: ${data}`);
//     };

//     render() {
//         return (
//             <div>
//                 <h1 className="text-center">Sign Up</h1>
//                 <form className="col-3 mx-auto" onSubmit={this.handleClick}>
//                     <input className="form-control" type="text" name="username" placeholder="Userame" />
//                     <input className="form-control" type="text" name="email" placeholder="Email" />
//                     <input className="form-control" type="new-password" name="password" placeholder="Password" />
//                     <input className="form-control" type="new-password" name="confirmPassword" placeholder="Confirm Password" />
//                     <button className="btn btn-success mx-auto">Submit</button>
//                 </form>
//             </div>
//         );
//     }
// }



// export default SignUp;