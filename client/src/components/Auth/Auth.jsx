import React, { useEffect, useState } from 'react';

import Login from './Login/Login';
import Register from './Register/Register';

import './Auth.scss';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const token = localStorage.getItem('testAuthorization');
    const nav = useNavigate();

    useEffect(() => {
        if (token) nav('/');
    }, [])

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
            {isLogin && <Login />}
            {!isLogin && <Register />}
        </div>
    </main>
};

export default Auth;