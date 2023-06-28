import React from 'react';

import { useUpdateTodoMutation, useDeleteTodoMutation } from '@store/userStore';

import IconEdit from '@assets/edit.svg?jsx';
import IconDelete from '@assets/delete.svg?jsx';

const TodoList = ({ list: { rows }, refresh, setUpdate }) => {
    const [update] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    return <ul className='main__wrapper_list'>
        {rows.map(({ id, name, isDone }, index) => {

            return <li key={name + index} className='main__wrapper_item'>
                <div className='main__wrapper_item-left'>
                    <input
                        checked={isDone}
                        type="checkbox"
                        onChange={async e => {
                            const { checked } = e.target;
                            try {
                                await update({ id, isDone: checked });
                                await refresh();
                            } catch (err) {
                                console.error('update error', err);
                            }
                        }} />
                    {name}
                </div>
                <div className='main__wrapper_item-right'>
                    <IconEdit onClick={() => {
                        setUpdate({ id, name });
                    }} />
                    <IconDelete onClick={async () => {
                        try {
                            await deleteTodo({ id });
                            await refresh();
                        } catch (error) {
                            console.error('delete error', error);
                        }
                    }} />
                </div>
            </li>
        })}
    </ul>
};

export default TodoList;