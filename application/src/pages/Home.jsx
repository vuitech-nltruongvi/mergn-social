// Libraries
import React, {useContext} from 'react';
import {useQuery, gql} from '@apollo/client';
import {Grid, Transition} from 'semantic-ui-react';

// Components
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

// Context
import {AuthContext} from '../context/auth';

const Home = () => {
    // NOTE: AuthContext
    const {user} = useContext(AuthContext);

    const {loading, data: {getPosts: posts = []} = {}} = useQuery(FETCH_POSTS_QUERY);

    return (
        <Grid columns={3}>
            <Grid.Row className='page-title'>
                <h1 >Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
                {loading ? (
                    <h1>Loading posts...</h1>
                ) : (
                    <Transition.Group>
                        {
                            posts ? posts.map(post => {
                                return (
                                    <Grid.Column key={post.id} className='mb-20'>
                                        <PostCard post={post} />
                                    </Grid.Column>
                                );
                            }) : 'No data'
                        }
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    );
};

const FETCH_POSTS_QUERY = gql`
   query {
        getPosts{
            id
            body
            username    
            createdAt
            commentCount
            comments { username id createdAt body }
            likes {username}
            likeCount
        }
    }
`;

export default Home;