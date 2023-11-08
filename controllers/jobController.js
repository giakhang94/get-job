import { StatusCodes } from 'http-status-codes';
import jobModel from '../models/jobModel.js';
import { BadRequestError, NotFoundError, UnAuthorizedError } from '../errors/customErrors.js';
import mongoose, { startSession } from 'mongoose';
import day from 'dayjs';

const getAllJobs = async (req, res) => {
    const { search, jobStatus, jobType, sort } = req.query;
    //filter (query)
    const queryObject = {
        createdBy: req.user.userId,
    };
    if (search) {
        queryObject.$or = [
            { position: { $regex: search, $options: 'i' } },
            { company: { $regex: search, $options: 'i' } },
        ];
    }
    if (jobStatus && jobStatus !== 'all') {
        queryObject.jobStatus = jobStatus;
    }
    if (jobType && jobType !== 'all') {
        queryObject.jobType = jobType;
    }
    //sort
    const sortObject = {
        newest: '-createdAt',
        oldest: 'createdAt',
        'a-z': 'position',
        'z-a': '-position',
    };
    const sortKey = sortObject[sort] || sortObject.newest; //default sort

    //pagination setup
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobs = await jobModel.find(queryObject).sort(sortKey).skip(skip).limit(limit);
    //pagination
    //1. get total jobs after filterd
    const totalJobs = await jobModel.countDocuments(queryObject);
    const numOfPage = Math.ceil(totalJobs / limit);
    return res.status(StatusCodes.OK).json({ totalJobs, numOfPage, currentPage: page, jobs });
};
const creteJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const { company, position } = req.body;
    if (!company || !position) {
        throw new Error(
            `missing ${!company ? 'company' : ''}${!company && !position ? ' and ' : ''}${!position ? 'position' : ''}`,
        );
    }
    const newJob = await jobModel.create(req.body);
    await newJob.save();
    res.status(StatusCodes.CREATED).json({ message: 'job created!', newJob });
};

const editJob = async (req, res) => {
    const { position, company } = req.body;
    if (!position && !company) {
        throw new BadRequestError('missing position or company');
    }
    const job = await jobModel.findByIdAndUpdate(req.params.jobId, req.body, {
        new: true,
    });
    if (job) {
        res.status(200).json({ message: 'Job Updated!', job });
    }
    // let data = req.body;
    // for (const item in data) {
    //   job[item] = data[item] ? data[item] : job[item];
    // }
    // // job.company = company ? company : job.company;
    // // job.position = position ? position : job.position;
    // await job.save();
    // res.status(StatusCodes.CREATED).json({ job });
};

const deleteJob = async (req, res) => {
    await jobModel.findByIdAndDelete(req.params.jobId);

    res.status(StatusCodes.OK).json({ message: 'deleted' });
};

const getSingleJob = async (req, res) => {
    const job = await jobModel.findById(req.params.jobId);

    res.status(StatusCodes.OK).json({ job });
};

export const showStats = async (req, res) => {
    let stats = await jobModel.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
    ]);

    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});

    const defaultStats = {
        //hardcode
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };

    let monthlyApplications = await jobModel.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
                count: { $sum: 1 },
            },
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
    ]);
    monthlyApplications = monthlyApplications.reduce((accum, current) => {
        let { _id, count } = current;
        const date = day().month(_id.month).year(_id.year).format('MMM YY');
        accum.push({ date, count });
        return accum;
    }, []);
    // let monthlyApplications = [
    //     {
    //         date: 'May 23',
    //         count: 12,
    //     },
    //     {
    //         date: 'Jun 23',
    //         count: 22,
    //     },
    //     {
    //         date: 'Jul',
    //         count: 100,
    //     },
    // ];
    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

export { getAllJobs, getSingleJob, creteJob, editJob, deleteJob };
