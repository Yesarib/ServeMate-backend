import { Request, Response } from 'express';

// Custom Error interface
interface CustomError extends Error {
    status?: number;
}

// Error handling middleware
const errorHandler = (err: CustomError, req: Request, res: Response) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
};

export default errorHandler;
