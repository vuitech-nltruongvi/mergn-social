// Libraries
const { AuthenticationError, UserInputError } = require("apollo-server")

// Model
const Post = require('../../models/Post')

// Utils
const checkAuth = require('../../utils/checkAuth')
const { validateCreatePost } = require('../../utils/validator')

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });

                return posts
            } catch (error) {
                throw new Error(error)
            }
        },
        async getPost(_, { postId = '' }) {
            try {
                const post = await Post.findById(postId)

                if (post) {
                    return post;
                } else {
                    throw new Error('Post not found')
                }
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        async createPost(_, { body }, context) {
            const user = checkAuth(context)
            const {valid, errors} = validateCreatePost(body)

            if (!valid) {
                throw new UserInputError('Errors', { errors })
            }

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })

            const post = await newPost.save()

            context.pubsub.publish('NEW_POST', {
                newPost: post
            })

            return post;
        },
        async deletePost(_, { postId }, context) {
            const user = checkAuth(context) || {}

            try {
                const post = await Post.findById(postId)

                if (user && user.username === post.username) {
                    await post.delete();
                    return 'Post deleted successfully'
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } catch (error) {
                throw new Error(error)
            }
        },
        async likePost(_, { postId }, context) {
            const { username } = checkAuth(context)

            const post = await Post.findById(postId)

            if (post) {
                if (post.likes.find(like => like.username === username)) {
                    // Post already likes, unlike it
                    post.likes = post.likes.filter(like => like.username !== username)
                } else {
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }

                await post.save()
                return post;
            } else {
                throw new UserInputError('Post not found')
            }
        }
    },
    Subscription: {
        newPost: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
        }
    }
}