// Libraries
import React, {useState} from 'react';
import {Button, Confirm} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {gql, useMutation} from '@apollo/client';

// Graphql 
import {FETCH_POSTS_QUERY} from '../../utils/graphql';

// Components
import CustomPopup from '../CustomPopup';

const DeleteButton = ({postId, commentId, callback}) => {
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    // State
    const [isOpenConfirm, setOpenConfirm] = useState(false);
    const [deletePostOrMutation] = useMutation(mutation, {
        variables: {postId, commentId},
        onError() {

        },
        update(proxy) {
            setOpenConfirm(false);

            if (!commentId) {
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });

                let {getPosts = []} = data;

                getPosts = getPosts.filter(post => post.id !== postId);

                proxy.writeQuery({query: FETCH_POSTS_QUERY, data: {...data, getPosts}});
            }

            if (callback) {callback()}
        }   
    });

    return (
        <>
            <CustomPopup content={!commentId ? 'Delete post' : 'Delete comment'}>
                <Button
                    color='red'
                    icon='trash'
                    floated='right'
                    onClick={() => setOpenConfirm(true)}
                />
            </CustomPopup>
            <Confirm 
                open={isOpenConfirm}
                onCancel={() => setOpenConfirm(false)}
                onConfirm={deletePostOrMutation}
            />
        </>
    );
};

DeleteButton.propTypes = {
    postId: PropTypes.string

};

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id 
            comments { id username createdAt body}
            commentCount
        }
    }
`;

export default DeleteButton;