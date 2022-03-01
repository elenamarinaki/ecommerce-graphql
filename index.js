const { ApolloServer } = require("apollo-server")
const { typeDefs } = require("./schema")

// note: cannot import statement outside a module
// import { ApolloServer, gql } from "apollo-server"

const { Query } = require("./resolvers/Query")
const { Mutation } = require("./resolvers/Mutation")
const { Category } = require("./resolvers/Category")
const { Product } = require("./resolvers/Product")

const { products, categories, reviews } = require("./db")

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Category,
    Product,
  },
  context: {
    products,
    categories,
    reviews,
  },
})

server.listen().then(({ url }) => {
  console.log("🚀 Server is ready at:", url)
})
