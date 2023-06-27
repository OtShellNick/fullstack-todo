import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Main.scss';

const Main = () => {
    const token = localStorage.getItem('testAuthorization');
    const nav = useNavigate();

    useEffect(() => {
        if (!token) nav('/auth');
    }, []);

    return <main className='main'>Main</main>
};

export default Main;