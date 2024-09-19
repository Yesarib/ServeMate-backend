import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    status?: number;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
};

export default errorHandler;
