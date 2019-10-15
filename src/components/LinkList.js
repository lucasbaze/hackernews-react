import React, { useEffect } from 'react';
import Link from './Link';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const FEED_QUERY = gql`
    query {
        feed {
            links {
                id
                url
                description
                createdAt
                postedBy {
                    id
                    name
                }
                votes {
                    id
                    user {
                        id
                    }
                }
            }
        }
    }
`;

const LinkList = () => {
    const { loading, error, data } = useQuery(FEED_QUERY);

    if (loading) return <div>Fetching...</div>;
    if (error) return <div>Error: ${error.message}</div>;

    console.log(data);

    const _updateCacheAfterVote = (store, createdVote, linkId) => {
        const data = store.readQuery({ query: FEED_QUERY });

        const votedLink = data.feed.links.find(link => link.id == linkId);
        votedLink.votes = createdVote.link.votes;

        store.writeQuery({ query: FEED_QUERY, data });
    };

    return (
        <div>
            {data.feed.links.map((link, index) => (
                <Link
                    key={link.id}
                    link={link}
                    index={index}
                    updateStoreAfterVote={_updateCacheAfterVote}
                />
            ))}
        </div>
    );
};

export default LinkList;
