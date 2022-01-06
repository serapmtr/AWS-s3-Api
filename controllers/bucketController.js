const AWS = require('aws-sdk')


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})



const createBucket = async (req, res) => {
    const { bucketName } = req.body

    const bucketParams = {
        Bucket: bucketName
    }

    await s3.createBucket(bucketParams, (error, data) => {
        if (error) {
            return res.status(400).json(error)
        }
        else {
            return res.status(200).json({
                msg: 'Bucket Created!',
                data
            })
        }
    })


}

const deleteBucket = async (req, res) => {
    const { bucketName } = req.body

    const bucketParams = {
        Bucket: bucketName
    }
    await s3.deleteBucket(bucketParams,(error, data) => {
        if(error){
            return res.status(400).json(error)
        }
        else {
            return res.status(200).json({
                msg:'Bucket Deleted!',
                data
            })
        }
    })
}

module.exports = {
    createBucket,
    deleteBucket
}