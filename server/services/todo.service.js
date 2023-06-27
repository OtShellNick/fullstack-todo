const { createTodo, getTodoList } = require('./../actions/todo.actions');

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
    },

}