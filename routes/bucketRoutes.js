const express = require('express');
const router = express.Router();


const {
    createBucket,
    deleteBucket
} = require('../controllers/bucketController');

router
    .route('/')
        .post(createBucket)
        .delete(deleteBucket)


module.exports = router;
