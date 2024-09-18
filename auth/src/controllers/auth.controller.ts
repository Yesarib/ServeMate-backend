import { LoginDto } from "../dtos/auth.dto";
import authService from "../services/auth.services";
import { RequestHandler } from "express";

const validateToken: RequestHandler<unknown, unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const payload = (req as any).payload || {};

        if (!payload) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        res.setHeader('X-Auth-Payload', JSON.stringify(payload));
        res.status(200).json({ valid: true });
    } catch (error) {
        next(error)
    }
}

const login: RequestHandler<unknown, unknown, LoginDto, unknown> = async (req, res, next) => {
    try {
        const loginData = req.body;
        
        const result = await authService.login(loginData);
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const authController = {
    validateToken,
    login
}

export default authController;