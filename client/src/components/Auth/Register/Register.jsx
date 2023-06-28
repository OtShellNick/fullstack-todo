import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';

import { useRegisterMutation } from "@store/userStore";

import validation from '@helpers/validation';

import './Register.scss';

const Register = () => {
    const [register] = useRegisterMutation();
    const [error, setError] = useState('');
    const [confirmLink, setConfirmLink] = useState('');
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
            passwordConfirm: '',
        },
        validationSchema: validation.RegisterSchema,
        onSubmit: async (values) => {
            setError('');

            try {
                const { data, error } = await register(values);

                if (data) {

                    if (data.token) {
                        localStorage.setItem('testAuthorization', data.token);
                        nav('/');
                    }

                    if (data.confirmLink) {
                        setConfirmLink(data.confirmLink);
                    }
                };

                if (error) {
                    setError(error.data.message);
                }
            } catch (err) {
                console.log('err register', err);
            }
        },
    });

    return <form className="auth__form" onSubmit={handleSubmit}>
        {confirmLink && <a href={confirmLink} target="_blank">Confirm Email</a>}
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
        {error && <div>{error}</div>}
        <button type="submit">Submit</button>
    </form>
};

export default Register;