import mongoose from 'mongoose'

import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLInt
} from 'graphql';

// Let Define Mongoose Schema
var PRODUCT = mongoose.model('Product', {
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  inStock: Boolean
})

// Mongoose Connection
var COMPOSE_URI_DEFAULT = 'mongodb://localhost/test'
mongoose.connect(process.env.COMPOSE_URI || COMPOSE_URI_DEFAULT, function (error) {
  if (error) console.error(error)
  else console.log('mongo connected')
})


// Product type for GraphQL
let productType = new GraphQLObjectType({
  name: 'product',
  fields: () => ({
    id: {
      type: GraphQLID,
      description: 'product id '
    },
    title: {
      type: GraphQLString,
      description: 'product title'
    },
    inStock: {
      type: GraphQLBoolean,
      description: 'product stock status'
    }
  })
})

// Function for fetch all product

const productListAll = () => {
  return new Promise((resolve, reject) => {
    PRODUCT.find((err, products) => {
      if (err) reject(err)
      else resolve(products)
    })
  })
}
// A GraphQL schema provides a root type for each kind of operation.
// Query one is here.

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    products: {
      type: new GraphQLList(productType),
      resolve: () => {
        return productListAll()
      }
    }
  })
})

const mutationAdd = {
    type: productType,
    description: 'Add a Product',
    args: {
      title: {
        name: 'Product title',
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: (root, args) => {
      let newProduct = new PRODUCT({
        title: args.title,
        inStock: false
      })
      newProduct.id = newProduct._id
      return new Promise((resolve, reject) => {
        newProduct.save((err) => {
          if (err) reject(err)
          else resolve(newProduct)
        })
      })
    }
}

// FIXME:0 rename this motherfucker

const mutationDestroy = {
  type: productType,
  description: 'Destroy product',
  args: {
    id: {
      name: 'Product ID',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, args) => {
    return new Promise((resolve, reject) => {
      PRODUCT.findById(args.id, (err, product) => {
        if (err) {
          reject(err)
        } else if (!product) {
          reject('Product Not found')
        } else {
          product.remove((err) => {
            if (err) reject(err)
            else resolve(product)
          })
        }
      })
    })
  }
}

// TODO:10 fix the name accordingl
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    add: mutationAdd,
    destroy: mutationDestroy,
  }
})




let schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});

export default schema;
