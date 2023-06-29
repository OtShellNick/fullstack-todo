import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { useAddTodoMutation, useUpdateTodoMutation } from '@store/userStore';
import validation from '@helpers/validation';

const AddToDo = ({ refecth, todoForUpdate, setUpdateTodo }) => {
    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const nav = useNavigate();

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
    } = useFormik({
        initialValues: {
            name: todoForUpdate.name || '',
        },
        enableReinitialize: true,
        validationSchema: validation.TodosSchema,
        onSubmit: async (values, { resetForm }) => {
            const action = todoForUpdate.id ? updateTodo : addTodo;

            try {
                const { error } = await action(todoForUpdate.id ? { ...values, id: todoForUpdate.id } : values);

                if (error && error.data.code === 401) {
                    localStorage.removeItem('testAuthorization');
                    nav('/auth');
                }

                await refecth();
                setUpdateTodo({});
                resetForm();
            } catch (e) {
                console.log('login error', e.message);
            }
        },
    });

    return <form
        className='main__wrapper_form'
        onSubmit={handleSubmit}>
        <input
            id="name"
            name="name"
            type="text"
            placeholder='Enter TODO name'
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
        />
        <button type="submit">{todoForUpdate.id ? 'Update' : 'Add'}</button>
    </form>
};

export default AddToDo;