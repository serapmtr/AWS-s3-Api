const path = require('path');
const AWS = require('aws-sdk')
const uuid = require('uuid/v1')
const multer = require('multer')


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
})

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '')
  }
})


const upload = multer({ storage }).single('image')


const uploadFile = async (req, res) => {
  if (!req.files.file) {
    res.json({
      msg: 'No file uploaded'
    })
  }

  const file = req.files.file


  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${file.name}`,
    Body: file.data
  }

  if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {

    await file.mv(
      path.join(
        __dirname,
        '../uploads/images/' + `${file.name}`
      )
    )
   

  }
   if (file.mimetype == "text/plain" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.mimetype == "application/pdf") {

    await file.mv(
      path.join(
        __dirname,
        '../uploads/txt/' + `${file.name}`
      )
    );
  }

  if (file.mimetype == "application/zip") {
    await file.mv(
      path.join(
        __dirname,
        '../uploads/zip/' + `${file.name}`
      )
    );
  }

  s3.upload(params, (error, data) => {
    if (error) {
      res.status(500).send(error)
    }
    return res
      .status(200)
      .json({ file: { src: `/uploads/${file.name}` } })

  })
 
};

module.exports = {
  uploadFile
};
