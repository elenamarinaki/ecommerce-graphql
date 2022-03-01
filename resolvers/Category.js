exports.Category = {
  products: ({ id: categoryId }, { filter }, { products }) => {
    const categoryProducts = products.filter(
      (product) => product.categoryId === categoryId
    )

    if (filter) {
      const filteredProducts = categoryProducts.filter(
        (product) => product.onSale === filter.onSale
      )
      return filteredProducts
    }

    return categoryProducts
  },
}
