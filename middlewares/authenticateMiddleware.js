import jwt from 'jsonwebtoken';
import { UnAuthError } from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';
export const authenticateUser = (req, res, next) => {
    //   console.log("authenticate user here");
    const { token } = req.cookies;
    if (!token) {
        throw new UnAuthError('Please login to continue..');
    }
    try {
        const { userId, role } = verifyJWT(token);
        const testUser = userId === '65460da81c566507232c9582';
        req.user = { userId, role, testUser }; //attach userId and role to the request (req.user)
        next();
    } catch (error) {
        throw new UnAuthError('authentication invalid');
    }
};
