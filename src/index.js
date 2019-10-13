import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-boost';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
});

const authLink = new ApolloLink((operation, forward) => {
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjazFsb3BiZDNtNTlvMGIwOXRsY3BzN3VmIiwiaWF0IjoxNTcwOTM1NzU2fQ.WlCxRAL0ykbrM-Kg5VWoLp0PsUxabQjY2Tv1dMPXc0s';

    operation.setContext({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return forward(operation);
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
