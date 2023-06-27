import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { useAddTodoMutation } from '@store/userStore';
import validation from '@helpers/validation';

const AddToDo = () => {
    const [addTodo] = useAddTodoMutation();
    const nav = useNavigate();

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors
    } = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: validation.TodosSchema,
        onSubmit: async values => {

            try {
                const { data, error } = await addTodo(values);

                if (error && error.data.code === 401) {
                    localStorage.removeItem('testAuthorization');
                    nav('/auth');
                }

                console.log(data, error);
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
        <button type="submit">Add</button>
    </form>
};

export default AddToDo;