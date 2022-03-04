const { v4: uuid } = require("uuid")

exports.Mutation = {
  addCategory: (parent, { input }, { categories }) => {
    const { name } = input

    const newCategory = {
      id: uuid(),
      name,
    }

    categories.push(newCategory)

    return newCategory
  },
  addProduct: (parent, { input }, { products }) => {
    const { name, image, price, onSale, quantity, categoryId } = input

    const newProduct = {
      id: uuid(),
      name,
      description,
      image,
      price,
      onSale,
      quantity,
      categoryId,
    }

    products.push(newProduct)

    return newProduct
  },
}
