const { categories } = require("../db")

exports.Product = {
  category: (parent, args, context) => {
    return categories.find((category) => category.id === parent.categoryId)
  },
}
