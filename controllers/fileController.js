const AWS = require('aws-sdk')
const fs = require('fs')
const path = require('path')


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

const getFiles = async (req, res) => {
    const { bucketName } = req.body

    var bucketParams = {
        Bucket: bucketName
    }

    await s3.listObjects(bucketParams, (error, data) => {
        if (error) {
            return res.status(400).json(error)
        }
        else {
            return res.status(200).json({
                data
            })
        }
    })
}

const deleteFile = async (req, res) => {
    const { fileName } = req.body

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName
    }

    s3.deleteObject(params, (error, data) => {
        if (error) {
            return res.status(400).json(error)
        }
        return res.status(200).json({
            msg: 'File Deleted!'
        })
    })


}

const downloadFile = async (req, res) => {
    const { fileName } = req.params

    const filePath = `./downloads/${fileName}`



    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${fileName}`
    }

    const file = await s3.getObject(params).promise()

    fs.writeFileSync(filePath, file.Body);
    
    return res.json({
        file: { src: `/downloads/${fileName}` }
    })
}



module.exports = {
    getFiles,
    deleteFile,
    downloadFile
}