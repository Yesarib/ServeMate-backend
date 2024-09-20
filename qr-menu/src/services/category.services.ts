import mongoose from "mongoose";
import { ApiResponseDto } from "../dtos/api.dto";
import { CreateCategoryDto, UpdateCategoryDto } from "../dtos/category.dto";
import CategoryModel from "../models/category.model";
import { fetchProductsByIds } from "../utils/fetchProductsWithGraphQL";
import createHttpError from "http-errors";


const createCategory = async (categoryData: CreateCategoryDto) => {
    const products = await fetchProductsByIds(categoryData.products);

    const category = new CategoryModel({
        name: categoryData.name,
        imagePath: categoryData.imagePath,
        products: products,
        companyId: categoryData.companyId
    })

    await category.save();

    return new ApiResponseDto(true, category)
}

const getCompanyCategories = async (companyId: string) => {
    const categories = await CategoryModel.find({ companyId: companyId });

    return new ApiResponseDto(true, categories)
}

const getCategoryById = async (categoryId: string) => {
    const objectId = new mongoose.Types.ObjectId(categoryId);

    const category = await CategoryModel.findById(objectId);

    if (!category) {
        throw createHttpError.NotFound('Category not found!')
    }

    return new ApiResponseDto(true, category)
}

const updateCategory = async (categoryId: string, categoryData: UpdateCategoryDto) => {
    const objectId = new mongoose.Types.ObjectId(categoryId);
    const category = await CategoryModel.findByIdAndUpdate(objectId, categoryData);
    if (!category) {
        throw createHttpError.NotFound('Category not found!')
    }

    return new ApiResponseDto(true, category)
}

const deleteCategory = async(categoryId:string) => {
    const objectId = new mongoose.Types.ObjectId(categoryId);
    const category = await CategoryModel.findByIdAndDelete(objectId);
    if (!category) {
        throw createHttpError.NotFound('Category not found!')
    }

    return new ApiResponseDto(true, {message:"Category successfully deleted!"})
}

const categoryService = {
    createCategory,
    getCompanyCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}

export default categoryService