import { param, body, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnAuthError, UnAuthorizedError } from '../errors/customErrors.js';
import { JOB_STAUTS, JOB_TYPE } from '../utils/constants.js';
import jobModel from '../models/jobModel.js';
import userModel from '../models/userModel.js';
import mongoose from 'mongoose';
const vaildatorMiddleware = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            console.log('console.log from middleware', errors);
            if (!errors.isEmpty()) {
                const errorsMessages = errors.array().map((err) => err.msg);
                if (errorsMessages[0].startsWith('cant not find provided id')) {
                    throw new NotFoundError(errorsMessages);
                }
                if (errorsMessages[0].startsWith('Not authorized')) {
                    throw new UnAuthorizedError('Not authorized to access this routa!');
                }
                throw new BadRequestError(errorsMessages);
            }
            next();
        },
    ];
};

export const validateTest = vaildatorMiddleware([
    body('name')
        .notEmpty()
        .withMessage('name is required')
        .isLength({ min: 5 })
        .withMessage('name must be at least 5')
        .trim(),
    body('age')
        .isEmail()
        .withMessage('age must be an email')
        .isLength({ max: 10 })
        .withMessage('age must has maximum 10 characters'),
]);

export const validateJobInput = vaildatorMiddleware([
    body('company').notEmpty().withMessage('company is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('jobLocation').notEmpty().withMessage('jobLocation is required'),
    body('jobStatus').isIn(Object.values(JOB_STAUTS)).withMessage('invalid status value'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid type value'),
]);

export const validateParamID = vaildatorMiddleware([
    param('jobId').custom(async (value, meta) => {
        const isValidParam = mongoose.Types.ObjectId.isValid(value);
        //kiem tra xem id có đúng định dạng của MongoDB hay không
        if (!isValidParam) {
            throw new BadRequestError('invalid MongoDB id');
        }
        const job = await jobModel.findById(value);
        if (!job) {
            throw new NotFoundError('cant not find provided id');
        }
        //validate authorization
        const req = meta.req; //meta chua 1 loz cac meta data, trong do co request (req) luon
        const isAdmin = req.user.role === 'admin';
        const isOwner = req.user.userId === job.createdBy.toString();
        if (!isAdmin && !isOwner) {
            throw new UnAuthorizedError('Not authorized to access this route!');
        }
        return true;
    }),
]);

export const loginValidate = vaildatorMiddleware([
    body('email').notEmpty().withMessage('email must be provided').isEmail().withMessage('invalid email format'),
    body('password').notEmpty().withMessage('please enter password'),
]);

export const registerValidate = vaildatorMiddleware([
    body('email')
        .notEmpty()
        .withMessage('email must be provided')
        .isEmail()
        .withMessage('invalid email format')
        .custom(async (value) => {
            const user = await userModel.findOne({ email: value });
            if (user) {
                throw new BadRequestError('email already exists');
            }
            return true;
        }),

    body('password')
        .notEmpty()
        .withMessage('please enter password')
        .isLength({ min: 6 })
        .withMessage('password must have at least 6 characters'),
    body('name')
        .notEmpty()
        .withMessage('please enter user name')
        .isLength({ min: 3 })
        .withMessage('name must have at least 5 characters'),
    body('location').notEmpty().withMessage('please enter location'),
]);

export const validateUpdateUserInput = vaildatorMiddleware([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format')
        .custom(async (value, { req }) => {
            const user = await userModel.findOne({ email: value });
            if (req.user.role === 'admin') {
                if (user && value === user.email) {
                    return true;
                }
            }
            if (user && user._id.toString() !== req.user.userId) {
                throw new BadRequestError('email already exists');
            }
            return true;
        }),
]);

export const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new UnAuthorizedError('not enough permission');
        }

        next();
    };
};

export const checkTestUser = (req, res, next) => {
    if (req.user.testUser) {
        throw new UnAuthorizedError('You are in readonly mode');
    }
    next();
};
