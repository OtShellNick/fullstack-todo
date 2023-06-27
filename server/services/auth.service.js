const { Errors: { MoleculerError } } = require('moleculer');
const { getUserByEmail, createUser, loginUser } = require('./../actions/user.actions');

module.exports = {
    name: 'auth',
    version: 1,
    actions: {
        register: {
            rest: "POST /register",
            params: {
                email: { type: 'string', optoinal: false },
                password: { type: 'string', optoinal: false }
            },
            handler: async ({ params, ctx }) => {
                const { email, password } = params;
                let user = null;

                try {
                    [user] = await getUserByEmail(email);

                    if (!user) {
                        user = await createUser({ email, password });
                        return { token: await loginUser(user) };
                    }

                    throw new MoleculerError('User already exists', 409, 'ALREADY_EXISTS', { error: 'User already exists' });
                } catch (err) {
                    console.error(err);
                    throw new MoleculerError(
                        err.message || 'Internal server error',
                        err.code || 500,
                        err.type || 'INTERNAL_SERVER_ERROR',
                        err.data || { error: 'Internal server' }
                    );
                }
            }
        }
    }
}