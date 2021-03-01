// Libraries
import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Card, Image, Button, Label, Icon, Popup} from 'semantic-ui-react';
import moment from 'moment';
import {Link} from 'react-router-dom';

// Context
import {AuthContext} from '../../context/auth';

// Components
import LikeButton from '../LikeButton';
import DeleteButton from '../DeleteButton';
import CustomPopup from '../CustomPopup';

const PostCard = (props) => {
    // NOTE: Props
    const {post: {body, createdAt, id, username, likeCount, commentCount, likes, comments} = {}} = props;
    const {user} = useContext(AuthContext);

    return (
        <Card style={{width: '100%'}}>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/elliot.jpg'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{id, likes, likeCount}} />
                <CustomPopup content='Comment on post'>
                    <Button
                        color='blue'
                        icon='comments'
                        label={{basic: true, color: 'blue', pointing: 'left', content: commentCount}}
                        as={Link}
                        to={`/posts/${id}`}
                    />
                </CustomPopup>
                {user && user.username === username && (
                    <DeleteButton postId={id} />
                )}
            </Card.Content>
        </Card>
    );
};

// NOTE: Check propTypes
PostCard.propTypes = {
    post: PropTypes.shape({
        body: PropTypes.string,
        createdAt: PropTypes.string,
        id: PropTypes.string.isRequired,
        username: PropTypes.string,
        likeCount: PropTypes.number,
        commentCount: PropTypes.number,
        likes: PropTypes.array,
        comments: PropTypes.array
    })
};

// NOTE: Set defaultProps
PostCard.defaultProps = {
    post: {}
};

export default PostCard;