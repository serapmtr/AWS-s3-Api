const express = require('express');
const router = express.Router();


const {
    getFiles,
    deleteFile,
    downloadFile
} = require('../controllers/fileController');

router
    .route('/')
        .get(getFiles)
        .delete(deleteFile)

router
    .route('/download/:fileName')
        .get(downloadFile)

module.exports = router;
