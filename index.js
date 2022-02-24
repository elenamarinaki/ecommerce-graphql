const { ApolloServer, gql } = require("apollo-server")

/**
 * here we're defining how a query should look
 */
/**
 * the 'String' here is a Scalar type
 * in general, we have 2 options: we can return something that
 * is scalar or an object type
 * Scalar types are -> String, Int, Float, Boolean, ID
 */
const typeDefs = gql`
  type Query {
    hello: String!
    numberOfAnimals: Int
    price: Float
    isCool: Boolean
  }
`
/**
 * here we are resolving the query, by returning information
 * depending on how it's defined above
 */
/**
 * types are strict, we cannot return something else of what
 * we have declared in the schema
 */
const resolvers = {
  Query: {
    hello: () => {
      return "World!"
      // this works if the type is just String
      // no (!)
      //   return null
    },
    numberOfAnimals: () => 55,
    price: () => 5.3,
    isCool: () => false,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log("🚀 Server is ready at:", url)
})
