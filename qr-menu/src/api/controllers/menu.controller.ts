import { RequestHandler } from "express";
import menuService from "../../services/menu.services";


const createMenu: RequestHandler = async (req, res, next) => {
    try {
        const menuData = req.body;

        const result = await menuService.createMenu(menuData);
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

const getCompanyMenu: RequestHandler = async (req, res, next) => {
    try {
        const { company } = req.params;

        const menus = await menuService.getCompanyMenu(company);

        res.status(200).json(menus)
    } catch (error) {
        next(error)
    }
}

const getMenuById: RequestHandler = async (req, res, next) => {
    try {
        const { menuId } = req.params;

        const menu = await menuService.getMenuById(menuId);

        res.status(200).json(menu)
    } catch (error) {
        next(error)
    }
}

const updateMenu: RequestHandler = async (req, res, next) => {
    try {
        const { menuId } = req.params;
        const menuData = req.body;

        const result = await menuService.updateMenu(menuId, menuData);

        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

const pullMenuCategory: RequestHandler = async (req, res, next) => {
    try {
        const { menuId } = req.params;
        const { categoryId } = req.body;
        const result = await menuService.pullMenuCategory(menuId,categoryId);

        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}

const deleteMenu: RequestHandler = async (req, res, next) => {
    try {
        const { menuId } = req.params;

        const result = await menuService.deleteMenu(menuId);

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const menuController = {
    createMenu,
    getCompanyMenu,
    getMenuById,
    updateMenu,
    deleteMenu,
    pullMenuCategory
}

export default menuController;