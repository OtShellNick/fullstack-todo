const { getUserByEmail } = require('./../actions/user.actions');

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

                try {
                    const user = await getUserByEmail(email);
                    console.log(user);
                } catch (err) {
                    console.error(err);
                }
                console.log('params', params);
            }
        }
    }
}