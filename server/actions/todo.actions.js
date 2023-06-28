const knex = require('./../db');

const createTodo = async data => {
    const [{ id }] = await knex('todo').insert({ ...data, isDone: false }).returning('id');
    return { ...data, isDone: false, id };
};

const getTodoList = async (userId, page) => {
    const offset = (Number(page) - 1) * 5;
    const { count } = await knex('todo').where({ userId }).count('* as count').first();
    const todoList = await knex('todo')
        .where({ userId })
        .limit(5)
        .offset(offset)
        .orderBy('id', 'asc');

    return {
        count: Number(count),
        limit: 5,
        offset,
        to: offset + todoList.length,
        last_page: count / 5,
        page: Number(page),
        from: offset,
        rows: todoList
    }
};

const updateTodo = async todo => {
    return await knex('todo').where('id', '=', todo.id).update(todo, ['id', 'userId', 'name', 'isDone']);
};

const deleteTodo = async id => {
    return knex('todo').where('id', id).del();
}

module.exports = {
    createTodo,
    getTodoList,
    updateTodo,
    deleteTodo,
}