//import  express async error (always on the very top of the file)
import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
//router
import jobRouter from './routers/jobRouter.js';
import userRouter from './routers/userRouter.js';
//middleware
import errorHandlerMiddleWare from './middlewares/errorHandlerMiddleware.js';
import { validateTest } from './middlewares/validatorMiddleware.js';
import { authenticateUser } from './middlewares/authenticateMiddleware.js';
//public - for upload file
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
//cloudinary
import { v2 as cloudinary } from 'cloudinary';

const app = express();
const PORT = process.env.PORT;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
//import.meta.url => get the URL of server.js
//then convert that url to web path
//then get the path of the folder which contains the server.js
app.use(express.static(path.resolve(__dirname, './public')));
//told express that thers's a folder contains static files at __dirname/public
//that is root/public (folder public at the same level with server.js)
if ((process.env.NODE_ENV = 'development')) {
    app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());
app.use(cookieParser());
//endpoints
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.post('/api/v1/test', (req, res) => {
    const { name } = req.body;
    console.log(req.body);
    res.status(200).json({ message: `hello ${name} with ${req.body.age}` });
});

//job router
app.use('/api/v1/jobs', authenticateUser, jobRouter);
//user router
app.use('/api/v1/user', userRouter);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public', '/index.html'));
});

app.use('*', (req, res) => {
    res.status(400).json({ msg: 'router not found' });
});
//error middleware
app.use(errorHandlerMiddleWare);
//start serer
try {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(PORT, () => {
        console.log('server is on port ' + PORT);
    });
} catch (error) {
    console.log('from server.js', error);
    process.exit(1);
}
