import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useLoginMutation } from '@store/userStore';

import validation from '@helpers/validation';

import './Login.scss';

const Login = () => {
    const [login] = useLoginMutation();
    const [error, setError] = useState('');
    const nav = useNavigate();

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors
    } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validation.LoginSchema,
        onSubmit: async values => {

            try {
                const { data, error } = await login(values);

                console.log(data, error)
                if (data) {
                    localStorage.setItem('testAuthorization', data.token);
                    nav('/');
                }

                if (error) {
                    setError(error.data.message);
                    throw new Error(error.data.message);
                }
            } catch (e) {
                console.log('login error', e.message);
            }
        },
    });

    return <form className="auth__form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
            id="email"
            name="email"
            type="email"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email}
        />
        {errors.email && touched.email && <div>{errors.email}</div>}
        <label htmlFor="password">Password</label>
        <input
            id="password"
            name="password"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
        />
        {errors.password && touched.password && <div>{errors.password}</div>}
        {error && <div>{error}</div>}
        <button type="submit">Submit</button>
    </form>
};

export default Login;