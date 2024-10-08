import mongoose from "mongoose";
import { ApiResponseDto } from "../dtos/api.dto";
import { CreateProductDto, UpdateProductDto } from "../dtos/product.dto";
import Product from "../models/product.model";
import createHttpError from "http-errors";

const createProduct = async (productData: CreateProductDto) => {
    const product = new Product(productData);
    await product.save();
    return new ApiResponseDto(true, product)
}

const getCompanyProducts = async (companyId: string) => {
    const products = await Product.find({ companyId: companyId })

    return new ApiResponseDto(true, products)
}

const getProductById = async (productId: string) => {
    const objId = new mongoose.Types.ObjectId(productId);

    const product = await Product.findById(objId);

    if (!product) {
        throw createHttpError.NotFound('Product not found!')
    }

    return new ApiResponseDto(true, product)
}

const getProductsByIds = async (_:any, args: { ids: string[] }, { Product }:any) => {
    const { ids } = args;
    
    const objIds = ids.map(id => new mongoose.Types.ObjectId(id));
    const products = await Product.find({ _id: { $in: objIds } });
    console.log(products);
    
    return products;
};

const updateProduct = async (productId: string, productData: UpdateProductDto) => {
    const objId = new mongoose.Types.ObjectId(productId);

    const product = await Product.findByIdAndUpdate(objId, productData);

    if (!product) {
        throw createHttpError.NotFound('Product not found!')
    }

    return new ApiResponseDto(true, product)
}

const deleteProduct = async (productId: string) => {
    const objId = new mongoose.Types.ObjectId(productId);

    const product = await Product.findByIdAndDelete(objId);

    if (!product) {
        throw createHttpError.NotFound('Product not found!')
    }

    return new ApiResponseDto(true, { message: 'Product successfully deleted!' })
}

const productService = {
    createProduct,
    getCompanyProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByIds
}


export default productService