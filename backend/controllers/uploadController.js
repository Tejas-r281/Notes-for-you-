const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const dbms = require("../models/dbms");
const operatingSystem = require("../models/operatingSystem");
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
    const subject = req.body.subject;
    const description = req.body.desc;

    const fileType = myFile[myFile.length - 1];
    //  console.log(fileType);
    const params = {
        Bucket: bucketName,
        Key: `${uuid()}.${fileType}`,
        Body: req.file.buffer,
    };

    // console.log(params)
    // problem is upload pahle ho jaa raha then we are checkking for that that the issue , either we can fix it in the frontend
    s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send(error);
        }
        if (subject === "dbms") {
            const dbmsData = new dbms({
                key: params.Key,
                description: description,
                uploadedBy: req.user._id,
                fileUploadedOn: Date.now(),
            });
            dbmsData.save();
        } else if (subject === "Operating System") {
            const operatingSystemData = new operatingSystem({
                key: params.Key,
                description: description,
                uploadedBy: req.user._id,
                fileUploadedOn: Date.now(),
            });
            operatingSystemData.save();
        } else if (subject === "dsa") {
            const dsaData = new dsa({
                key: params.Key,
                description: description,
                uploadedBy: req.user._id,
                fileUploadedOn: Date.now(),
            });
            // add key in pending list in user's database

            dsaData.save();
        } else {
            const superSetData = new superSet({
                key: params.Key,
                description: description,
                uploadedBy: req.user._id,
                fileUploadedOn: Date.now(),
            });
            superSetData.save();
        }
        const id = req.user._id;
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
    const key = req.params.key;

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
    console.log(req.body);

    const key = req.body.key;
    // const decription=req.body.description;
    const subject = req.body.subject;

    if (subject === "dbms") {
        setstatus(dbms, key);
    } else if (subject === "Operating System") {
        setstatus(operatingSystem, key);
    } else if (subject === "dsa") {
        setstatus(dsa, key);
        // send email
    } else {
        setstatus(superSet, key);
        // send email
    }

    res.status(200).send({
        message: "File added Successfully",
    });
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

    const id = req.user._id;
    const key = req.body.key;
    const subject = req.body.subject;
    if (subject === "dbms") {
        setrejectfile(dbms, key);
    }
    else if (subject === "Operating System") {
        setrejectfile(operatingSystem, key);
    }
    else if (subject === "dsa") {
        setrejectfile(dsa, key);
    }
    else {
        setrejectfile(superSet, key);
    }
    res.status(200).send({
        message: "File rejected Successfully",

    });

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

    console.log(file);

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

    const subject = req.body.subject;
    const key = req.body.key;

    if (subject === "dbms") {
        return setlike(dbms, key, req, res);
    } else if (subject === "Operating System") {
        return setlike(operatingSystem, key, req, res);
    } else if (subject === "dsa") {
        return setlike(dsa, key, req, res);
    } else {
        return setlike(superSet, key, req, res);
    }


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
