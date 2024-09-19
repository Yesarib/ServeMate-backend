import createHttpError from "http-errors";
import { LoginDto } from "../dtos/auth.dto";
import axios from "axios";
import { isValidPassword } from "../utils/auth.utils";
import { signAccessToken, signRefreshToken } from "../middlewares/jwt";
import { ApiResponseDto } from "../dtos/api.dto";

const login = async (loginData: LoginDto) => {
    try {
        const response = await axios.get(`http://localhost:8081/getByEmail?email=${loginData.email}`)

        const user = response.data.data;

        if (!user) {
            throw createHttpError.NotFound('User not found');
        }
        
        const isMatch = await isValidPassword(loginData.password, user.password);

        if (!isMatch) {
            throw createHttpError[401]('Email or password doesn\'t match');
        }

        const accessToken = await signAccessToken(user._id, user.role);
        const refreshToken = await signRefreshToken(user._id, user.role);

        return new ApiResponseDto(true, { accessToken, refreshToken })
    } catch (error) {
        throw error
    }
}

const authService = {
    login
}

export default authService