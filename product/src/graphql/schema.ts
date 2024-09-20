import { gql } from 'apollo-server-express';
import Product from '../models/product.model';
import mongoose from 'mongoose';

export const typeDefs = gql`
  type Product {
        id: ID!,
        name: String!,
        description: String!,
        price: Int!,
        companyId: String!
    }

  type Query {
    products: [Product]
    product(id:ID!) : Product
    getProductsByIds(productIds: [String!]!): [Product]
  }
`;

export const resolvers = {
  Query: {

    products: async () => {
      return await Product.find();
    },

    product: async (_: unknown, args: { id: string }) => {
      const { id } = args;

      return await Product.findById(id);
    },

    getProductsByIds: async (_: unknown, args: { productIds: string[] }) => {
      const { productIds } = args;

      const objIds = productIds.map(id => new mongoose.Types.ObjectId(id));
      const products = await Product.find({ _id: { $in: objIds } })

      return products
    }
  },
};