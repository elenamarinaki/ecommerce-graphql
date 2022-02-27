const { ApolloServer } = require("apollo-server")
const { typeDefs } = require("./schema")

// note: cannot import statement outside a module
// import { ApolloServer, gql } from "apollo-server"

const { products } = require("./products")
const { categories } = require("./categories")
// log
console.log("categories are: ", categories)

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
