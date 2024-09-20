import { RequestHandler } from "express";
import productService from "../services/product.services";

const createProduct: RequestHandler = async (req, res, next) => {
    try {
        const productData = req.body;

        const result = await productService.createProduct(productData);

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const getCompanyProducts: RequestHandler = async (req, res, next) => {
    try {
        const { company } = req.query;
        if (typeof company !== 'string') {
            return res.status(400).json({ error: 'Invalid company ID' });
        }
        const products = await productService.getCompanyProducts(company);

        res.status(200).json(products)
    } catch (error) {
        next(error)
    }
}

const getProductById: RequestHandler = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await productService.getProductById(productId);

        res.status(200).json(product)
    } catch (error) {
        next(error)
    }
}

const updateProduct: RequestHandler = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const productData = req.body;
        const result = await productService.updateProduct(productId, productData);

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const deleteProduct: RequestHandler = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const result = await productService.deleteProduct(productId);

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}


const productController = {
    createProduct,
    getCompanyProducts,
    getProductById,
    updateProduct,
    deleteProduct
}

export default productController;