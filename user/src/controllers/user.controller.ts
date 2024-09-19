import { RequestHandler } from "express";
import userService from "../services/user.services";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import { ObjectId } from "mongoose";

const createUser: RequestHandler<unknown, unknown, CreateUserDto, unknown> = async (req, res, next) => {
    try {
        const userData = req.body;
        
        const result = await userService.createUser(userData);

        res.status(201).json(result);
    } catch (error) {
        next(error)
    }
}

const getUserById: RequestHandler<{ userId: ObjectId }, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await userService.getUserById(userId);

        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}

const getUserByEmail: RequestHandler<unknown, unknown, unknown, { email: string }> = async (req, res, next) => {
    try {
        const { email } = req.query;

        const user = await userService.getUserByEmail(email);

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        
        next(error)
    }
}

const updateUser: RequestHandler<{ userId: ObjectId }, unknown, UpdateUserDto, unknown> = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const userData = req.body;

        const result = await userService.updateUser(userId, userData);
        res.status(201).json(result);
    } catch (error) {
        next(error)
    }
}

const deleteUser: RequestHandler<{ userId: ObjectId }, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const result = await userService.deleteUser(userId);
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}


const userController = {
    createUser,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
}

export default userController;