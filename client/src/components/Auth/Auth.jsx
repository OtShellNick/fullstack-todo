import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import Login from './Login/Login';
import Register from './Register/Register';

import { useGetRegisterQuery } from "@store/userStore";

import './Auth.scss';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [code, setCode] = useState();
    const [passLink, setPassLink] = useState('');
    const token = localStorage.getItem('testAuthorization');
    const nav = useNavigate();
    const [searchParams] = useSearchParams();
    const { data, error } = useGetRegisterQuery(code);
    const authCode = searchParams.get('code');

    useEffect(() => {
        if (authCode) setCode(authCode);

        if (data) {

            if (data.token) {
                localStorage.setItem('testAuthorization', data.token);
                nav('/');
            }

            if (data.passLink) {
                setPassLink(data.passLink);
            }
        }

        if (error) {
            console.error(error);
        }

        if (token) nav('/');
    }, [authCode, data])

    return <main className='main'>
        <div className='auth'>
            <div className='auth__select'>
                <div
                    className={isLogin ? 'auth__select-active' : ''}
                    onClick={() => setIsLogin(true)}>
                    Login
                </div>
                <div
                    className={!isLogin ? 'auth__select-active' : ''}
                    onClick={() => setIsLogin(false)}>
                    Register
                </div>
            </div>
            {isLogin && <Login passLink={passLink} />}
            {!isLogin && <Register />}
        </div>
    </main>
};

export default Auth;