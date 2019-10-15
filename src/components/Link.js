import React from 'react';
import { AUTH_TOKEN } from '../constants';
import { timeDifferenceForDate } from '../utils';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const VOTE_MUTATION = gql`
    mutation VoteMutation($linkId: ID!) {
        vote(linkId: $linkId) {
            id
            link {
                votes {
                    id
                    user {
                        id
                    }
                }
            }
            user {
                id
            }
        }
    }
`;

const Link = ({ link, index, updateStoreAfterVote }) => {
    const [upVote, { loading, error, data }] = useMutation(VOTE_MUTATION, {
        update(
            store,
            {
                data: { vote },
            }
        ) {
            console.log(store);
            updateStoreAfterVote(store, vote, link.id);
        },
    });

    const _voteForLink = () => {
        upVote({ variables: { linkId: link.id } });
    };

    console.log('Loading: ', loading, 'Error: ', error);
    console.log(link);

    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
        <div className="flex mt2 items-start">
            <div className="flex items-center">
                <span className="gray">{index + 1}.</span>
                {authToken && (
                    <div
                        className="ml1 gray f11"
                        onClick={() => _voteForLink()}
                        style={{ cursor: 'pointer' }}
                    >
                        ▲
                    </div>
                )}
            </div>
            <div className="ml1">
                <div>
                    {link.description} ({link.url})
                </div>
                <div className="f6 lh-copy gray">
                    {link.votes.length} votes | by{' '}
                    {link.postedBy ? link.postedBy.name : 'Unknown'}{' '}
                    {timeDifferenceForDate(link.createdAt)}
                </div>
            </div>
        </div>
    );
};

export default Link;
