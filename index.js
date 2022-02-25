const { ApolloServer, gql } = require("apollo-server")

// note: cannot import statement outside a module
// import { ApolloServer, gql } from "apollo-server"

const { products } = require("./products")
// log
console.log("products are: ", products)

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
    hello: [String!]!
    products: [Product!]!
  }
  # when we query non scalar types, we have to specify which parts
  # of the objects we want - we cannot ask for the whole object
  type Product {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
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
      return ["hello", "World", "!!"]
      // this works if the type is just String
      // no (!)
      // return null
    },
    products: () => {
      return products
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
