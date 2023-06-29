import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    passwordConfirm: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

const RestoreSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

const TodosSchema = Yup.object().shape({
    name: Yup.string().required('Required')
})

export default { RegisterSchema, LoginSchema, TodosSchema, RestoreSchema };