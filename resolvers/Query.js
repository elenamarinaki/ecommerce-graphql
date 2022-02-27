const { products, categories } = require("../db")

/**
 * here we are resolving the query, by returning information
 * depending on how it's defined above
 */
/**
 * types are strict, we cannot return something else of what
 * we have declared in the schema
 */

// note: ------------------------------------------------
// everything under "Query" resolves scalar only types???
// not sure 🤔

exports.Query = {
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
}
