// Libraries
import React, {useState, useContext} from 'react';
import {Button, Form} from 'semantic-ui-react';
import {gql, useMutation} from '@apollo/client';

// Hooks
import {useForm} from '../utils/hooks';

// Context
import {AuthContext} from '../context/auth';

const Login = (props) => {
    // NOTE: State
    const [errors, setErrors] = useState({});

    // NOTE: Context
    const context = useContext(AuthContext);

    // NOTE: Use Hooks
    /**
     * Hook useForm
     * @constructor()
     * @param {Function} loginUser
     * @param {Object} initialState
     */
    const {onChange, onSubmit, values} = useForm(loginUser, {
        username: '',
        password: ''
    });

    // NOTE: Graphql mutation
    const [login, {loading}] = useMutation(LOGIN_USER, {
        update(_, {data: {login: userData}}) {
            context.login(userData);

            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUser() {
        login();
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    label='Username'
                    placeholder='Username...'
                    name='username'
                    type='text'
                    error={errors.username ? true : false}
                    value={values.username}
                    onChange={onChange}
                />
                <Form.Input
                    label='Password'
                    placeholder='Password...'
                    name='password'
                    type='password'
                    error={errors.password ? true : false}
                    value={values.password}
                    onChange={onChange}
                />
                <Button type='submit' primary>
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length ? (
                <div className='ui error message'>
                    <ul className='list'>
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    );
};

// NOTE: Query graphql
const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            loginInput: {
                username: $username
                password: $password
            }
        ) {
            id email username createdAt token
        }
    }
`;

export default Login;