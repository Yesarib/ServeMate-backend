
import { RequestHandler } from "express";
import categoryService from "../../services/category.services";


const createCategory: RequestHandler = async (req, res, next) => {
    try {
        const categoryData = req.body;

        const result = await categoryService.createCategory(categoryData)
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

const getCompanyCategories: RequestHandler = async (req, res, next) => {
    try {
        const { company } = req.query;
        if (typeof company !== 'string') {
            return res.status(400).json({ error: 'Invalid company ID' });
        }

        const categories = await categoryService.getCompanyCategories(company);

        res.status(200).json(categories)
    } catch (error) {
        next(error)
    }
}

const getCategoryById:RequestHandler = async(req,res,next) => {
    try {
        const { categoryId } = req.params;

        const company = await categoryService.getCategoryById(categoryId);

        res.status(200).json(company)
    } catch (error) {
        next(error)
    }
}

const updateCategory:RequestHandler = async(req,res,next) => {
    try {
        const { categoryId } = req.params;
        const categoryData = req.body;

        const result = await categoryService.updateCategory(categoryId,categoryData);

        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

const deleteCategory:RequestHandler = async(req,res,next) => {
    try {
        const { categoryId } = req.params;

        const result = await categoryService.deleteCategory(categoryId);

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}


const categoryController = {
    createCategory,
    getCompanyCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}

export default categoryController