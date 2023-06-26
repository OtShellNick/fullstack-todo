import React from "react";
import { useFormik } from 'formik';

import validation from '@helpers/validation';

import './Register.scss';

const Register = () => {

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
            passwordConfirm: '',
        },
        validationSchema: validation.RegisterSchema,
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
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.passwordConfirm}
        />
        {errors.passwordConfirm && touched.passwordConfirm && <div>{errors.passwordConfirm}</div>}
        <button type="submit">Submit</button>
    </form>
};

export default Register;