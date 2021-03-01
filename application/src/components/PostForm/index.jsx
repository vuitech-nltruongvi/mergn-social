// Libraries
import React, {useState} from 'react';
import {Button, Form} from 'semantic-ui-react';
import {gql, useMutation} from '@apollo/client';

// Hooks
import {useForm} from '../../utils/hooks';

// Utils
import {getObjectPropSafely} from '../../utils/index';

// Graph query
import {FETCH_POSTS_QUERY} from '../../utils/graphql';

const PostForm = () => {
    // State
    const [errors, setErrors] = useState({});

    // NOTE: Hook userForm
    const {onChange, onSubmit, values} = useForm(createPostCallback, {
        body: ''
    });
    
    const [createPost, {error}] = useMutation(CREATE_POST, {
        variables: values,
        update(proxy, result) {
            const data = proxy.readQuery({query: FETCH_POSTS_QUERY}) || {};
            const {getPosts = []} = data;

            proxy.writeQuery({query: FETCH_POSTS_QUERY, data: {
                ...data,
                getPosts: [result.data.createPost, ...getPosts]
            }});
            values.body = '';
        },
        onError(err) {
            setErrors(getObjectPropSafely(() => err.graphQLErrors[0].extensions.exception.errors, {}));
        }
    });

    function createPostCallback() {
        createPost();
    }

    return (
        <Form onSubmit={onSubmit}>
            <h2>Create a post:</h2>
            <Form.Field>
                <Form.Input 
                    placeholder='Hi world!'
                    type='text'
                    name='body'
                    error={errors.body}
                    onChange={onChange}
                    value={values.body}
                />
                <Button color='teal' type='submit'>
                    Submit
                </Button>
            </Form.Field>
            {Object.keys(errors).length ? (
                <div className='ui error message'>
                    <ul className='list'>
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </Form>
    );
};

// NOTE: 
PostForm.propTypes = {};
PostForm.defaultProps = {};

// NOTE: gql
const CREATE_POST = gql`
    mutation createPost($body: String!){
        createPost(body: $body) {
            id body createdAt username
            likes {
                id username createdAt
            }
            likeCount
            comments {
                id body username createdAt
            }
            commentCount
        }
    }
`;

export default PostForm;