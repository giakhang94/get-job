import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import JobModel from './models/jobModel.js';
import UserModel from './models/userModel.js';

try {
    await mongoose.connect(process.env.MONGODB_URL);
    const user = await UserModel.findOne({ email: 'songoku@gmail.com' });
    const jsonJobs = JSON.parse(await readFile(new URL('./utils/mock-data.json', import.meta.url)));
    const jobs = jsonJobs.map((job) => {
        return { ...job, createdBy: user._id };
    });
    await JobModel.deleteMany({ createdBy: user._id });
    await JobModel.create(jobs);
    console.log('success!!!');
    process.exit(0);
} catch (error) {
    console.log(error);
    process.exit(1);
}
