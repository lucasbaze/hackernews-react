import React from 'react';
import Link from './Link';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const LinkList = () => {
    const FEED_QUERY = gql`
        query {
            feed {
                links {
                    id
                    url
                    description
                    createdAt
                }
            }
        }
    `;

    const { loading, error, data } = useQuery(FEED_QUERY);

    if (loading) return <div>Fetching...</div>;
    if (error) return <div>Error: ${error.message}</div>;

    return (
        <div>
            {data.feed.links.map(link => (
                <Link key={link.id} link={link} />
            ))}
        </div>
    );
};

export default LinkList;
