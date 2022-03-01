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
  products: (parent, { filter }, { products, reviews }) => {
    if (filter) {
      const { onSale, avgRating } = filter

      let filteredProducts = products.filter(
        (product) => product.onSale === onSale
      )

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0
          let numberOfReviews = 0
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating
              numberOfReviews++
            }
          })
          let avgProductRating = sumRating / numberOfReviews
          return avgProductRating >= avgRating
        })
      }
      return filteredProducts
    }
    return products
  },
  // the args is the argument that we pass into our query as an ID
  product: (parent, { id }, { products }) => {
    return products.find((product) => id === product.id)
  },
  categories: (parent, args, { categories }) => categories,
  category: (parent, { id }, { categories }) => {
    return categories.find((category) => id === category.id)
  },
}
