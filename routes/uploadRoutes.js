const express = require('express');
const router = express.Router();


const {
    uploadFile

} = require('../controllers/uploadsController');

router.route('/uploads').post(uploadFile);


module.exports = router;
