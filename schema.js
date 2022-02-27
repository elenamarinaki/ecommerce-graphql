const { gql } = require("apollo-server")
/**
 * here we're defining how a query should look
 */
/**
 * the 'String' here is a Scalar type
 * in general, we have 2 options: we can return something that
 * is scalar or an object type
 * Scalar types are -> String, Int, Float, Boolean, ID
 */
exports.typeDefs = gql`
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
