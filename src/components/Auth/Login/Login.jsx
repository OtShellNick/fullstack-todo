import React from 'react';
import { useFormik } from 'formik';

import validation from '@helpers/validation';

import './Login.scss';

const Login = () => {

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
        onSubmit: values => {
            console.log(values);
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
        <button type="submit">Submit</button>
    </form>
};

export default Login;