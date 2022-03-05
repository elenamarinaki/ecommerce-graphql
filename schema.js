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
  # we can define the the ID parameters here inline, only because these are scalar types
  type Query {
    products(filter: ProductsFilterInput): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Mutation {
    addCategory(input: AddCategoryInput!): Category!
    addProduct(input: AddProductInput): Product!
    addReview(input: AddReviewInput): Review!
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
    reviews: [Review!]!
  }

  type Category {
    id: ID!
    name: String!
    # associating products with categories
    products(filter: ProductsFilterInput): [Product!]!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }

  input ProductsFilterInput {
    onSale: Boolean
    avgRating: Int
  }

  input AddCategoryInput {
    name: String!
  }

  input AddProductInput {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    categoryId: String!
  }

  input AddReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: String!
  }
`
