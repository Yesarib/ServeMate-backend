import User from "../models/user.model";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto";
import createHttpError from "http-errors";
import { ObjectId } from "mongoose";
import { ApiResponseDto } from "../dtos/api.dto";
import { getHashedPassword } from "../utils/hash";

const createUser = async (userData: CreateUserDto) => {
    const user = await User.findOne({ email: userData.email })

    if (user) {
        throw createHttpError.Conflict('This user already exist')
    }

    const hashedPassword = await getHashedPassword(userData.password);

    const newUser = new User({
        fullName: userData.fullName,
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
        phoneNumber:userData.phoneNumber,
        companyId: userData.companyId
    });

    await newUser.save();

    return new ApiResponseDto(true, newUser)
}

const getUserById = async (userId: ObjectId) => {
    const user = await User.findById(userId);

    if (!user) {
        throw createHttpError.NotFound('User not found');
    }

    return new ApiResponseDto(true, user)
}

const getUserByEmail = async (email: string) => {
    const user = await User.findOne({ email: email });

    if (!user) {
        throw createHttpError.NotFound('User not found');
    }

    return new ApiResponseDto(true, user)
}

const updateUser = async (userId: ObjectId, userData: UpdateUserDto) => {
    const updatedUser = await User.findByIdAndUpdate(userId, userData);

    if (!updatedUser) {
        throw createHttpError.NotFound('User not found');
    }

    return new ApiResponseDto(true, { message: 'User successfully updated!' })
}

const deleteUser = async (userId: ObjectId) => {
    const deletedUser = await User.findByIdAndDelete(userId)
    if (!deletedUser) {
        throw createHttpError.NotFound('User not found');
    }

    return new ApiResponseDto(true, { message: 'User successfully deleted!' })
}

const userService = {
    createUser,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
}

export default userService;