import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongoose';
import JWT, { JwtPayload } from 'jsonwebtoken';
import createError from 'http-errors';

interface CustomJwtPayload extends JwtPayload {
    aud?: string; // veya doğru türü tanımlayın
    role?: string;
}

const signAccessToken = (userId: ObjectId, userRole: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId,
            role: userRole
        };

        const secret = process.env.ACCESS_TOKEN_SECRET;
        if (!secret) {
            return reject(new Error('ACCESS_TOKEN_SECRET is not defined'));
        }

        const options = {
            expiresIn: '4h',
            issuer: 'pickurpage.com',
            audience: userId.toString()
        };

        JWT.sign(payload, secret, options, (err, token) => {
            if (err) return reject(err);
            resolve(token as string);
        });
    });
};

const verifyAccessToken = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.headers['authorization']) return next(createError.Unauthorized());

    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    const secret = process.env.ACCESS_TOKEN_SECRET;

    if (!secret) {
        return next(createError.InternalServerError('ACCESS_TOKEN_SECRET is not defined'));
    }

    JWT.verify(token, secret, (err, payload) => {
        if (err) {
            const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
            return next(createError.Unauthorized(message));
        }
        (req as any).payload = payload;
        next();
    });
};

const signRefreshToken = (userId: ObjectId, userRole: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId,
            role: userRole
        };

        const secret = process.env.REFRESH_TOKEN_SECRET;
        if (!secret) {
            return reject(new Error('REFRESH_TOKEN_SECRET is not defined'));
        }

        const options = {
            expiresIn: '7d',
            issuer: 'pickurpage.com',
            audience: userId.toString()
        };

        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                console.log(err.message);
                return reject(createError.InternalServerError());
            }
            resolve(token as string);
        });
    });
};

const verifyRefreshToken = (refreshToken: string): Promise<{ userId: string }> => {
    return new Promise((resolve, reject) => {
        const secret = process.env.REFRESH_TOKEN_SECRET;
        if (!secret) {
            return reject(new Error('REFRESH_TOKEN_SECRET is not defined'));
        }

        JWT.verify(refreshToken, secret, (err, payload) => {
            if (err) return reject(createError.Unauthorized());

            const jwtPayload = payload as CustomJwtPayload;
            if (!jwtPayload.aud) {
                return reject(createError.Unauthorized());
            }

            resolve({ userId: jwtPayload.aud });
        });
    });
};

// const verifyRole = (token: string, requiredRole: string): Promise<CustomJwtPayload> => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const payload = await verifyAccessToken(token);
//             if (!payload.role || payload.role !== requiredRole) {
//                 return reject(createError.Forbidden('Insufficient role'));
//             }
//             resolve(payload);
//         } catch (err) {
//             reject(err);
//         }
//     });
// };

export {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken,
    // verifyRole
};
