import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import useAuth from '../hooks/useAuth';

const initialValues = {
    email: '',
    password: ''
};

const LOGIN_SCHEMA = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),

});

const Login = () => {

    const { login } = useAuth();
    const navigate =  useNavigate();

    const submitHandler = (values, formikBag) => {
        try {
            login({ email: values.email, password: values.password });
            navigate("/");
        }
        catch (error) {
            console.log(error);
        }

        formikBag.resetForm();
    }

    return (
        <div className='login-field'>

            <Formik
                initialValues={initialValues}
                onSubmit={submitHandler}
                validationSchema={LOGIN_SCHEMA}
            >
                <Form className='form-login'>
                    <LockOpenIcon/>
                    <h1>Login</h1>
                    
                    <div>
                        <p className='label'>Email</p>
                        <Field name="email" placeholder="Your email" className='input-field' />
                        <ErrorMessage name='email' component="p" className='error'/>
                    </div>

                    <div>
                        <p className='label'>Password</p>
                        <Field type="password" name="password" placeholder="Enter password" className='input-field' />
                        <ErrorMessage name='password' component="p" className='error'/>
                    </div>

                    <Link className='formik-link' to="/signup">Create account</Link>

                    <Field type="submit" value="Login" id="login"/>
                </Form>
            </Formik>
            
        </div>
    );
}

export default Login;
