import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetTodosQuery } from '@store/userStore';

import AddToDo from './AddToDo/AddToDo';
import TodoList from './TodoList/TodoList';

import './Main.scss';

const Main = () => {
    const token = localStorage.getItem('testAuthorization');
    const nav = useNavigate();
    const { data, error, refetch } = useGetTodosQuery();
    const [updateTodo, setUpdateTodo] = useState({});

    useEffect(() => {
        console.log(error)
        if (!token) nav('/auth');

        if (error && error.data.code === 401) {
            localStorage.removeItem('testAuthorization');
            nav('/auth');
        }
    }, [error]);

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
                <AddToDo todoForUpdate={updateTodo} setUpdateTodo={setUpdateTodo} refecth={refetch} />
                {data && data.length > 0 && <TodoList setUpdate={setUpdateTodo} refresh={refetch} list={data} />}
            </div>
        </div>
    </main>
};

export default Main;