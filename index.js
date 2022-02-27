const { ApolloServer } = require("apollo-server")
const { typeDefs } = require("./schema")

// note: cannot import statement outside a module
// import { ApolloServer, gql } from "apollo-server"

const { Query } = require("./resolvers/Query")
const { Category } = require("./resolvers/Category")
const { Product } = require("./resolvers/Product")

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Category,
    Product,
  },
})

server.listen().then(({ url }) => {
  console.log("🚀 Server is ready at:", url)
})
