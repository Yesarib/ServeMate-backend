import { gql } from 'apollo-server-express';
import Product from '../models/product.model';

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
    },
};