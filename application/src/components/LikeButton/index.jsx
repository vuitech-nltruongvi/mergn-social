// Libraries
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Popup} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {gql, useMutation} from '@apollo/client';

const LikeButton = (props) => {
    // NOTE: State
    const [liked, setLiked] = useState(false);
    
    // NOTE: Props
    const {post: {id = '', likes = [], likeCount = 0} = {}, user} = props;

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {postId: id}
    });

    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);

    const onClickLikePost = () => {
        likePost();
    };

    return (
        <>
            {user ? (
                <Popup 
                    content= 'Like post'
                    trigger = {
                        <Button
                            color='teal'
                            icon='heart'
                            label={{basic: liked ? false : true, color: 'teal', pointing: 'left', content: likeCount}}
                            onClick={onClickLikePost}
                        />
                    }
                />
            ) : (
                <Popup 
                    content= 'Like post'
                    trigger = {
                        <Button
                            color='teal'
                            icon='heart'
                            label={{basic: true, color: 'teal', pointing: 'left', content: likeCount}}
                            as={Link}
                            to='/login'
                        /> 
                    }
                />
            
            )}
        </>
    );
};

LikeButton.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string,
        likes: PropTypes.array,
        likeCount: PropTypes.number
    }),
    user: PropTypes.shape({

    })
};

LikeButton.defaultProps = {
    post: {
        id: '',
        likes: [],
        likeCount: 0
    },
    user: {

    }
};

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id username
            }
            likeCount
        }
    }
`;

export default LikeButton;