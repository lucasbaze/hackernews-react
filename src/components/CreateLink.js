import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { FEED_QUERY } from './LinkList';

const CreateLink = ({ history }) => {
    const [values, setValues] = useState({});

    const POST_MUTATION = gql`
        mutation PostMutation($description: String!, $url: String!) {
            createLink(description: $description, url: $url) {
                id
                createdAt
                description
                url
            }
        }
    `;

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(values);
    };

    const [postLink, { data }] = useMutation(POST_MUTATION, {
        update(
            store,
            {
                data: { createLink },
            }
        ) {
            console.log(store);
            const data = store.readQuery({ query: FEED_QUERY });
            data.feed.links.unshift(createLink);
            store.writeQuery({
                query: FEED_QUERY,
                data,
            });
        },
    });

    const handleSubmit = async () => {
        console.log(values);
        await postLink({
            variables: { ...values },
        });
        history.push('/');
    };

    console.log(data);

    return (
        <div>
            <div className="flex flex-column mt3">
                <input
                    className="mb2"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    type="text"
                    placeholder="A description for the link"
                />
                <input
                    className="mb2"
                    name="url"
                    value={values.url}
                    onChange={handleChange}
                    type="text"
                    placeholder="The URL for the link"
                />
            </div>
            <button onClick={() => handleSubmit()}>Submit</button>
        </div>
    );
};

export default CreateLink;
