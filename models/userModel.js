import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: 'lastName',
    },
    location: {
        type: String,
        default: 'my city',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    avatar: String,
    avatarPublicId: String,
});

UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return;
    this.password = await bcrypt.hash(user.password, 8);
    next();
});
UserSchema.methods.comparePassword = async function (inputPassword, dataPassword) {
    const compare = await bcrypt.compare(inputPassword, dataPassword);
    //   console.log(compare);
    return compare;
};
const userModel = mongoose.model('User', UserSchema); //"User" nay dem qua jobModel lam refer
export default userModel;
