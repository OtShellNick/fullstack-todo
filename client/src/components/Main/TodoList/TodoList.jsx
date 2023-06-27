import React from 'react';

const TodoList = ({ list }) => {

    return <ul className='main__wrapper_list'>
        {list.map(({ name, isDone }, index) => {

            return <li key={name + index}>{name}</li>
        })}
    </ul>
};

export default TodoList;