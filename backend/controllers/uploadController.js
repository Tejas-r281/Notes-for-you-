const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const User = require("../models/userModel");
const dbms = require("../models/dbms");
const operatingSystem = require("../models/operatingSystem");
const dsa = require("../models/dsa");
// const makePdf = require("../utils/makePdf");
const sendToken = require("../utils/jwtToken");
// const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const AWS = require('aws-sdk');
const uuid = require('uuid').v4;
const fs = require('fs');

// const S3 = require("aws-sdk/clients/s3");
AWS.config.update({ region: 'us-west-2' });


const bucketName = process.env.AWS_BUCKET;
const bucketRegion = process.env.AWS_REGION;
const bucketKey = process.env.AWS_ACCESS_KEY_ID;
const bucketSecret = process.env.AWS_SECRET_ACCESS_KEY;
const s3 = new AWS.S3({
    accessKeyId: bucketKey,
    secretAccessKey: bucketSecret,

})

exports.uploadFile = catchAsyncErrors(async (req, res, next) => {

    let myFile = req.file.originalname.split(".")
    const subject= req.body.subject;
    // console.log(subject);
    // console.log(myFile)
    const fileType = myFile[myFile.length - 1]
    //  console.log(fileType);
    const params = {
        Bucket: bucketName,
        Key: `${uuid()}.${fileType}`,
        Body: req.file.buffer
    }

    // console.log(params)

     s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send(error)
        }
        if(subject==='dbms')
        {
            const dbmsData = new dbms({

                key: params.Key,

                // fileUploadedBy: req.user._id,
                // fileUploadedOn: Date.now()
            });
            dbmsData.save();
        }
        else if(subject==='Operating System')
        {
            const operatingSystemData = new operatingSystem({
                 key: params.Key,
            });
            operatingSystemData.save();
        }
        else if(subject==='DSA')
        {
            const dsaData = new dsa({
                key: params.Key,
            });
            dsaData.save();
        }



        res.status(200).send(data)
    })

})

const getFileStream=(filekey)=>
{
    const params = {
        Bucket: bucketName,
        Key: filekey
    }
    return s3.getObject(params).createReadStream();
}

exports.getfile= catchAsyncErrors(async (req, res, next) => {
    const key= req.params.key;

    const readStream = getFileStream(key);
    readStream.pipe(res);
})