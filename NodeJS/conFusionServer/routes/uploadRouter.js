
// Modules
const express       = require('express');
const bodyParser    = require('body-parser');
const authenticate  = require('../middlewares/authenticate');
const multer        = require('multer');

// Multer settings
const storageOpts = {
    destination: (req, file, cb) => {
        cb(null, '../public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
};
const storage = multer.diskStorage(storageOpts);

const imageFileFilter = (req, file, cb) => {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(null, true);
    }

    const err = new Error('You can upload only image files.');

    return cb(err, false);
};

const multerOpts = {
    storage: storage,
    fileFilter: imageFileFilter
};
const upload = multer(multerOpts);

// Router
const uploadRouter = express.Router();
uploadRouter.use(bodyParser.json());

// Routes
uploadRouter.route('/')
    .get(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /upload.');
    })
    .post(authenticate.verifyUser, upload.single('imageFile'),(req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'application/json');

        res.json(req.file);
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /upload.');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /upload.');
    });


// Export Module
module.exports = uploadRouter;
