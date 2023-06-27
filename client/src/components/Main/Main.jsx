import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AddToDo from './AddToDo/AddToDo';

import './Main.scss';

const Main = () => {
    const token = localStorage.getItem('testAuthorization');
    const nav = useNavigate();

    useEffect(() => {
        if (!token) nav('/auth');
    }, []);

    return <main className='main'>
        <div className='main__header'>
            <span className='main__header_logo'>Logo</span>
            <button
                onClick={() => {
                    localStorage.removeItem('testAuthorization');
                    nav('/auth');
                }}
                className='main__header_button'>
                Logout
            </button>
        </div>
        <div className='main__wrapper'>
            <div className='main__wrapper_heading'>Todos</div>
            <div className='main__wrapper_content'>
                <AddToDo />
            </div>
        </div>
    </main>
};

export default Main;