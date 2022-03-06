exports.Category = {
  products: ({ id: categoryId }, { filter }, { db }) => {
    const categoryProducts = db.products.filter(
      (product) => product.categoryId === categoryId
    )

    if (filter) {
      const { onSale, avgRating } = filter

      let filteredProducts = categoryProducts.filter(
        (product) => product.onSale === onSale
      )

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0
          let numberOfReviews = 0
          db.reviews.forEach((review) => {
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

    return categoryProducts
  },
}
