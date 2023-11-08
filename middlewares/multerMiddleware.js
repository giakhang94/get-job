import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/uploads');
    },
    filename: (req, file, callback) => {
        const filename = file.originalname;
        callback(null, filename);
    },
});

const upload = multer({ storage });

export default upload;
