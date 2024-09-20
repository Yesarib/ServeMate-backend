import mongoose from "mongoose";
import { ApiResponseDto } from "../dtos/api.dto";
import { CreateMenuDto, UpdateMenuDto } from "../dtos/menu.dto";
import MenuModel from "../models/menu.model";
import createHttpError from "http-errors";


const createMenu = async (menuData: CreateMenuDto) => {
    const menu = new MenuModel({
        companyId: menuData.companyId,
        categoryIds: menuData.items,
        tableId: menuData.tableId
    })

    await menu.save();

    return new ApiResponseDto(true, menu)
}


const getCompanyMenu = async (companyId: string) => {
    const menus = await MenuModel.find({ companyId: companyId });

    return new ApiResponseDto(true, menus)
}

const getMenuById = async (menuId: string) => {
    const objectId = new mongoose.Types.ObjectId(menuId);
    const menu = await MenuModel.findById(objectId);

    if (!menu) {
        throw createHttpError.NotFound('Menu not found!');
    }

    return new ApiResponseDto(true, menu)
}

const updateMenu = async (menuId: string, menuData: UpdateMenuDto) => {
    const objectId = new mongoose.Types.ObjectId(menuId);
    const menu = await MenuModel.findByIdAndUpdate(
        objectId, 
        { 
            $set: {
                tableId:menuData.tableId,
                companyId: menuData.companyId
            },
            $addToSet: { items: { $each: menuData.items } }
        },
        { new: true, runValidators: true, overwrite: false }
    );
    
    if (!menu) {
        throw createHttpError.NotFound('Menu not found!');
    }

    return new ApiResponseDto(true, menu)
}

const pullMenuCategory = async (menuId: string, categoryId: string) => {
    const objectId = new mongoose.Types.ObjectId(menuId);
    const menu = await MenuModel.findById(menuId);

    if (!menu) {
        throw createHttpError.NotFound('Menu not found!');
    }

    const updatedMenu = await MenuModel.findByIdAndUpdate(
        objectId,
        { $pull: { categoryIds: categoryId } },
        { new: true, runValidators: true }
    );

    if (!updatedMenu) {
        throw createHttpError.NotFound('Menu not found during update!');
    }

    return new ApiResponseDto(true, updatedMenu);
}


const deleteMenu = async (menuId: string) => {
    const objectId = new mongoose.Types.ObjectId(menuId);
    const menu = await MenuModel.findByIdAndDelete(objectId);

    if (!menu) {
        throw createHttpError.NotFound('Menu not found!');
    }

    return new ApiResponseDto(true, { message: 'Menu successfully deleted' })
}

const menuService = {
    createMenu,
    getCompanyMenu,
    getMenuById,
    updateMenu,
    deleteMenu,
    pullMenuCategory
}

export default menuService;