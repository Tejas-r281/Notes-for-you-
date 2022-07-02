const express= require("express");

const multer= require('multer');


const {
  uploadFile,
  getfile,
} = require("../controllers/uploadController");


const router = express.Router();


// router.route("/test").get(homepage)
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '')
  }
})
const upload = multer({ storage }).single('file');

router.route("/uploadfile").post(upload,uploadFile);
router.route("/file/:key").get(getfile);



module.exports = router;
