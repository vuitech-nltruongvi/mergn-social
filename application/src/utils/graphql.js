import {gql} from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
    {
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