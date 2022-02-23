const { ApolloServer, gql } = require("apollo-server")

/**
 * here we're defining how a query should look
 */
const typeDefs = gql`
  type Query {
    hello: String
  }
`
/**
 * here we are resolving the query, by returning information
 * depending on how it's defined above
 */
const resolvers = {
  Query: {
    hello: () => {
      return "World!"
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log("🚀 Server is ready at:", url)
})
