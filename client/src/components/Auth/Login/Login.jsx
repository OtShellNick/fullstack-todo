import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useLoginMutation, useRestoreMutation } from '@store/userStore';

import validation from '@helpers/validation';

import './Login.scss';

const Login = ({ passLink }) => {
    const [login] = useLoginMutation();
    const [restorePass] = useRestoreMutation();
    const [error, setError] = useState('');
    const [restore, setRestore] = useState(false);
    const [restoreLink, setRestoreLink] = useState('');
    const nav = useNavigate();

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors
    } = useFormik({
        initialValues: restore ? {
            email: ''
        } : {
            email: '',
            password: '',
        },
        enableReinitialize: true,
        validationSchema: restore ? validation.RestoreSchema : validation.LoginSchema,
        onSubmit: async values => {
            const action = restore ? restorePass : login;

            try {
                const { data, error } = await action(values);

                console.log(data, error)
                if (data) {

                    if (data.token) {
                        localStorage.setItem('testAuthorization', data.token);
                        nav('/');
                    }

                    if (data.restoreLink) {
                        setRestoreLink(data.restoreLink);
                    };
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
        {restoreLink && <a href={restoreLink} target='_blank'>Restore Email</a>}
        {passLink && <a href={passLink} target='_blank'>Pass Email</a>}
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
        {!restore && <>
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
        </>}
        {error && <div>{error}</div>}
        <button type="submit">{restore ? 'Restore password' : 'Login'}</button>
        <button onClick={(e) => {
            e.preventDefault();

            setRestore(prev => !prev)
        }}>{restore ? 'Go back' : 'Forgot password?'}</button>
    </form>
};

export default Login;