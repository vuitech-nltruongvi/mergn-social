// Libraries
const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose')

// Config
const { MONGODB } = require('./config')

// Module
const Post = require('./models/Post')
const User = require('./models/User')

// Graphql
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
})

// Connect mongodb
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongodb is connected')

    return server.listen({ port: 4000 })
  })
  .then(res => {
    console.log(`Server running at ${res.url}`)
  })

