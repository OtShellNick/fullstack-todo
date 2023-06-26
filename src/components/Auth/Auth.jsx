import React, { useState } from 'react';

import Login from './Login/Login';
import Register from './Register/Register';

import './Auth.scss';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

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