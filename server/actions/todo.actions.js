const knex = require('./../db');

const createTodo = async data => {
    const [{ id }] = await knex('todo').insert({ ...data, isDone: false }).returning('id');
    return { ...data, isDone: false, id };
};

const getTodoList = async userId => {
    return knex('todo').where({ userId });
}

module.exports = {
    createTodo,
    getTodoList
}