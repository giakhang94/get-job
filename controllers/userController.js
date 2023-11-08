import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError, UnAuthError, UnAuthorizedError } from '../errors/customErrors.js';
import userModel from '../models/userModel.js';
import { createJWT } from '../utils/tokenUtils.js';
import { attachCookie } from '../utils/attachCookie.js';
import jobModel from '../models/jobModel.js';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';

const loginUser = async (req, res) => {
    const { password, email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
        console.log('con cac');
        throw new NotFoundError('your email have not registerd yet');
    }

    const isCorrectPassword = await user.comparePassword(password, user.password);
    // console.log(isCorrectPassword);
    if (!isCorrectPassword) {
        throw new UnAuthError('password not match');
    }
    const token = createJWT({ userId: user._id, role: user.role });
    attachCookie(res, token);
    return res.status(StatusCodes.OK).json({ message: `welcome ${user.name}` });
};

const register = async (req, res) => {
    // const allUsers = await userModel.find();
    const isFirstAccount = (await userModel.countDocuments()) === 0;
    const userData = req.body;
    if (isFirstAccount) {
        userData.role = 'admin';
        //only the first one can be a admin
    } else {
        userData.role = 'user';
    }
    const newUser = await userModel.create(userData);
    newUser.password = undefined;
    return res.status(StatusCodes.CREATED).json({ message: 'User created!', user: newUser });
};

const logoutUser = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1),
    });
    res.status(StatusCodes.OK).json({ message: 'logout' });
};
//for user controllers
//it's better if separate below controllers into a new file call userControllers,
//current file should change to authController.
//those roouters need authenticateUser Middleware
const getCurrentUser = async (req, res) => {
    const currentUser = await userModel.findOne({ _id: req.user.userId });
    currentUser.password = undefined;
    res.status(StatusCodes.OK).json({ currentUser });
};
const updateUser = async (req, res) => {
    const obj = { ...req.body };
    delete obj.password;
    //upload file to cloudinary.com
    if (req.file) {
        const resp = await cloudinary.v2.uploader.upload(req.file.path);
        await fs.unlink(req.file.path);
        obj.avatar = resp.secure_url;
        obj.avatarPublicId = resp.public_id;
    }
    const updatedUser = await userModel.findByIdAndUpdate(req.user.userId, obj, { new: false });
    // {new: false} => updatedUser is the old instance (not an updated instance)
    // we need the old one to remove old image stroed in this
    //if the user documents already have image (updatedUser.avatarPublicId exists)
    //and user is updating new image (req.file exists)
    //then remove the old one on cloudinary.com by using v2.uploader.destroy(public_id)
    if (req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }
    res.status(201).json({
        message: 'updated',
        img: `localhost:5100/uploads/${req.file?.originalname}`,
    });
};
const getApplicationStats = async (req, res) => {
    const users = await userModel.countDocuments();
    const jobs = await jobModel.countDocuments();
    res.status(StatusCodes.OK).json({ users, jobs });
};
export { loginUser, register, logoutUser, getCurrentUser, updateUser, getApplicationStats };
