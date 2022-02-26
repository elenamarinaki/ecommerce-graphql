const { ApolloServer, gql } = require("apollo-server")

// note: cannot import statement outside a module
// import { ApolloServer, gql } from "apollo-server"

const { products } = require("./products")
const { categories } = require("./categories")
// log
console.log("categories are: ", categories)

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
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }
  # when we query non scalar types, we have to specify which parts
  # of the objects we want - we cannot ask for the whole object
  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    category: Category
  }

  type Category {
    id: ID!
    name: String!
    # associating products with categories
    products: [Product!]!
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
  // note: ------------------------------------------------
  // everything under "Query" resolves scalar only types???
  // not sure 🤔
  Query: {
    hello: () => {
      return ["hello", "World", "!!"]
      // this works if the type is just String
      // no (!)
      // return null
    },
    products: () => products,
    // the args is the argument that we pass into our query as an ID
    product: (parent, args, context) => {
      console.log(args)
      return products.find((product) => args.id === product.id)
    },
    categories: () => categories,
    category: (parent, args, context) => {
      return categories.find((category) => args.id === category.id)
    },
  },
  Category: {
    products: (parent, args, context) => {
      const categoryId = parent.id
      return products.filter((product) => product.categoryId === categoryId)
    },
  },
  Product: {
    category: (parent, args, context) => {
      return categories.find((category) => category.id === parent.categoryId)
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
