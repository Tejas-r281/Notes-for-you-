const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const dbms = require("../models/dbms");
const operatingSystem = require("../models/operatingsystem");
const dsa = require("../models/dsa");
const superSet = require("../models/superset");
// const makePdf = require("../utils/makePdf");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
const AWS = require("aws-sdk");
const uuid = require("uuid").v4;
const fs = require("fs");

const commentMessage = require("../models/commentMessage");

// const S3 = require("aws-sdk/clients/s3");
AWS.config.update({ region: "us-west-2" });

const bucketName = process.env.AWS_BUCKET;
const bucketRegion = process.env.AWS_REGION;
const bucketKey = process.env.AWS_ACCESS_KEY_ID;
const bucketSecret = process.env.AWS_SECRET_ACCESS_KEY;
const s3 = new AWS.S3({
    accessKeyId: bucketKey,
    secretAccessKey: bucketSecret,
});

exports.uploadFile = catchAsyncErrors(async (req, res, next) => {
    let myFile = req.file.originalname.split(".");
    // const subject = req.body.subject;
    const description = req.body.desc;
    const data = req.body.subject;

    const database = eval(data);


    const fileType = myFile[myFile.length - 1];
    //  console.log(fileType);
    const params = {
        Bucket: bucketName,
        Key: `${uuid()}.${fileType}`,
        Body: req.file.buffer,
    };

     s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send(error);
        }

            const dbmsData = new database({
                key: params.Key,
                description: description,
                // uploadedBy: req.user._id,
                uploadedBy: "62c4720e3153703aaace88cd",
                fileUploadedOn: Date.now(),
            });
            dbmsData.save();

        // const id = req.user._id;
        const id = "62c4720e3153703aaace88cd";
        const key = params.Key;
        // console.log(id);
        User.findById(id)
            .then((data) => {
                data.pending.push(key);
                data.save();
            })
            .catch((err) => {
                console.log(err);
            });

        res.status(200).send(data);
    });
});

const getFileStream = (filekey) => {
    const params = {
        Bucket: bucketName,
        Key: filekey,
    };
    return s3.getObject(params).createReadStream();
};

exports.getfile = catchAsyncErrors(async (req, res, next) => {
    const key = req.params.id;
    // console.log(key);
    const readStream = getFileStream(key);
    readStream.pipe(res);
});

exports.deletefile = catchAsyncErrors(async (req, res, next) => {
    const key = req.params.key;

    const params = {
        Bucket: bucketName,
        Key: key,
    };
    s3.deleteObject(params, (error, data) => {
        if (error) {
            res.status(500).send({
                error: error,
            });
        }
        res.status(200).send({
            message: "File Deleted Successfully",
        });
    });
});

exports.getAllFiles = catchAsyncErrors(async (req, res, next) => {
    const params = {
        Bucket: bucketName,
        MaxKeys: 1000,
    };
    s3.listObjects(params, (error, data) => {
        if (error) {
            res.status(500).send({
                error: error,
            });
        }
        res.status(200).send({
            data: data,
        });
    });
});
const setstatus = (database, key) => {
    return database
        .findOne({ key: key })
        .then((data) => {
            //remove key from pending list and add same key in accepted list from user database
            const id = data.uploadedBy;
            const key = data.key;
            User.findById(id)
                .then((data) => {
                    data.pending.splice(data.pending.indexOf(key), 1);
                    data.accepted.push(key);
                    data.save();
                })
                .catch((err) => {
                    console.log(err);
                });
            data.status = "accepted";
            data.save();
        })
        .catch((err) => {
            console.log(err);
        });
};

// change the status from pending to activate
exports.changeStatus = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.body);

    const key = req.body.key;
    // const decription=req.body.description;
    const data = req.body.subject;

    const database = eval(data);

        setstatus(database, key);

});
// remove the file from pending list and put into the rejected list of the users database
const setrejectfile = (database, key) => {
    return database
        .findOne({ key: key })
        .then((data) => {
            //remove key from pending list and add same key in accepted list from user database
            const id = data.uploadedBy;
            const key = data.key;
            User.findById(id)
                .then((data) => {
                    data.pending.splice(data.pending.indexOf(key), 1);
                    data.rejected.push(key);
                    data.save();
                })
                .catch((err) => {
                    console.log(err);
                });
            data.status = "rejected";
            data.save();
        })
        .catch((err) => {
            console.log(err);
        });
}
// reject the file
exports.rejectFile = catchAsyncErrors(async (req, res, next) => {

    // const id = req.user._id;
    const key = req.body.key;
    // const subject = req.body.subject;

    const data = req.body.subject;

    const database = eval(data);


    setrejectfile(database, key);


});

// get all key from dbms, operating system, dsa, superset
exports.getAllKey = catchAsyncErrors(async (req, res, next) => {
    const dbmsData = await dbms.find({}).populate("uploadedBy", "name").select('key');
    const operatingSystemData = await operatingSystem
        .find({})
        .populate("uploadedBy", "name").select('key');
    const dsaData = await dsa.find({}).populate("uploadedBy", "name").select('key');
    const superSetData = await superSet.find({}).populate("uploadedBy", "name").select('key');
    // conlsole.log(dbmsData);
    res.status(200).send({
        dbmsData: dbmsData,
        operatingSystemData: operatingSystemData,
        dsaData: dsaData,
        superSetData: superSetData,
    });
});

const setlike = async (database, key, req, res) => {


    const file = await database.findOne({ key: key });

    // console.log(file);

    if (file.likes.includes(req.user._id)) {
        res.status(200).send({
            message: "Already liked"
        })
    }
    else {
        file.likes.push(req.user._id);
        file.save();
        res.status(200).send({
            message: "Liked"
        })
    }


}


exports.likeFile = catchAsyncErrors(async (req, res, next) => {

    // const subject = req.body.subject;
    const key = req.body.key;
    const data = req.body.subject;

    const database = eval(data);
    setlike(database, key, req, res);


});

// comment section for the files

exports.commentFile = catchAsyncErrors(async (req, res, next) => {

    const message = req.body.message;

    //  const all=  await commentMessage.find({});

    //  console.log(all.comments);

    const comments = new commentMessage(
        {


            comment: message,
            user: req.user._id

        });

    comments.save();




    res.status(200).send({
        message: "Comment added Successfully",
    });


}
)

// get all comments
exports.getAllComments = catchAsyncErrors(async (req, res, next) => {

    const comments = await commentMessage.find({}).populate("user");

    res.status(200).send({
        comments: comments,
    });
}
)
// get all the key from specific subject
exports.getAllKeyBySubject = catchAsyncErrors(async (req, res, next) => {
    const {subject}=req.query;
    // console.log(req.body);
    // console.log(req.query);
    const database = eval(subject);


    const data1 = await database.find({}).populate("uploadedBy", "name").select('key');
    res.status(200).send({
        data: data1,
    });
})


