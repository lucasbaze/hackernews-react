import React, { useState, useEffect } from 'react';
import { AUTH_TOKEN } from '../constants';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const SIGNUP_MUTATION = gql`
    mutation SignupMutation(
        $name: String!
        $email: String!
        $password: String!
    ) {
        signup(name: $name, email: $email, password: $password) {
            token
        }
    }
`;

const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

const Login = ({ history }) => {
    const [login, setLogin] = useState(false);
    const [values, setValues] = useState({
        email: '',
        password: '',
        name: '',
    });

    const [loginSignup, { data }] = useMutation(
        login ? LOGIN_MUTATION : SIGNUP_MUTATION
    );

    const _handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const _confirm = async () => {
        // ... you'll implement this 🔜
        console.log('Data: ', data, 'Values: ', values);
        await loginSignup({ variables: { ...values } });
    };

    useEffect(() => {
        let login = data && data.login;
        let signup = data && data.signup;

        if (login || signup) {
            let token = (login && login.token) || (signup && signup.token);
            localStorage.setItem(AUTH_TOKEN, token);
            history.push('/');
        }
    }, [data]);

    return (
        <div>
            <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
            <div className="flex flex-column">
                {!login && (
                    <input
                        value={values.name}
                        name="name"
                        onChange={_handleChange}
                        type="text"
                        placeholder="Your name"
                    />
                )}
                <input
                    value={values.email}
                    name="email"
                    onChange={_handleChange}
                    type="text"
                    placeholder="Your email address"
                />
                <input
                    name="password"
                    value={values.password}
                    onChange={_handleChange}
                    type="password"
                    placeholder="Choose a safe password"
                />
            </div>
            <div className="flex mt3">
                <div className="pointer mr2 button" onClick={() => _confirm()}>
                    {login ? 'login' : 'create account'}
                </div>
                <div
                    className="pointer button"
                    onClick={() => setLogin(!login)}
                >
                    {login
                        ? 'need to create an account?'
                        : 'already have an account?'}
                </div>
            </div>
        </div>
    );
};

export default Login;
