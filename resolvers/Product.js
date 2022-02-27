exports.Product = {
  category: (parent, args, context) => {
    const categories = context.categories
    console.log(context)
    return categories.find((category) => category.id === parent.categoryId)
  },
}
