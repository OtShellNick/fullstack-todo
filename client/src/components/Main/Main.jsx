import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetTodosQuery } from '@store/userStore';

import AddToDo from './AddToDo/AddToDo';
import TodoList from './TodoList/TodoList';

import './Main.scss';

const Main = () => {
    const [page, setPage] = useState(1);
    const token = localStorage.getItem('testAuthorization');
    const nav = useNavigate();
    const { data, error, refetch } = useGetTodosQuery(page);
    const [updateTodo, setUpdateTodo] = useState({});

    useEffect(() => {
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
            <div className='main__wrapper_heading'>{`Todos (${data?.count || 0})`}</div>
            <div className='main__wrapper_content'>
                <AddToDo todoForUpdate={updateTodo} setUpdateTodo={setUpdateTodo} refecth={refetch} />
                {data &&
                    data.rows &&
                    data.rows.length > 0 &&
                    <TodoList
                        setPage={setPage}
                        setUpdate={setUpdateTodo}
                        refresh={refetch}
                        list={data}
                    />}
                {data && <div className='main__wrapper_nav'>
                    <button disabled={page <= 1} onClick={() => setPage(prev => prev - 1)}>Prev</button>
                    <span>{page}</span>
                    <button disabled={page >= Math.ceil(data.last_page)} onClick={() => setPage(prev => prev + 1)}>Next</button>
                </div>}
            </div>
        </div>
    </main>
};

export default Main;