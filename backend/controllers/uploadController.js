const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const dbms = require("../models/dbms");
const operatingSystem = require("../models/operatingsystem");
const dsa = require("../models/dsa");
const systemDesign = require("../models/systemDesign");
const oop = require("../models/oop");
const computerNetwork = require("../models/computerNetwork");
const competitiveProgramming = require("../models/competitiveProgramming");
const frontend = require("../models/frontend");
const backend = require("../models/backend");

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
    // console.log(myFile);

    const fileType = myFile[myFile.length - 1];
    //  console.log(fileType);
    // file should not be larger than 20 mb for uploading add constrains to the multer middleware
    const params = {
        Bucket: bucketName,
        Key: `${uuid()}.${fileType}.${data}`,
        Body: req.file.buffer,
    };

    s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send(error);
        }

        const dbmsData = new database({
            key: params.Key,
            description: description,
            uploadedBy: req.user._id,
            // uploadedBy: "62c4720e3153703aaace88cd",
            fileUploadedOn: Date.now(),
        });
        dbmsData.save();

        const id = req.user._id;
        // const id = "62c4720e3153703aaace88cd";
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
    // const key = req.params.key;
    // console.log(req.body);
    const { key, status } = req.body;
    // console.log(key);
    // console.log(status);
    let myFile = key.split(".");
    const database = myFile[myFile.length - 1];

    // console.log(database);
    const user_detail = await User.findById(req.user._id);
    // const database1 = eval(database);
    const file_detail = await eval(database).findOne({ key: key });
    // console.log(file_detail);
    // console.log(user_detail);
    // now delete the file_detail and save the database



    // delete file from user database
    if (status === "accepted") {
        user_detail.accepted.splice(user_detail.accepted.indexOf(key), 1);
        await user_detail.save();
        await file_detail.remove();
        await user_detail.save();
    }
    else if (status === "rejected") {
        user_detail.rejected.splice(user_detail.rejected.indexOf(key), 1);
        await user_detail.save();
        await file_detail.remove();
        await user_detail.save();
    }
    else if (status === "pending") {
        user_detail.pending.splice(user_detail.pending.indexOf(key), 1);
        await user_detail.save();
        await file_detail.remove();
        await user_detail.save();
    }
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
exports.admindeletefile = catchAsyncErrors(async (req, res, next) => {
    // const key = req.params.key;
    // console.log(req.body);
    const {key}= req.body;
    // console.log(key);
    // console.log("yess");
    // console.log(status);
    let myFile = key.split(".");
    const database = myFile[myFile.length - 1];

    // console.log(database);

    // const database1 = eval(database);
    const file_detail = await eval(database).findOne({ key: key });
    const id = file_detail.uploadedBy._id;
    const user_detail= await User.findById(id);
    // console.log(file_detail);
    // console.log(user_detail);
    // now delete the file_detail and save the database

    // delete file from user database
    const status= file_detail.status;

    // console.log(user_detail);
    // console.log(status);


    if (status === "accepted") {
        user_detail.accepted.splice(user_detail.accepted.indexOf(key), 1);
        await user_detail.save();
        await file_detail.remove();
        await user_detail.save();
    }
    else if (status === "rejected") {
        user_detail.rejected.splice(user_detail.rejected.indexOf(key), 1);
        await user_detail.save();
        await file_detail.remove();
        await user_detail.save();
    }
    else if (status === "pending") {
        user_detail.pending.splice(user_detail.pending.indexOf(key), 1);
        await user_detail.save();
        await file_detail.remove();
        await user_detail.save();
    }
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
const setstatus = async (database, key, res) => {
    return await database
        .findOne({ key: key })
        .then((data) => {
            //remove key from pending list and add same key in accepted list from user database
            const id = data.uploadedBy;
            const key = data.key;
            // console.log(data);
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

            res.status(200).send(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
};

// change the status from pending to activate
exports.acceptfile = catchAsyncErrors(async (req, res, next) => {
    // console.log(req.body);

    const key = req.body.data;
    // const decription=req.body.description;
    let myFile = key.split(".");
    const data = myFile[myFile.length - 1];



    const database = eval(data);
    // console.log(typeof database);

    setstatus(database, key, res);

});
// remove the file from pending list and put into the rejected list of the users database
const setrejectfile = (database, key, res) => {
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
            res.status(200).send(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send(err);
        });
}
// reject the file
exports.rejectFile = catchAsyncErrors(async (req, res, next) => {

    // const id = req.user._id;
    const key = req.body.data;
    // const subject = req.body.subject;

    let myFile = key.split(".");
    const data = myFile[myFile.length - 1];

    const database = eval(data);


    setrejectfile(database, key, res);


});

// get all key from dbms, operating system, dsa, superset
exports.getAllKey = catchAsyncErrors(async (req, res, next) => {
    const dbmsData = await dbms.find({}).populate("uploadedBy", "name");
    const operatingSystemData = await operatingSystem.find({}).populate("uploadedBy", "name")
    const dsaData = await dsa.find({}).populate("uploadedBy", "name")
    const superSetData = await superSet.find({}).populate("uploadedBy", "name")
    const oopData = await oop.find({}).populate("uploadedBy", "name")
    const systemDesignData = await systemDesign.find({}).populate("uploadedBy", "name")
    const computerNetworkData = await computerNetwork.find({}).populate("uploadedBy", "name")
    const competitiveProgrammingData = await competitiveProgramming.find({}).populate("uploadedBy", "name")
    const frontEndData = await frontend.find({}).populate("uploadedBy", "name")
    const backEndData = await backend.find({}).populate("uploadedBy", "name")


    // conlsole.log(dbmsData);
    // merging all the data in the sigle database and send
    const data = [
        ...dbmsData,
        ...operatingSystemData,
        ...dsaData,
        ...superSetData,
        ...oopData,
        ...systemDesignData,
        ...computerNetworkData,
        ...competitiveProgrammingData,
        ...frontEndData,
        ...backEndData,
    ];
    res.status(200).send(data);



});

const setlike = async (database, key, req, res) => {

    //  console.log(key);
    const file = await database.findOne({ key: key });

    // console.log(file);

    if (file.likes.includes(req.user._id)) {
        res.status(200).send({
            message: "Already"
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

    const { key, subject } = req.body.data;
    // console.log(key);
    console.log(subject);
    const database = eval(subject);
    return setlike(database, key, req, res);


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
    const { subject } = req.query;
    // console.log(req.body);
    // console.log(req.query);
    const database = eval(subject);


    const data1 = await database.find({}).populate("uploadedBy", "name");
    res.status(200).send({
        data: data1,
    });
})


// get subject details through key
exports.getSubjectDetails = catchAsyncErrors(async (req, res, next) => {
    {
        const key = req.params.key;
        let myFile = key.split(".");
        const database = myFile[myFile.length - 1];

        const data = await eval(database).findOne({ key: key });
        res.status(200).send({
            data: data,
        });
    }
}
)



