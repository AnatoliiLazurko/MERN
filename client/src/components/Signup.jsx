import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import { Link } from 'react-router-dom';

const initialValues = {
    email: '',
    username: '',
    password: '',
};

const SIGNUP_SCHEMA = Yup.object().shape({
    email: Yup.string().email().required(),
    username: Yup.string().required().min(3).max(40),
    password: Yup.string().required().min(6).max(30),
    confirm_password: Yup.string().required('confirm password is a required field').oneOf([Yup.ref('password')], 'Passwords does not match'),
});

const Signup = () => {

    const submitHandler = (values, formikBag) => {
        formikBag.resetForm();
    }

    return (
        <div className='login-field'>

            <Formik
                initialValues={initialValues}
                onSubmit={submitHandler}
                validationSchema={SIGNUP_SCHEMA}
            >
                <Form className='form-login'>
                    {/* <i className='fa fa-group'></i> */}
                    <SensorOccupiedIcon />
                    <h1>Sign up</h1>

                    <div>
                        <p className='label'>Email</p>
                        <Field name="email" placeholder="Enter email" className='input-field'/>
                        <ErrorMessage name='email' component="p" className='error'/>
                    </div>

                    <div>
                        <p className='label'>Username</p>
                        <Field name="username" placeholder="Username" className='input-field'/>
                        <ErrorMessage name='username' component="p" className='error'/>
                    </div>

                    <div>
                        <p className='label'>Password</p>
                        <Field type="password" name="password" placeholder="Enter password" className='input-field'/>
                        <ErrorMessage name='password' component="p" className='error'/>
                    </div>

                    <div>
                        <p className='label'>Confirm password</p>
                        <Field type="password" name="confirm_password" placeholder="Confirm password" className='input-field'/>
                        <ErrorMessage name='confirm_password' component="p" className='error'/>
                    </div>

                    <Link className='formik-link' to="/login">Log in</Link>

                    <Field type="submit" value="Sign up" id="signup"/>
                </Form>
            </Formik>
        </div>
    );
}

export default Signup;
