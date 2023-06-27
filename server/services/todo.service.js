const { Errors: { MoleculerError } } = require('moleculer');
const { createTodo, getTodoList, updateTodo, deleteTodo } = require('./../actions/todo.actions');

module.exports = {
    name: 'todo',
    version: 1,
    actions: {
        add: {
            rest: "POST /add",
            params: {
                name: { type: 'string', optoinal: false },
            },
            handler: async ({ params, meta }) => {
                const { name } = params;

                try {
                    return await createTodo({ name, userId: meta.user.id });
                } catch (err) {
                    console.error('error create todo', err);
                    throw new MoleculerError(
                        err.message || 'Internal server error',
                        err.code || 500,
                        err.type || 'INTERNAL_SERVER_ERROR',
                        err.data || { error: 'Internal server' }
                    );
                }
            }
        },
        get: {
            rest: "GET /get",
            handler: async ({ meta }) => {

                try {
                    return await getTodoList(meta.user.id);
                } catch (err) {
                    console.error('error create todo', err);
                    throw new MoleculerError(
                        err.message || 'Internal server error',
                        err.code || 500,
                        err.type || 'INTERNAL_SERVER_ERROR',
                        err.data || { error: 'Internal server' }
                    );
                }
            }
        },
        update: {
            rest: 'POST /update',
            params: {
                id: { type: 'number', optoinal: false },
                name: { type: 'string', optional: true },
                isDone: { type: 'boolean', optional: true },
            },
            handler: async ({ params }) => {
                const { id, name, isDone } = params;

                try {
                    return await updateTodo({ id, name, isDone });
                } catch (err) {
                    console.error('error create todo', err);
                    throw new MoleculerError(
                        err.message || 'Internal server error',
                        err.code || 500,
                        err.type || 'INTERNAL_SERVER_ERROR',
                        err.data || { error: 'Internal server' }
                    );
                }
            }
        },
        delete: {
            rest: 'DELETE /delete',
            params: {
                id: { type: 'number', optional: false }
            },
            handler: async ({ params }) => {
                const { id } = params;

                try {
                    return await deleteTodo(id);
                } catch (err) {
                    console.error('error create todo', err);
                    throw new MoleculerError(
                        err.message || 'Internal server error',
                        err.code || 500,
                        err.type || 'INTERNAL_SERVER_ERROR',
                        err.data || { error: 'Internal server' }
                    );
                }
            }
        }
    },

}