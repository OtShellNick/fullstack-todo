const knex = require('./../db');

const createTodo = async data => {
    const [{ id }] = await knex('todo').insert({ ...data, isDone: false }).returning('id');
    return { ...data, isDone: false, id };
};

const getTodoList = async userId => {
    return knex('todo').where({ userId });
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