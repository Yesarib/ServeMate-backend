import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { ApiResponseDto } from '../dtos/api.dto';

export const validationMiddleware = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoObj = plainToInstance(dtoClass, req.body);

        const errors: ValidationError[] = await validate(dtoObj);

        if (errors.length > 0) {
            const errorMessages = errors.map(err => Object.values(err.constraints || {}).join(', '));
            return res.status(400).json(new ApiResponseDto(false, null, `Validation failed: ${errorMessages.join(', ')}`));
        }

        next();
    };
};
